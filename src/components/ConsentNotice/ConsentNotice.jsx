import { useEffect, useRef, useState } from 'react';
import './ConsentNotice.css';

const CONSENT_COOKIE_NAME = 'cookiesAccepted';
const SKIP_TRACKING_COOKIE_NAME = 'skip_pv';
const COOKIE_MAX_AGE_DAYS = 30;
const GA_MEASUREMENT_ID = 'G-Y4LB5LLVVS';

function setCookie(name, value, days) {
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expiresAt}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`))
    ?.split('=')[1] ?? null;
}

function shouldSkipTracking() {
  return getCookie(SKIP_TRACKING_COOKIE_NAME) === 'true';
}

function loadGoogleAnalytics() {
  if (shouldSkipTracking()) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    return;
  }

  if (window.__ovueAnalyticsLoaded) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const existingScript = document.querySelector(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
  );

  if (!existingScript) {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    analyticsScript.async = true;
    document.head.appendChild(analyticsScript);
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  window.__ovueAnalyticsLoaded = true;
}

function ConsentNotice({ privacyPolicyUrl = 'https://www.ines-heilmann.de/datenschutz' }) {
  const [isVisible, setIsVisible] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    const consent = getCookie(CONSENT_COOKIE_NAME);

    if (consent === 'true') {
      loadGoogleAnalytics();
      setIsVisible(false);
      return;
    }

    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookie(CONSENT_COOKIE_NAME, 'true', COOKIE_MAX_AGE_DAYS);
    loadGoogleAnalytics();
    setIsVisible(false);
  }

  function handleDecline() {
    setCookie(CONSENT_COOKIE_NAME, 'false', COOKIE_MAX_AGE_DAYS);
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="consent-notice"
      id="consent-notice"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Hinweis"
    >
      <p className="consent-notice__text text-block-no-margin">
        Diese Website verwendet Cookies, um Analysedaten mit Hilfe von Google Analytics zu
        erfassen. Weitere Informationen finden Sie in der{' '}
        <a
          className="consent-notice__link"
          href={privacyPolicyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Datenschutzerklärung
        </a>
        .
      </p>

      <div className="consent-notice__actions">
        <button type="button" className="consent-notice__button" onClick={handleAccept}>
          Zustimmen
        </button>
        <button
          type="button"
          className="consent-notice__button consent-notice__button--secondary"
          onClick={handleDecline}
        >
          Ablehnen
        </button>
      </div>
    </div>
  );
}

export default ConsentNotice;