import React, { useState } from "react";

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
    // simulate PDF download
    setTimeout(() => {
      setShowSuccess(true);
    }, 300);
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

          <label>Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>

          <label>Year</label>
          <input
            type="number"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <label>Number of Months</label>
          <select
            value={monthsCount}
            onChange={(e) => calculateAmount(Number(e.target.value))}
          >
            <option value="">Select</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Month</option>
            <option value="5">5 Months</option>
            <option value="6">6 Months</option>
            <option value="7">7 Month</option>
            <option value="8">8 Months</option>
            <option value="9">9 Months</option>
            <option value="10">10 Month</option>
            <option value="11">11 Months</option>
            <option value="12">12 Months</option>
          </select>

          <label>Total Amount</label>
          <input value={`₹ ${amount}`} disabled />

          <div className="pay-spacing">
            {!paid ? (
              <button className="pay-btn" onClick={handlePay}>
                Pay Now
              </button>
            ) : (
              <button className="download-btn" onClick={handleDownload}>
                Download Receipt (PDF)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== SUCCESS POPUP ===== */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-icon">✔</div>
            <h3>Payment Successful</h3>
            <p>Your maintenance payment was completed.</p>
            <button className="popup-btn" onClick={resetForm}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;
