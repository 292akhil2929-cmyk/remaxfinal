export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  // Accepts: +971501234567, 0501234567, 971501234567 — min 7, max 15 digits
  const digits = phone.replace(/[\s\-\+\(\)]/g, '');
  return /^\d{7,15}$/.test(digits);
}

export function isValidName(name) {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length >= 2;
}

export function isValidPrice(price) {
  if (price === '' || price == null) return false;
  const num = Number(price);
  return !Number.isNaN(num) && num > 0;
}

export function getFieldError(field, value, label) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${label} is required`;
  }

  switch (field) {
    case 'email':
      if (!isValidEmail(value)) return 'Please enter a valid email address';
      break;
    case 'phone':
      if (!isValidPhone(value)) return 'Please enter a valid phone number';
      break;
    case 'name':
      if (!isValidName(value)) return 'Name must be at least 2 characters';
      break;
    case 'price':
      if (!isValidPrice(value)) return 'Please enter a valid amount';
      break;
  }
  return null;
}

/**
 * Sanitize a string for safe insertion into Bitrix API fields and COMMENTS.
 * Strips HTML tags, null bytes, and control characters to prevent injection.
 * Returns a trimmed string or empty string for non-string input.
 */
export function sanitize(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') return '';
  return value
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip HTML tags to prevent XSS in COMMENTS
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Deep-sanitize all string values in an object. Returns a new object.
 * Used before sending any payload to Bitrix.
 */
export function sanitizePayload(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === 'string') {
      result[key] = sanitize(val);
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = sanitizePayload(val);
    } else if (Array.isArray(val)) {
      result[key] = val.map(item =>
        typeof item === 'string' ? sanitize(item) :
        item && typeof item === 'object' ? sanitizePayload(item) : item
      );
    }
  }
  return result;
}
