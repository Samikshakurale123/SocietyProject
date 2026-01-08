import React from "react";

const ComplaintModal = ({ selected }) => {
  return (
    <div className="modal fade" id="complaintModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Complaint Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {selected ? (
              <>
                <p>
                  <strong>Subject:</strong> {selected.subject}
                </p>
                <p>
                  <strong>Date:</strong> {selected.date}
                </p>
                <p>
                  <strong>Priority:</strong> {selected.priority}
                </p>
                <p>{selected.body}</p>

                {selected.image && (
                  <img
                    src={selected.image}
                    alt="complaint"
                    className="img-fluid rounded"
                  />
                )}
              </>
            ) : (
              <p>No complaint selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
