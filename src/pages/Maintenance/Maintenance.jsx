import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const MONTHLY_CHARGE = 2200;

const Maintenance = () => {
  const { t } = useTranslation();

  const initialState = {
    month: "",
    year: "",
    monthCount: "",
    total: 0,
  };

  const [form, setForm] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === "monthCount") {
      updatedForm.total = value * MONTHLY_CHARGE;
    }

    setForm(updatedForm);
  };

  const handlePay = () => {
    if (!form.month || !form.year || !form.monthCount) {
      alert(t("maintenance.fillAllFields"));
      return;
    }
    setPaid(true);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
  };

  const downloadReceipt = () => {
    const receiptText = `
${t("maintenance.title")}
---------------------
${t("maintenance.month")}: ${form.month}
${t("maintenance.year")}: ${form.year}
${t("maintenance.monthCount")}: ${form.monthCount}
${t("maintenance.total")}: ₹${form.total}
`;

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "maintenance-receipt.txt";
    a.click();

    URL.revokeObjectURL(url);

    // reset form after download
    setForm(initialState);
    setPaid(false);
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
        <h2>{t("maintenance.title")}</h2>

        <label>{t("maintenance.month")} *</label>
        <select name="month" value={form.month} onChange={handleChange}>
          <option value="">{t("maintenance.selectMonth")}</option>
          {["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"].map((m) => (
            <option key={m} value={m}>
              {t(`months.${m}`)}
            </option>
          ))}
        </select>

        <label>{t("maintenance.year")} *</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder={t("maintenance.enterYear")}
        />

        <label>{t("maintenance.monthCount")} *</label>
        <select
          name="monthCount"
          value={form.monthCount}
          onChange={handleChange}
        >
          <option value="">{t("maintenance.select")}</option>
          {[1, 3, 6, 12].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label>{t("maintenance.total")}</label>
        <input type="text" value={`₹ ${form.total}`} readOnly />

        {/* PAY / DOWNLOAD BUTTONS */}
        {!paid ? (
          <button className="pay-btn" onClick={handlePay}>
            {t("maintenance.payNow")}
          </button>
        ) : (
          <button className="download-btn" onClick={downloadReceipt}>
            {t("maintenance.downloadReceipt")}
          </button>
        )}
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{t("maintenance.success")}</h3>
            <p>{t("maintenance.paymentSuccess")}</p>
            <button onClick={handleSuccessOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
