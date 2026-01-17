import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const [showDownload, setShowDownload] = useState(false);

  const monthlyAmount = 2200;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...form, [name]: value };

    if (name === "monthCount") {
      updatedForm.total = value * monthlyAmount;
    }

    setForm(updatedForm);
  };

  const handlePay = () => {
    if (!form.month || !form.year || !form.monthCount) {
      alert(t("maintenance.fillAllFields"));
      return;
    }
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setShowDownload(true);
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
    setShowDownload(false);
  };

  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <h2>{t("maintenance.title")}</h2>

        <label>{t("maintenance.month")} *</label>
        <select name="month" value={form.month} onChange={handleChange}>
          <option value="">{t("maintenance.selectMonth")}</option>
          <option value="January">{t("months.jan")}</option>
          <option value="February">{t("months.feb")}</option>
          <option value="March">{t("months.mar")}</option>
          <option value="April">{t("months.apr")}</option>
          <option value="May">{t("months.may")}</option>
          <option value="June">{t("months.jun")}</option>
          <option value="July">{t("months.jul")}</option>
          <option value="August">{t("months.aug")}</option>
          <option value="September">{t("months.sep")}</option>
          <option value="October">{t("months.oct")}</option>
          <option value="November">{t("months.nov")}</option>
          <option value="December">{t("months.dec")}</option>
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

        {!showDownload && (
          <button className="pay-btn" onClick={handlePay}>
            {t("maintenance.payNow")}
          </button>
        )}

        {showDownload && (
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
