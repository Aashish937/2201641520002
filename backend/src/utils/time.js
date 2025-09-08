
export function nowISO() {
  return new Date().toISOString();
}


export function addMinutesISO(minutes) {
  const m = Number.isFinite(minutes) ? Number(minutes) : 0;
  const clamped = Math.max(1, Math.floor(m));
  return new Date(Date.now() + clamped * 60 * 1000).toISOString();
}


export function isExpired(iso) {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return true;
  return Date.now() > t;
}
