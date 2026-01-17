import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Maintenance = () => {
  const { t } = useTranslation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [numMonths, setNumMonths] = useState("");
  const [amount, setAmount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const monthlyCharge = 2200;

  const calculateAmount = (count) => {
    setNumMonths(count);
    setAmount(count * monthlyCharge);
  };

  const handlePay = () => {
    if (!month || !year || !numMonths) {
      alert(t("maintenanceFillAllDetails"));
      return;
    }
    setPaid(true);
  };

  return (
    <>
      <div className={`maintenance-page ${showSuccess ? "blur-bg" : ""}`}>
        <div className="maintenance-card">
          <h2>{t("maintenanceTitle")}</h2>

          <label>{t("maintenanceMonth")} *</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">{t("maintenanceSelectMonth")}</option>
            {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <label>{t("maintenanceYear")} *</label>
          <input type="number" value={year} placeholder={t("maintenanceEnterYear")} onChange={(e) => setYear(e.target.value)} />

          <label>{t("maintenanceNumMonths")} *</label>
          <select onChange={(e) => calculateAmount(Number(e.target.value))}>
            <option value="">Select</option>
            {[...Array(12)].map((_, i) => <option key={i}>{i + 1}</option>)}
          </select>

          <label>{t("maintenanceTotalAmount")}</label>
          <input value={`₹ ${amount}`} disabled />

          {!paid ? (
            <button className="pay-btn" onClick={handlePay}>{t("maintenancePayNow")}</button>
          ) : (
            <button className="download-btn" onClick={() => setShowSuccess(true)}>{t("maintenanceDownloadReceipt")}</button>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>{t("maintenancePaymentSuccess")}</h3>
            <button onClick={() => window.location.reload()}>{t("maintenanceOK")}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
