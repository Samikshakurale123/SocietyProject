import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Complaints = () => {
  const { t } = useTranslation();

  const initialForm = {
    subject: "",
    body: "",
    date: "",
    priority: "",
    image: "",
    progress: t("complaint.pending")
  };

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
      reader.onload = () =>
        setForm({ ...form, image: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (
      form.subject.length < 3 ||
      form.body.length < 5 ||
      !form.date ||
      !form.priority
    ) {
      setMsg(t("complaint.error"));
      return;
    }

    const updated = [...list, form];
    localStorage.setItem("complaints", JSON.stringify(updated));
    setList(updated);

    setForm(initialForm);
    setMsg(t("complaint.success"));

    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="complaints-wrapper">
      <div className="complaint-card">
        <h2>{t("complaint.title")}</h2>

        {msg && <div className="message-box">{msg}</div>}

        <label>
          {t("complaint.subject")} <span className="required">*</span>
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />

        <label>
          {t("complaint.description")} <span className="required">*</span>
        </label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
        />

        <label>
          {t("complaint.date")} <span className="required">*</span>
        </label>
        <input
          type="date"
          name="date"
          min={today}
          value={form.date}
          onChange={handleChange}
        />

        {/* ✅ CLEAN PRIORITY UI */}
        <label>
          {t("complaint.priority")} <span className="required">*</span>
        </label>

        <div className="priority-radio">
          {["High", "Medium", "Low"].map((p) => (
            <label key={p} className={`radio-btn ${p.toLowerCase()}`}>
              <input
                type="radio"
                name="priority"
                value={p}
                checked={form.priority === p}
                onChange={handleChange}
              />
              {t(`priority.${p.toLowerCase()}`)}
            </label>
          ))}
        </div>

        <label>{t("complaint.upload")}</label>
        <input type="file" name="image" onChange={handleChange} />

        <button className="btn-submit" onClick={handleSubmit}>
          {t("complaint.submit")}
        </button>
      </div>

      {/* LIST */}
      {list.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>{t("complaint.subject")}</th>
              <th>{t("complaint.date")}</th>
              <th>{t("complaint.priority")}</th>
              <th>{t("complaint.status")}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c, i) => (
              <tr key={i}>
                <td>{c.subject}</td>
                <td>{c.date}</td>
                <td>
                  <span className={`priority-badge ${c.priority.toLowerCase()}`}>
                    {t(`priority.${c.priority.toLowerCase()}`)}
                  </span>
                </td>
                <td>{c.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Complaints;



