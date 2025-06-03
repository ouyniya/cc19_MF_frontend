import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent_accepted";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#222",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <p style={{ margin: "0 0 0.5rem 0" }}>
        เว็บไซต์นี้ใช้คุกกี้เพื่อจัดการ session การล็อกอินและประสบการณ์การใช้งานของคุณ
      </p>
      <button
        onClick={handleAccept}
        style={{
          backgroundColor: "#4caf50",
          border: "none",
          padding: "0.5rem 1rem",
          color: "white",
          cursor: "pointer",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        ยอมรับ
      </button>
    </div>
  );
}
