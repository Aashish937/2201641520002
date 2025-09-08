
export function isValidUrl(url) {
  if (typeof url !== 'string' || url.length > 2048) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function normalizeValidityMinutes(value, defaultMinutes = 30) {
  const n = Number(value);
  if (!Number.isFinite(n)) return defaultMinutes;
  const v = Math.floor(n);
  return v > 0 ? v : defaultMinutes;
}
