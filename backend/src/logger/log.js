import { log as baseLog } from '../../../logging-middleware/index.js';
import dotenv from 'dotenv';
dotenv.config();

export async function log(level, pkg, message) {
  try {
    await baseLog('backend', level, pkg, message);
  } catch (e) {
    // Fail silently
  }
}