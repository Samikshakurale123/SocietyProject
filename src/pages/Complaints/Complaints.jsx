import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Complaints = () => {
  const { t } = useTranslation();

  const initialForm = { subject: "", body: "", date: "", priority: "", image: "", progress: "pending" };
  const [form, setForm] = useState(initialForm);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setList(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(files[0]);
    } else setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.subject || !form.body || !form.date || !form.priority) {
      setMsg(t("complaintError"));
      return;
    }
    const updated = [...list, form];
    localStorage.setItem("complaints", JSON.stringify(updated));
    setList(updated);
    setForm(initialForm);
    setMsg(t("complaintSuccess"));
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="complaints-wrapper">
      <div className="complaint-card">
        <h2>{t("complaintTitle")}</h2>

        {msg && <div className="message-box">{msg}</div>}

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
            </label>
          ))}
        </div>

        <label>{t("complaintUpload")}</label>
        <input type="file" name="image" onChange={handleChange} />

        <button className="btn-submit" onClick={handleSubmit}>{t("complaintSubmit")}</button>
      </div>

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Complaints;

