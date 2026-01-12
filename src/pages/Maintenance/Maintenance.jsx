import React, { useState } from "react";
import { generateMaintenancePDF } from "../../utils/generateMaintenancePDF";

const Maintenance = () => {
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
      alert("Please fill all details");
      return;
    }
    setPaid(true);
  };

  const handleDownload = () => {
    generateMaintenancePDF(month, year, monthsCount, amount);
    setTimeout(() => setShowSuccess(true), 300);
  };

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
          <h2>Maintenance Payment</h2>

          <label>Month <span style={{ color: "red" }}>*</span></label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map(m => <option key={m}>{m}</option>)}
          </select>

          <label>Year <span style={{ color: "red" }}>*</span></label>
          <input
            type="number"
            value={year}
            placeholder="Enter Year"
            onChange={(e) => setYear(e.target.value)}
          />

          <label>Number of Months <span style={{ color: "red" }}>*</span></label>
          <select onChange={(e) => calculateAmount(Number(e.target.value))}>
            <option value="">Select</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1} Month{i + 1 > 1 && "s"}</option>
            ))}
          </select>

          <label>Total Amount</label>
          <input value={`₹ ${amount}`} disabled />

          {!paid ? (
            <button className="pay-btn" onClick={handlePay}>Pay Now</button>
          ) : (
            <button className="download-btn" onClick={handleDownload}>
              Download Receipt (PDF)
            </button>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Payment Successful</h3>
            <button onClick={resetForm}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
