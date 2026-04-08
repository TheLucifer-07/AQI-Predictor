/* global require, process, module */
'use strict';

const cors = require('cors');

function buildCors() {
  const rawOrigins = process.env.ALLOWED_ORIGINS || '';

  const ALLOWED = [
    // Always allow these — production URLs
    'https://aqi-predictor-07.vercel.app',
    'https://aqi-predictor-r892.onrender.com',
    // Local dev
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    // Any extra origins from .env / Render env vars
    ...rawOrigins.split(',').map(o => o.trim()).filter(Boolean),
  ];

  // Deduplicate
  const UNIQUE = [...new Set(ALLOWED)];

  const middleware = cors({
    origin(origin, cb) {
      // Allow no-origin requests (curl, Postman, server-to-server)
      if (!origin) return cb(null, true);
      if (UNIQUE.includes(origin)) return cb(null, true);
      const err = new Error(`CORS: origin '${origin}' is not allowed.`);
      err.status = 403;
      return cb(err);
    },
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  });

  return { corsMiddleware: middleware, ALLOWED: UNIQUE };
}

module.exports = buildCors();
