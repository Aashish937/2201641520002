import dotenv from 'dotenv';
dotenv.config();

import { createServer } from './server.js';
import { log } from './logger/log.js';

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const app = createServer(HOSTNAME, PORT);
app.listen(PORT, async () => {
  await log('info', 'config', `Server started at http://${HOSTNAME}:${PORT}`);
});
