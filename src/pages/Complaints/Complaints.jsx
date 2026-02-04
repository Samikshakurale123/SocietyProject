import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getComplaints, addComplaint } from "../../api/complaintApi";

const Complaints = () => {
  const { t } = useTranslation();

  /* ================= INITIAL FORM ================= */
  const initialForm = {
    subject: "",
    description: "",
    priority: "",
    image: "",
  };

  const [form, setForm] = useState(initialForm);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  /* ================= LOAD FROM DATABASE ================= */
  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await getComplaints();
      setList(res.data);
    } catch (error) {
      console.error(error);
      setMsg("Failed to load complaints");
    }
  };

  /* ================= HANDLE INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Image upload (Base64)
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ================= SUBMIT TO DATABASE ================= */
  const handleSubmit = async () => {
    if (!form.subject || !form.description || !form.priority) {
      setMsg(t("complaint.validation"));
      return;
    }

    try {
      await addComplaint(form);
      setMsg(t("complaint.success"));
      setForm(initialForm);
      loadComplaints();

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error(error);
      setMsg("Error saving complaint");
    }
  };

  return (
    <div className="page-container">
      {/* ================= FORM ================= */}
      <div className="complaint-card">
        <h2>{t("complaint.title")}</h2>

        {msg && <div className="message-box success">{msg}</div>}

        <label>{t("complaint.subject")} *</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />

        <label>{t("complaint.description")} *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label>{t("complaint.priority")} *</label>
        <div className="priority-group">
          {["HIGH", "MEDIUM", "LOW"].map((p) => (
            <label key={p} className={`priority-option ${p.toLowerCase()}`}>
              <input
                type="radio"
                name="priority"
                value={p}
                checked={form.priority === p}
                onChange={handleChange}
              />
              <span>{t(`priority.${p.toLowerCase()}`)}</span>
            </label>
          ))}
        </div>

        <label>{t("complaintUpload")}</label>
        <input type="file" name="image" onChange={handleChange} />

        <button className="btn-submit" onClick={handleSubmit}>
          {t("complaintSubmit")}
        </button>
      </div>

      {/* ================= TABLE ================= */}
      {list.length > 0 && (
        <div className="complaint-list-box">
          <table>
            <thead>
              <tr>
                <th>{t("complaint.subject")}</th>
                <th>{t("complaint.priority")}</th>
                <th>{t("complaint.status")}</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedComplaint(c)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{c.subject}</td>
                  <td>
                    <span
                      className={`priority-badge ${c.priority.toLowerCase()}`}
                    >
                      {c.priority}
                    </span>
                  </td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= POPUP ================= */}
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
              {selectedComplaint.description}
            </p>

            <p>
              <strong>{t("complaint.priority")}:</strong>{" "}
              {selectedComplaint.priority}
            </p>

            <p>
              <strong>{t("complaint.status")}:</strong>{" "}
              {selectedComplaint.status}
            </p>

            {selectedComplaint.image && (
              <img
                src={selectedComplaint.image}
                alt="complaint"
                style={{ width: "100%", marginTop: "12px" }}
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
