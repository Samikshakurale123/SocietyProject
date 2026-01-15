import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ComplaintDetails from "./ComplaintDetails";

const Complaints = () => {
  const { t } = useTranslation();

  const emptyForm = {
    subject: "",
    body: "",
    date: "",
    priority: "",
    image: "",
    progress: t("complaint.pending")
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
      setMessage(t("complaint.error"));
      return;
    }

    let updated = [...complaints];

    if (editIndex !== null) {
      updated[editIndex] = complaint;
      setEditIndex(null);
      setMessage(t("complaint.updateSuccess"));
    } else {
      updated.push(complaint);
      setMessage(t("complaint.success"));
    }

    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
    setComplaint({
      ...emptyForm,
      progress: t("complaint.pending")
    });
    setShowList(true);

    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (index) => {
    setComplaint(complaints[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm(t("complaint.confirmDelete"))) return;

    const updated = complaints.filter((_, i) => i !== index);
    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
  };

  return (
    <div className="complaints-wrapper">
      {/* LEFT FORM */}
      <div className="complaint-card">
        <h2 className="text-center mb-3">{t("complaint.title")}</h2>

        {message && <div className="message-box">{message}</div>}

        <label>
          {t("complaint.subject")} <span className="required">*</span>
        </label>
        <input
          className="form-control"
          name="subject"
          value={complaint.subject}
          onChange={handleChange}
        />

        <label>
          {t("complaint.description")} <span className="required">*</span>
        </label>
        <textarea
          className="form-control"
          rows="3"
          name="body"
          value={complaint.body}
          onChange={handleChange}
        />

        <label>
          {t("complaint.date")} <span className="required">*</span>
        </label>
        <input
          type="date"
          className="form-control"
          name="date"
          min={today}
          value={complaint.date}
          onChange={handleChange}
        />

        <label>
          {t("complaint.priority")} <span className="required">*</span>
        </label>
        <select
          className="form-control"
          name="priority"
          value={complaint.priority}
          onChange={handleChange}
        >
          <option value="">{t("complaint.selectPriority")}</option>
          <option value="High">{t("priority.high")}</option>
          <option value="Medium">{t("priority.medium")}</option>
          <option value="Low">{t("priority.low")}</option>
        </select>

        <label>{t("complaint.upload")}</label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleChange}
        />

        <button className="btn-submit w-100 mt-3" onClick={handleSubmit}>
          {editIndex !== null
            ? t("complaint.update")
            : t("complaint.submit")}
        </button>
      </div>

      {/* RIGHT LIST */}
      {showList && (
        <div className="complaint-list-box">
          <h3 className="mb-3">{t("complaint.yourComplaints")}</h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>{t("complaint.subject")}</th>
                <th>{t("complaint.date")}</th>
                <th>{t("complaint.priority")}</th>
                <th>{t("complaint.status")}</th>
                <th>{t("complaint.actions")}</th>
              </tr>
            </thead>

            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    {t("complaint.noComplaints")}
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
                        {t(`priority.${c.priority.toLowerCase()}`)}
                      </span>
                    </td>
                    <td>{c.progress}</td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(i)}
                      >
                        {t("complaint.edit")}
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(i)}
                      >
                        {t("complaint.delete")}
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

