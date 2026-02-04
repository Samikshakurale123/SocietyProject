import React from "react";
import { useTranslation } from "react-i18next";

const ComplaintDetails = ({ selected, onClose }) => {
  const { t } = useTranslation("complaintDetails");

  if (!selected) return null;

  return (
    <div className="complaint-details-card fade-up">
      <h3 className="mb-3">{t("title")}</h3>

      <p>
        <strong>{t("subject")}:</strong> {selected.subject}
      </p>

      <p>
        <strong>{t("date")}:</strong> {selected.date}
      </p>

      <p>
        <strong>{t("priority")}:</strong>{" "}
        <span className={`priority-badge ${selected.priority.toLowerCase()}`}>
          {selected.priority}
        </span>
      </p>

      <p>
        <strong>{t("description")}:</strong>
        <br />
        {selected.body}
      </p>

      {selected.image && (
        <div className="complaint-image">
          <img src={selected.image} alt={t("imageAlt")} />
        </div>
      )}

      <div className="text-end mt-3">
        <button className="btn btn-primary" onClick={onClose}>
          {t("close")}
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetails;
