import { useEffect, useState } from "react";
import ComplaintDetails from "./ComplaintDetails";

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

  // Load complaints from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
  }, []);

  // Handle form input
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

  // Submit complaint
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
    <div className="page-container">
      <h2>Raise a Complaint</h2>

      {/* FORM */}
      <div className="card">
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

        <label>Upload Image (optional)</label>
        <input type="file" name="image" onChange={handleChange} />

        <button onClick={handleSubmit}>Submit Complaint</button>
      </div>

      {/* TABLE */}
      <div className="card">
        <h3>Submitted Complaints</h3>

        <table>
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
                <td colSpan="3">No complaints found</td>
              </tr>
            ) : (
              complaints.map((c, i) => (
                <tr
                  key={i}
                  style={{ cursor: "pointer" }}
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

      {/* DETAILS PANEL */}
      <ComplaintDetails
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default Complaints;

