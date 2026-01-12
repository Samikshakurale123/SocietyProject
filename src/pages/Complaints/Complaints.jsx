import React, { useEffect, useState } from "react";
import ComplaintDetails from "./ComplaintDetails";

const Complaints = () => {
  const emptyForm = {
    subject: "",
    body: "",
    date: "",
    priority: "",
    image: "",
    progress: "Pending",
  };

  const [complaint, setComplaint] = useState(emptyForm);
  const [complaints, setComplaints] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
    if (saved.length > 0) setShowList(true);
  }, []);

  const today = new Date().toISOString().split("T")[0];

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
    if (
      complaint.subject.length < 3 ||
      complaint.body.length < 5 ||
      !complaint.date ||
      !complaint.priority
    ) {
      setMessage("Please fill all required fields correctly");
      return;
    }

    let updated = [...complaints];

    if (editIndex !== null) {
      updated[editIndex] = complaint;
      setEditIndex(null);
      setMessage("Complaint updated successfully");
    } else {
      updated.push(complaint);
      setMessage("Complaint submitted successfully");
    }

    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
    setComplaint(emptyForm);
    setShowList(true);

    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (index) => {
    setComplaint(complaints[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this complaint?")) return;

    const updated = complaints.filter((_, i) => i !== index);
    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
  };

  return (
    <div className="complaints-wrapper">
      {/* LEFT FORM */}
      <div className="complaint-card">
        <h2 className="text-center mb-3">Raise a Complaint</h2>

        {message && <div className="message-box">{message}</div>}

        <label>Subject *</label>
        <input
          className="form-control"
          name="subject"
          value={complaint.subject}
          onChange={handleChange}
        />

        <label>Description *</label>
        <textarea
          className="form-control"
          rows="3"
          name="body"
          value={complaint.body}
          onChange={handleChange}
        />

        <label>Date *</label>
        <input
          type="date"
          className="form-control"
          name="date"
          min={today}
          value={complaint.date}
          onChange={handleChange}
        />

        <label>Priority *</label>
        <select
          className="form-control"
          name="priority"
          value={complaint.priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Upload Image</label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleChange}
        />

        <button className="btn-submit w-100 mt-3" onClick={handleSubmit}>
          {editIndex !== null ? "Update Complaint" : "Submit Complaint"}
        </button>
      </div>

      {/* RIGHT LIST */}
      {showList && (
        <div className="complaint-list-box">
          <h3 className="mb-3">Your Complaints</h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No complaints found
                  </td>
                </tr>
              ) : (
                complaints.map((c, i) => (
                  <tr key={i}>
                    <td>{c.subject}</td>
                    <td>{c.date}</td>
                    <td>
                      <span
                        className={`priority-badge ${c.priority.toLowerCase()}`}
                      >
                        {c.priority}
                      </span>
                    </td>
                    <td>{c.progress}</td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(i)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Complaints;
