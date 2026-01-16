import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateMaintenancePDF } from "../../utils/generateMaintenancePDF";

const Maintenance = () => {
  const { t } = useTranslation();

  // 👉 States
  const [month, setMonth] = useState("");          // store INDEX (0–11)
  const [year, setYear] = useState("");
  const [monthsCount, setMonthsCount] = useState("");
  const [amount, setAmount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const monthlyCharge = 2200;

  // 👉 Get translated months ARRAY
  const months = t("months", { returnObjects: true });

  // 👉 Calculate amount
  const calculateAmount = (count) => {
    setMonthsCount(count);
    setAmount(count * monthlyCharge);
  };

  // 👉 Pay handler
  const handlePay = () => {
    if (month === "" || !year || !monthsCount) {
      alert(t("maintenance.validation"));
      return;
    }
    setPaid(true);
  };

  // 👉 Download PDF
  const handleDownload = () => {
    const selectedMonthName =
      month !== "" && Array.isArray(months) ? months[month] : "";

    generateMaintenancePDF(
      selectedMonthName,
      year,
      monthsCount,
      amount
    );

    setTimeout(() => setShowSuccess(true), 300);
  };

  // 👉 Reset
  const resetForm = () => {
    setMonth("");
    setYear("");
    setMonthsCount("");
    setAmount(0);
    setPaid(false);
    setShowSuccess(false);
  };

  return (
    <>
      <div className={`maintenance-page ${showSuccess ? "blur-bg" : ""}`}>
        <div className="maintenance-card">
          <h2>{t("maintenance.title")}</h2>

          {/* Month */}
          <label>
            {t("maintenance.month")} <span style={{ color: "red" }}>*</span>
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">
              {t("maintenance.selectMonth")}
            </option>

            {Array.isArray(months) &&
              months.map((m, index) => (
                <option key={index} value={index}>
                  {m}
                </option>
              ))}
          </select>

          {/* Year */}
          <label>
            {t("maintenance.year")} <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="number"
            placeholder={t("maintenance.enterYear")}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          {/* Number of months */}
          <label>
            {t("maintenance.monthsCount")}{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <select
            value={monthsCount}
            onChange={(e) => calculateAmount(Number(e.target.value))}
          >
            <option value="">
              {t("maintenance.select")}
            </option>

            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Amount */}
          <label>{t("maintenance.totalAmount")}</label>
          <input value={`₹ ${amount}`} disabled />

          {/* Buttons */}
          {!paid ? (
            <button className="pay-btn" onClick={handlePay}>
              {t("maintenance.payNow")}
            </button>
          ) : (
            <button className="download-btn" onClick={handleDownload}>
              {t("maintenance.download")}
            </button>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>{t("maintenance.success")}</h3>
            <button onClick={resetForm}>
              {t("maintenance.ok")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
