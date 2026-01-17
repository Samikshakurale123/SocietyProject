import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { generateMaintenancePDF } from "../../utils/generateMaintenancePDF";

const MONTHLY_CHARGE = 2200;

const Maintenance = () => {
  const { t } = useTranslation();

  const months = t("months", { returnObjects: true });

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthsCount, setMonthsCount] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const totalAmount = useMemo(() => {
    return monthsCount ? monthsCount * MONTHLY_CHARGE : 0;
  }, [monthsCount]);

  const handlePay = () => {
    if (!month || !year || !monthsCount) {
      alert(t("Please fill all details")); // ✅ translated
      return;
    }
    setIsPaid(true);
  };

  const handleDownload = () => {
    generateMaintenancePDF(month, year, monthsCount, totalAmount);
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
        <h2>{t("maintenance.title")}</h2>

        {/* Month */}
        <label>{t("maintenance.month")} *</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">{t("maintenance.selectMonth")}</option>
          {Array.isArray(months) &&
            months.map((m, i) => (
              <option key={i} value={m}>
                {m}
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
        <label>{t("maintenance.monthCount")} *</label>
        <select
          value={monthsCount}
          onChange={(e) => setMonthsCount(Number(e.target.value))}
        >
          <option value="">{t("maintenance.select")}</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Total */}
        <label>{t("maintenance.total")}</label>
        <input value={`₹ ${totalAmount}`} readOnly />

        {/* Buttons */}
        {!isPaid ? (
          <div className="pay-spacing">
            <button
              type="button"
              className="pay-btn"
              onClick={handlePay}
            >
              {t("maintenance.payNow")}
            </button>
          </div>
        ) : (
          <div className="pay-spacing">
            <button
              type="button"
              className="download-btn"
              onClick={handleDownload}
            >
              {t("maintenance.downloadReceipt")} {/* ✅ FIXED */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
