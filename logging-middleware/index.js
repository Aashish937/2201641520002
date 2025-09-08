import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function log(stack, level, pkg, message) {
  const validStacks = ['backend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const validPackages = [
    'cache', 'controller', 'cron_job', 'db', 'domain',
    'handler', 'repository', 'route', 'service',
    'auth', 'config', 'middleware', 'utils'
  ];

  if (!validStacks.includes(stack) || !validLevels.includes(level) || !validPackages.includes(pkg)) {
    throw new Error('Invalid log parameters');
  }

  const body = { stack, level, package: pkg, message };
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(process.env.LOG_API, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Log failed: ${res.status} ${text}`);
  }
}