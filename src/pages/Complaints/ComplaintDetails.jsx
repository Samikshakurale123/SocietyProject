import React from "react";

const ComplaintDetails = ({ selected, onClose }) => {
  if (!selected) return null;

  return (
    <div className="complaint-details-card fade-up">
      <h3 className="mb-3">Complaint Details</h3>

      <p>
        <strong>Subject:</strong> {selected.subject}
      </p>

      <p>
        <strong>Date:</strong> {selected.date}
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        <span className={`priority-badge ${selected.priority.toLowerCase()}`}>
          {selected.priority}
        </span>
      </p>

      <p>
        <strong>Description:</strong>
        <br />
        {selected.body}
      </p>

      {selected.image && (
        <div className="complaint-image">
          <img src={selected.image} alt="complaint" />
        </div>
      )}

      <div className="text-end mt-3">
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetails;

