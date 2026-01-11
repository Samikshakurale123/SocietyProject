import { useEffect, useState } from "react";
import ComplaintDetails from "./ComplaintDetails";

const Complaints = () => {
  const emptyForm = {
    subject: "",
    body: "",
    date: "",
    priority: "",
    image: "",
    progress: "Pending"
  };

  const [complaint, setComplaint] = useState(emptyForm);
  const [complaints, setComplaints] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
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
      setMessage("Please fill all mandatory fields correctly");
      return;
    }

    let updated;

    if (editIndex !== null) {
      updated = [...complaints];
      updated[editIndex] = complaint;
      setEditIndex(null);
      setMessage("Complaint updated successfully");
    } else {
      updated = [...complaints, complaint];
      setMessage("Complaint submitted successfully");
    }

    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
    setComplaint(emptyForm);

    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (index) => {
    setComplaint(complaints[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;

    const updated = complaints.filter((_, i) => i !== index);
    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
  };

  const priorityBadge = (p) => {
    return `priority-badge ${p.toLowerCase()}`;
  };

  return (
    <div className="complaints-page">
      <h2 className="page-title">Raise a Complaint</h2>

      <div className="complaint-card">
        <label>Subject *</label>
        <input
          name="subject"
          value={complaint.subject}
          onChange={handleChange}
        />

        <label>Description *</label>
        <textarea
          name="body"
          value={complaint.body}
          onChange={handleChange}
        />

        <label>Date *</label>
        <input
          type="date"
          name="date"
          min={today}
          value={complaint.date}
          onChange={handleChange}
        />

        <label>Priority *</label>
        <select
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
        <input type="file" name="image" onChange={handleChange} />

        <button className="submit-btn" onClick={handleSubmit}>
          {editIndex !== null ? "Update Complaint" : "Submit Complaint"}
        </button>

        {message && <p className="flash-message">{message}</p>}
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="5">No complaints found</td>
              </tr>
            ) : (
              complaints.map((c, i) => (
                <tr key={i}>
                  <td>{c.subject}</td>
                  <td>{c.date}</td>
                  <td>
                    <span className={priorityBadge(c.priority)}>
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
    </div>
  );
};

export default Complaints;

