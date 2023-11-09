import React, { useState } from 'react';
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

const CookieConsentBanner = () => {
  // State for managing detailed consents
  const [consentDetails, setConsentDetails] = useState({
    necessary: true, // Necessary cookies are always on.
    analytics: false,
    marketing: false,
  });

  const handleAccept = () => {
    // Here you would typically inform your cookie handling logic
    // about the user's choices, for example by setting corresponding cookies.
    // You could also send this information to a backend service to record the consent.
  };

  const handleChange = (name, value) => {
    setConsentDetails({ ...consentDetails, [name]: value });
  };

  // This function could be used to render checkboxes for granular consent
  const renderConsentOptions = () => {
    return (
      <div className='flex gap-6'>
        <label>
          <input
            type="checkbox"
            checked={consentDetails.analytics}
            onChange={() => handleChange('analytics', !consentDetails.analytics)}
          />
          Analytics Cookies
        </label>
        <label>
          <input
            type="checkbox"
            checked={consentDetails.marketing}
            onChange={() => handleChange('marketing', !consentDetails.marketing)}
          />
          Marketing Cookies
        </label>
      </div>
    );
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="I accept"
      declineButtonText="I don't accept"
      cookieName="userConsentCookie"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
      onAccept={handleAccept}
      enableDeclineButton
      onDecline={() => {
        console.log('Cookies were declined');
      }}
    >
      <p>We Value Your Privacy.</p>
      {/* {renderConsentOptions()} */}
      <span style={{ fontSize: "10px" }}>
        We use cookies to bring you the best experience of our website. The cookies are so called session cookies essential and necessary for the operation of this website. By declining, you will not be able to login and use the cart functionality.
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
