import express from 'express';
import helmet from 'helmet';
import { shortUrlsRouter } from './routes/shorturls.js';
import { resolveShortcode, trackClick } from './services/shortener.js';
import { log } from './logger/log.js';

export function createServer(hostname, port) {
  const app = express();
  app.set('trust proxy', true);
  app.use(helmet());
  app.use(express.json());

  app.get('/:shortcode', async (req, res) => {
    try {
      const url = await resolveShortcode(req.params.shortcode);
      const referrer = req.get('referer') || null;
      const ip = req.ip || null;
      await trackClick(req.params.shortcode, referrer, ip);
      res.redirect(302, url);
    } catch (e) {
      await log('error', 'handler', e.message);
      res.status(e.status || 500).json({ error: e.message });
    }
  });

  app.use('/shorturls', shortUrlsRouter(hostname, port));
  return app;
}
