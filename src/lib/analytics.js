// GA4 Analytics helper — wraps window.gtag with safe guards
export const GA_MEASUREMENT_ID = 'G-99V9C9JK01';

/** SSR-safe guard: returns true only in browser with gtag available */
function hasGtag() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/** Fire a GA4 page_view event (used by SPA route tracker) */
export function trackPageView(path) {
  if (!hasGtag()) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Fire a custom GA4 event */
export function trackEvent(eventName, params = {}) {
  if (!hasGtag()) return;
  window.gtag('event', eventName, params);
}

/**
 * Fire a GA4 `generate_lead` event for lead conversion tracking.
 * Fails silently if GA4 is blocked or unavailable (SSR / adblockers).
 *
 * @param {'form_submission'|'whatsapp'|'phone'|'email'} method  — Lead acquisition channel
 * @param {object} [additionalData] — Extra params merged into the event (lead_type, source, etc.)
 */
export function trackLeadEvent(method, additionalData = {}) {
  if (!hasGtag()) return;
  try {
    window.gtag('event', 'generate_lead', {
      method,
      ...additionalData,
    });
  } catch {
    // Silently ignore — ad blocker or network failure
  }
}