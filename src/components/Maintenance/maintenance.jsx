import { useState } from "react";
import { generateMaintenancePDF } from "../../utils/pdfGenerator";
import "./maintenance.css";

function Maintenance() {
  const [showSuccess, setShowSuccess] = useState(false);

  const RATE = 2200;

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [months, setMonths] = useState(1);
  const [comment, setComment] = useState("");

  const TOTAL = months * RATE;

  const handleDownload = () => {
    if (!month || !year) {
      alert("Please select month and year");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment before downloading");
      return;
    }

    generateMaintenancePDF(month, year, months, TOTAL, comment);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
        <h2>Maintenance Details</h2>

        <label>Month</label>
        <select onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          {[
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
          ].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <label>Year</label>
        <input
          type="number"
          placeholder="Enter Year"
          onChange={(e) => setYear(e.target.value)}
        />

        <label>Number of Months</label>
        <select onChange={(e) => setMonths(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Month{i + 1 > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <label>Total Maintenance</label>
        <input value={`₹ ${TOTAL}`} readOnly />

        <label>Comment</label>
        <textarea
          placeholder="Enter comment"
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleDownload}>
          Download Receipt
        </button>

        {showSuccess && (
          <div className="success_popup">
            ✅ Receipt downloaded successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
