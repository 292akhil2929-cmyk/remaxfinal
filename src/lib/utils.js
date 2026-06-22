import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 

/**
 * Extracts the 11-character YouTube video ID from various URL formats.
 * Supports:
 *   - https://www.youtube.com/watch?v=XXXXXX
 *   - https://youtu.be/XXXXXX
 *   - https://youtube.com/shorts/XXXXXX
 *   - https://www.youtube.com/embed/XXXXXX
 *   - Plain 11-character video ID passed directly
 * Returns the clean video ID or null if extraction fails.
 */
export function extractYoutubeVideoId(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  // If already a plain 11-char ID (alphanumeric + _ + -)
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    // Standard watch URL: youtube.com/watch?v=XXXXXX
    if (url.searchParams.has('v')) {
      const id = url.searchParams.get('v');
      if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    // Short URL: youtu.be/XXXXXX
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    // Shorts URL: youtube.com/shorts/XXXXXX
    if (url.pathname.startsWith('/shorts/')) {
      const id = url.pathname.split('/shorts/')[1].split('/')[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    // Embed URL: youtube.com/embed/XXXXXX
    if (url.pathname.startsWith('/embed/')) {
      const id = url.pathname.split('/embed/')[1].split('/')[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    // Not a valid URL — return trimmed as-is if it looks like an ID
    if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
  }
  return null;
}

export const isIframe = window.self !== window.top;
