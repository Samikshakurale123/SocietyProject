import React, { useEffect, useState } from "react";
import "./Complaints.css";

const Complaints = () => {
  const [complaint, setComplaint] = useState({
    subject: "",
    body: "",
    date: "",
    priority: "",
    image: ""
  });

  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () =>
        setComplaint({ ...complaint, image: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setComplaint({ ...complaint, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!complaint.subject || !complaint.body || !complaint.date) {
      alert("Please fill all required fields");
      return;
    }

    const updated = [...complaints, complaint];
    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);

    setComplaint({
      subject: "",
      body: "",
      date: "",
      priority: "",
      image: ""
    });

    alert("Complaint submitted successfully");
  };

  return (
    <div className="complaints-page">
      <h2 className="page-title">Raise a Complaint</h2>

      {/* FORM */}
      <div className="complaint-card">
        <label>Subject</label>
        <input
          name="subject"
          value={complaint.subject}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="body"
          value={complaint.body}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={complaint.date}
          onChange={handleChange}
        />

        <label>Priority</label>
        <select
          name="priority"
          value={complaint.priority}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <label>Upload Image</label>
        <input type="file" name="image" onChange={handleChange} />

        <button onClick={handleSubmit}>Submit Complaint</button>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No complaints found
                </td>
              </tr>
            ) : (
              complaints.map((c, i) => (
                <tr
                  key={i}
                  className="clickable-row"
                  data-bs-toggle="modal"
                  data-bs-target="#complaintModal"
                  onClick={() => setSelected(c)}
                >
                  <td>{c.subject}</td>
                  <td>{c.date}</td>
                  <td>{c.priority}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
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
              {selected && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
