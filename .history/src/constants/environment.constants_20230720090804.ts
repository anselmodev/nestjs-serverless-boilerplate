import { config } from 'dotenv';
config();

const AMBIENT = process.env.AMBIENT;
const VERSION = process.env.VERSION;
const PORT = process.env.PORT;
const CDN = process.env.CDN;

export { VERSION, AMBIENT, PORT, CDN };
