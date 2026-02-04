import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div className="page">
      <h1>{t("title")}</h1>

      <p>{t("intro")}</p>

      <h2>{t("overviewTitle")}</h2>
      <ul>
        <li><strong>{t("projectTypeLabel")}:</strong> {t("projectType")}</li>
        <li><strong>{t("floorsLabel")}:</strong> {t("floors")}</li>
        <li><strong>{t("unitsLabel")}:</strong> {t("units")}</li>
        <li><strong>{t("typesLabel")}:</strong> {t("types")}</li>
        <li><strong>{t("statusLabel")}:</strong> {t("status")}</li>
        <li><strong>{t("completionLabel")}:</strong> {t("completion")}</li>
      </ul>

      <h2>{t("amenitiesTitle")}</h2>
      <ul>
        <li>{t("amenities.0")}</li>
        <li>{t("amenities.1")}</li>
        <li>{t("amenities.2")}</li>
        <li>{t("amenities.3")}</li>
        <li>{t("amenities.4")}</li>
        <li>{t("amenities.5")}</li>
        <li>{t("amenities.6")}</li>
        <li>{t("amenities.7")}</li>
      </ul>

      <h2>{t("locationTitle")}</h2>
      <p>{t("locationDesc")}</p>

      <h2>{t("contactTitle")}</h2>
      <p><strong>{t("phoneLabel")}:</strong> +91 98765 43210</p>
      <p><strong>{t("emailLabel")}:</strong> info@apartmentname.com</p>

      <p>
        <strong>{t("addressLabel")}:</strong><br />
        {t("address.line1")}<br />
        {t("address.line2")}<br />
        {t("address.line3")}
      </p>

      <h2>{t("mapTitle")}</h2>
      <iframe
        title="Apartment Location"
        src="https://www.google.com/maps?q=City&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default About;
