import { useState, useEffect } from "react";
import { generateMaintenancePDF } from "../../utils/pdfGenerator";

function Maintenance() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const RATE = 2200;
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [months, setMonths] = useState(1);
  const [comment, setComment] = useState("");

  const TOTAL = months * RATE;

  /* GET LOGGED-IN USER NAME */
  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");
    if (email) {
      const user = JSON.parse(localStorage.getItem(email));
      if (user?.firstName) {
        setUserName(user.firstName);
      }
    }
  }, []);

  const handleDownload = () => {
    if (!month || !year) {
      alert("Please select month and year");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    generateMaintenancePDF(month, year, months, TOTAL, comment);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="page">
      {userName && <h3>Welcome, {userName}</h3>}

      <h2>Maintenance Details</h2>

      <label>Month</label>
      <select className="form-control" onChange={(e) => setMonth(e.target.value)}>
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
        className="form-control"
        type="number"
        placeholder="Enter Year"
        onChange={(e) => setYear(e.target.value)}
      />

      <label>Number of Months</label>
      <select
        className="form-control"
        onChange={(e) => setMonths(Number(e.target.value))}
      >
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Month{i + 1 > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <label>Total Maintenance</label>
      <input className="form-control" value={`₹ ${TOTAL}`} readOnly />

      <label>Comment</label>
      <textarea
        className="form-control"
        placeholder="Enter comment"
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleDownload} style={{ marginTop: "16px" }}>
        Download Receipt
      </button>

      {showSuccess && (
        <p style={{ color: "green", marginTop: "16px" }}>
          Receipt downloaded successfully
        </p>
      )}
    </div>
  );
}

export default Maintenance;

