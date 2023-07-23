import { config } from 'dotenv';
config();

const AMBIENT = process.env.AMBIENT;
const VERSION = process.env.VERSION;
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const KEYCHAR = process.env.KEYCHAR;
const JWT_EXPIRES_USER_DASHBOARD = process.env.JWT_EXPIRES_USER_DASHBOARD;

const JWT_EXPIRES_USER_LABELER = process.env.JWT_EXPIRES_USER_LABELER;

const JWT_EXPIRES_USER_PROFESSIONAL = process.env.JWT_EXPIRES_USER_PROFESSIONAL;

const BEARER_SECRET = process.env.BEARER_SECRET;

const JWT_SECRET = process.env.JWT_SECRET;

const API_URL = process.env.API_URL;

const API_SECURITY_URL = process.env.API_SECURITY_URL;

export {
  VERSION,
  AMBIENT,
  PORT,
  BEARER_SECRET,
  API_URL,
  API_KEY,
  KEYCHAR,
  JWT_SECRET,
  JWT_EXPIRES_USER_DASHBOARD,
  JWT_EXPIRES_USER_LABELER,
  JWT_EXPIRES_USER_PROFESSIONAL,
  API_SECURITY_URL,
};
