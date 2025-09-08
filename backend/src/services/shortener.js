import { get, set, has, update } from '../repository/store.js';
import { generateShortcode, isValidShortcode } from '../utils/shortcode.js';
import { isValidUrl } from '../utils/validators.js';
import { nowISO, addMinutesISO, isExpired } from '../utils/time.js';
import { log } from '../logger/log.js';

export async function createShortUrl({ url, validity, shortcode }, hostname, port) {
  if (!isValidUrl(url)) throw { status: 400, message: 'Invalid URL' };

  let code = shortcode;
  if (code) {
    if (!isValidShortcode(code)) throw { status: 400, message: 'Invalid shortcode' };
    if (has(code)) throw { status: 409, message: 'Shortcode already exists' };
  } else {
    do {
      code = generateShortcode();
    } while (has(code));
  }

  const expiry = addMinutesISO(validity || 30);
  const record = { url, createdAt: nowISO(), expiry, clicks: [] };
  set(code, record);

  await log('info', 'service', `Short URL created: ${code}`);
  return { short: `http://${hostname}:${port}/${code}`, expiry };
}

export async function resolveShortcode(code) {
  const record = get(code);
  if (!record) throw { status: 404, message: 'Shortcode not found' };
  if (isExpired(record.expiry)) throw { status: 410, message: 'Link expired' };
  return record.url;
}

export async function trackClick(code, referrer, ip) {
  update(code, r => r.clicks.push({ timestamp: nowISO(), referrer, ip }));
  await log('debug', 'repository', `Click tracked for ${code}`);
}

export async function getStats(code, hostname, port) {
  const record = get(code);
  if (!record) throw { status: 404, message: 'Shortcode not found' };
  return {
    shortLink: `http://${hostname}:${port}/${code}`,
    originalUrl: record.url,
    createdAt: record.createdAt,
    expiry: record.expiry,
    totalClicks: record.clicks.length,
    clicks: record.clicks
  };
}
