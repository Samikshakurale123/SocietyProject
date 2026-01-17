import React from "react";
import i18n from "i18next";

const LanguageSwitcher = () => {
  return (
    <div className="d-flex gap-2">
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>

      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => i18n.changeLanguage("hi")}
      >
        हिंदी
      </button>

      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => i18n.changeLanguage("mr")}
      >
        मराठी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
