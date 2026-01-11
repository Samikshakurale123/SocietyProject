import React from "react";

const ComplaintDetails = ({ selected, onClose }) => {
  if (!selected) return null;

  return (
    <div style={{ marginTop: "30px", borderTop: "1px solid #e5e7eb", paddingTop: "20px" }}>
      <h3>Complaint Details</h3>

      <p>
        <strong>Subject:</strong> {selected.subject}
      </p>

      <p>
        <strong>Date:</strong> {selected.date}
      </p>

      <p>
        <strong>Priority:</strong> {selected.priority}
      </p>

      <p>
        <strong>Description:</strong><br />
        {selected.body}
      </p>

      {selected.image && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={selected.image}
            alt="complaint"
            style={{ maxWidth: "300px", border: "1px solid #d1d5db" }}
          />
        </div>
      )}

      <button
        style={{ marginTop: "16px" }}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ComplaintDetails;
