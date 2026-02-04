import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createPayment } from "../../api/paymentApi";
import { generateMaintenancePDF } from "../../utils/generateMaintenancePDF";

const MONTHLY_CHARGE = 2200;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Maintenance = () => {
  const { t } = useTranslation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthsCount, setMonthsCount] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [msg, setMsg] = useState("");

  const totalAmount = useMemo(() => {
    return monthsCount ? monthsCount * MONTHLY_CHARGE : 0;
  }, [monthsCount]);

  // ================= PAY + SAVE TO DB =================
  const handlePay = async () => {
    if (!month || !year || !monthsCount) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ BACKEND-COMPATIBLE PAYLOAD
    const payload = {
      month: month,
      year: Number(year),
      months: monthsCount,      // IMPORTANT
      amount: totalAmount,      // IMPORTANT
      userId: 1                 // TEMP (replace with logged-in user later)
    };

    try {
      await createPayment(payload);
      setIsPaid(true);
      setMsg("Payment successful");
    } catch (error) {
      console.error("Payment error:", error);
      setMsg("Payment failed");
    }
  };

  // ================= DOWNLOAD PDF =================
  const handleDownload = () => {
    generateMaintenancePDF(month, year, monthsCount, totalAmount);
    resetForm();
  };

  const resetForm = () => {
    setMonth("");
    setYear("");
    setMonthsCount("");
    setIsPaid(false);
    setMsg("");
  };

  return (
    <div className="page-container">
      <div className="maintenance-card">
        <h2>{t("maintenance.title") || "Maintenance Payment"}</h2>

        {msg && (
          <div className={`message-box ${isPaid ? "success" : "error"}`}>
            {msg}
          </div>
        )}

        <label>Month *</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <label>Year *</label>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <label>Number of months *</label>
        <select
          value={monthsCount}
          onChange={(e) => setMonthsCount(Number(e.target.value))}
        >
          <option value="">Select</option>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Total</label>
        <input value={`₹ ${totalAmount}`} readOnly />

        {!isPaid ? (
          <button className="pay-btn" onClick={handlePay}>
            Pay Now
          </button>
        ) : (
          <button className="download-btn" onClick={handleDownload}>
            Download Receipt
          </button>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
