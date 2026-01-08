import { useEffect, useState } from "react";
import "./Complaints.css";


function Complaints() {
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

    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setComplaint({ ...complaint, image: reader.result });
      };
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
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));

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
    <div className="complaints-page container mt-4">
      <h2 className="page-title">Raise a Complaint</h2>

      {/* FORM */}
      <div className="card complaint-card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <label>Subject</label>
            <input
              className="form-control"
              name="subject"
              value={complaint.subject}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="body"
              value={complaint.body}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={complaint.date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Priority</label>
              <select
                className="form-select"
                name="priority"
                value={complaint.priority}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Submit Complaint
          </button>
        </div>
      </div>

      {/* TABLE */}
      <h4 className="mt-5">My Complaints</h4>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
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
      <div className="modal fade" id="complaintModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Complaint Details</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selected && (
                <>
                  <p><strong>Subject:</strong> {selected.subject}</p>
                  <p><strong>Date:</strong> {selected.date}</p>
                  <p><strong>Priority:</strong> {selected.priority}</p>
                  <p><strong>Description:</strong></p>
                  <p>{selected.body}</p>

                  {selected.image && (
                    <img
                      src={selected.image}
                      alt="complaint"
                      className="img-fluid rounded mt-2"
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
}

export default Complaints;
