import express from 'express';
import { createShortUrl, getStats } from '../services/shortener.js';
import { log } from '../logger/log.js';

export function shortUrlsRouter(hostname, port) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const result = await createShortUrl(req.body, hostname, port);
      res.status(201).json(result);
    } catch (e) {
      await log('error', 'handler', e.message);
      res.status(e.status || 500).json({ error: e.message });
    }
  });

  router.get('/:shortcode', async (req, res) => {
    try {
      const result = await getStats(req.params.shortcode, hostname, port);
      res.status(200).json(result);
    } catch (e) {
      await log('error', 'handler', e.message);
      res.status(e.status || 500).json({ error: e.message });
    }
  });

  return router;
}
