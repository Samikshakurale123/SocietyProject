import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Complaints = () => {
  const { t } = useTranslation();

<<<<<<< HEAD
  const initialForm = { subject: "", body: "", date: "", priority: "", image: "", progress: "pending" };
  const [form, setForm] = useState(initialForm);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
=======
  const initialForm = {
    subject: "",
    body: "",
    date: "",
    priority: "",
    image: "",
    progress: t("complaint.pending"),
  };

  const [form, setForm] = useState(initialForm);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setList(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const reader = new FileReader();
<<<<<<< HEAD
      reader.onload = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(files[0]);
    } else setForm({ ...form, [name]: value });
=======
      reader.onload = () =>
        setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
  };

  const handleSubmit = () => {
    if (!form.subject || !form.body || !form.date || !form.priority) {
<<<<<<< HEAD
      setMsg(t("complaintError"));
=======
      setMsg(t("complaint.validation"));
>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
      return;
    }
    const updated = [...list, form];
    localStorage.setItem("complaints", JSON.stringify(updated));
    setList(updated);
    setForm(initialForm);
<<<<<<< HEAD
    setMsg(t("complaintSuccess"));
=======
    setMsg(t("complaint.success"));
>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="page-container">
      {/* ================= FORM ================= */}
      <div className="complaint-card">
        <h2>{t("complaintTitle")}</h2>

        {msg && <div className="message-box success">{msg}</div>}

<<<<<<< HEAD
        <label>{t("complaintSubject")}</label>
        <input name="subject" value={form.subject} onChange={handleChange} />

        <label>{t("complaintDescription")}</label>
        <textarea name="body" value={form.body} onChange={handleChange} />

        <label>{t("complaintDate")}</label>
        <input type="date" name="date" min={today} value={form.date} onChange={handleChange} />

        <label>{t("complaintPriority")}</label>
        <div className="priority-radio">
          {["High","Medium","Low"].map(p => (
            <label key={p} className={`radio-btn ${p.toLowerCase()}`}>
              <input type="radio" name="priority" value={p} checked={form.priority === p} onChange={handleChange} />
              {t(`priority${p}`)}
=======
        <label>{t("complaint.subject")} *</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />

        <label>{t("complaint.description")} *</label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
        />

        <label>{t("complaint.date")} *</label>
        <input
          type="date"
          name="date"
          min={today}
          value={form.date}
          onChange={handleChange}
        />

        <label>{t("complaint.priority")} *</label>
        <div className="priority-group">
          {["high", "medium", "low"].map((p) => (
            <label key={p} className={`priority-option ${p}`}>
              <input
                type="radio"
                name="priority"
                value={p}
                checked={form.priority === p}
                onChange={handleChange}
              />
              <span>{t(`priority.${p}`)}</span>
>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
            </label>
          ))}
        </div>

        <label>{t("complaintUpload")}</label>
        <input type="file" name="image" onChange={handleChange} />

        <button className="btn-submit" onClick={handleSubmit}>{t("complaintSubmit")}</button>
      </div>

<<<<<<< HEAD
      {list.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>{t("complaintSubject")}</th>
              <th>{t("complaintDate")}</th>
              <th>{t("complaintPriority")}</th>
              <th>{t("complaintStatusPending")}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c, i) => (
              <tr key={i}>
                <td>{c.subject}</td>
                <td>{c.date}</td>
                <td>{t(`priority${c.priority}`)}</td>
                <td>{t(`complaintStatus${c.progress.charAt(0).toUpperCase() + c.progress.slice(1)}`)}</td>
=======
      {/* ================= TABLE (FIRST IMAGE STYLE) ================= */}
      {list.length > 0 && (
        <div className="complaint-list-box">
          <table>
            <thead>
              <tr>
                <th>{t("complaint.subject")}</th>
                <th>{t("complaint.date")}</th>
                <th>{t("complaint.priority")}</th>
                <th>{t("complaint.status")}</th>
>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
              </tr>
            </thead>

            <tbody>
              {list.map((c, i) => (
                <tr
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedComplaint(c)}
                >
                  <td>{c.subject}</td>
                  <td>{c.date}</td>
                  <td>
                    <span className={`priority-badge ${c.priority}`}>
                      {t(`priority.${c.priority}`)}
                    </span>
                  </td>
                  <td>{c.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= POPUP DETAILS ================= */}
      {selectedComplaint && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>{t("complaint.title")}</h3>

            <p>
              <strong>{t("complaint.subject")}:</strong>{" "}
              {selectedComplaint.subject}
            </p>

            <p>
              <strong>{t("complaint.description")}:</strong>{" "}
              {selectedComplaint.body}
            </p>

            <p>
              <strong>{t("complaint.date")}:</strong>{" "}
              {selectedComplaint.date}
            </p>

            <p>
              <strong>{t("complaint.priority")}:</strong>{" "}
              <span
                className={`priority-badge ${selectedComplaint.priority}`}
              >
                {t(`priority.${selectedComplaint.priority}`)}
              </span>
            </p>

            <p>
              <strong>{t("complaint.status")}:</strong>{" "}
              {selectedComplaint.progress}
            </p>

            {selectedComplaint.image && (
              <img
                src={selectedComplaint.image}
                alt="complaint"
                style={{
                  width: "100%",
                  marginTop: "12px",
                  borderRadius: "6px",
                }}
              />
            )}

            <button
              className="popup-btn"
              onClick={() => setSelectedComplaint(null)}
            >
              {t("common.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
<<<<<<< HEAD

=======
>>>>>>> 903ae14ef92ceeff1775da8a3da3340003dcfa10
