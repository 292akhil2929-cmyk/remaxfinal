import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Attaches a single delegated click listener to the document.
 * Fires a GA4 `outbound_click` event whenever a user clicks an external link.
 */
export default function OutboundLinkTracker() {
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const isExternal =
        href.startsWith('http') &&
        !href.includes(window.location.hostname);
      if (isExternal) {
        trackEvent('outbound_click', {
          link_url: href,
          link_text: anchor.innerText?.trim().slice(0, 100) || '',
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}