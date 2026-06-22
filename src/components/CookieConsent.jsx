import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie_consent_given';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-lg px-4 py-4 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-600 font-body leading-relaxed max-w-2xl">
          We use cookies to improve your experience and track analytics. By continuing, you agree to our{' '}
          <a href="/privacy-policy" className="underline hover:text-gray-900 transition-colors">Privacy Policy</a>.
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handleDecline}
            className="text-xs text-gray-400 hover:text-gray-700 font-body transition-colors underline underline-offset-2"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="bg-[#DC1C2E] hover:bg-[#b81626] text-white font-heading font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}