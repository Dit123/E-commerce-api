import jwt from 'jsonwebtoken';
import { config } from '../config.js/env.js';


export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.refreshTokenSecret, { expiresIn: '7d' });
};
