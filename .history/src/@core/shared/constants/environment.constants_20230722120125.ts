import { config } from 'dotenv';
config();

const AMBIENT = process.env.AMBIENT;
const VERSION = process.env.VERSION;
const PORT = process.env.PORT;
const CDN = process.env.CDN;
const BEARER_SECRET = process.env.BEARER_SECRET;

export { VERSION, AMBIENT, PORT, CDN, BEARER_SECRET };
