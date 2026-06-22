const STORAGE_KEY = 'zamprime_saved_properties';

export function getSavedIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isSaved(propertyId) {
  return getSavedIds().includes(propertyId);
}

export function toggleSaved(propertyId) {
  const current = getSavedIds();
  const next = current.includes(propertyId)
    ? current.filter(id => id !== propertyId)
    : [...current, propertyId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function removeSaved(propertyId) {
  const next = getSavedIds().filter(id => id !== propertyId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}