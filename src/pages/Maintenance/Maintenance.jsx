import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { generateMaintenancePDF } from "../../utils/generateMaintenancePDF";

const MONTHLY_CHARGE = 2200;

const MONTH_KEYS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

const Maintenance = () => {
  const { t } = useTranslation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthsCount, setMonthsCount] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalAmount = useMemo(() => {
    return monthsCount ? monthsCount * MONTHLY_CHARGE : 0;
  }, [monthsCount]);

  // PAY
  const handlePay = () => {
    if (!month || !year || !monthsCount) {
      alert(t("maintenance.validation"));
      return;
    }
    setIsPaid(true);
    setShowSuccess(true);
  };

  // DOWNLOAD PDF
  const handleDownload = () => {
    generateMaintenancePDF(
      t(`maintenance.months.${month}`),
      year,
      monthsCount,
      totalAmount
    );
    resetForm();
  };

  // RESET
  const resetForm = () => {
    setMonth("");
    setYear("");
    setMonthsCount("");
    setIsPaid(false);
    setShowSuccess(false);
  };

  return (
    <>
      <div className={`maintenance-page ${showSuccess ? "blur-bg" : ""}`}>
        <div className="maintenance-card">
          <h2>{t("maintenance.title")}</h2>

          {/* Month */}
          <label>{t("maintenance.month")} *</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">{t("maintenance.selectMonth")}</option>
            {MONTH_KEYS.map((m) => (
              <option key={m} value={m}>
                {t(`maintenance.months.${m}`)}
              </option>
            ))}
          </select>

          {/* Year */}
          <label>{t("maintenance.year")} *</label>
          <input
            type="number"
            placeholder={t("maintenance.enterYear")}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          {/* Months Count */}
          <label>{t("maintenance.monthsCount")} *</label>
          <select
            value={monthsCount}
            onChange={(e) => setMonthsCount(Number(e.target.value))}
          >
            <option value="">{t("maintenance.select")}</option>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          {/* Total */}
          <label>{t("maintenance.totalAmount")}</label>
          <input value={`₹ ${totalAmount}`} readOnly />

          {/* Buttons */}
          {!isPaid ? (
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

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-icon">✔</div>
            <h3>{t("maintenance.successTitle")}</h3>
            <p>{t("maintenance.successMsg")}</p>
            <button
              className="popup-btn"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
