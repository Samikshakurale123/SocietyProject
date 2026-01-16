import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateMaintenancePDF } from "../../utils/generateMaintenancePDF";

const Maintenance = () => {
  const { t } = useTranslation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthsCount, setMonthsCount] = useState("");
  const [amount, setAmount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const monthlyCharge = 2200;

  const calculateAmount = (count) => {
    setMonthsCount(count);
    setAmount(count * monthlyCharge);
  };

  const handlePay = () => {
    if (!month || !year || !monthsCount) {
      alert(t("Please fill all details"));
      return;
    }
    setPaid(true);
  };

  return (
    <>
      <div className={`maintenance-page ${showSuccess ? "blur-bg" : ""}`}>
        <div className="maintenance-card">
          <h2>{t("Maintenance Payment")}</h2>

          <label>{t("Month")} *</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">{t("Select Month")}</option>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map(m => <option key={m}>{m}</option>)}
          </select>

          <label>{t("Year")} *</label>
          <input
            type="number"
            value={year}
            placeholder={t("Enter Year")}
            onChange={(e) => setYear(e.target.value)}
          />

          <label>{t("Number of Months")} *</label>
          <select onChange={(e) => calculateAmount(Number(e.target.value))}>
            <option value="">Select</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <label>{t("Total Amount")}</label>
          <input value={`₹ ${amount}`} disabled />

          {!paid ? (
            <button className="pay-btn" onClick={handlePay}>
              {t("Pay Now")}
            </button>
          ) : (
            <button className="download-btn" onClick={() => setShowSuccess(true)}>
              {t("Download Receipt")}
            </button>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>{t("Payment Successful")}</h3>
            <button onClick={() => window.location.reload()}>
              {t("OK")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
