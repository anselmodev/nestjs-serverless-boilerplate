import { config } from 'dotenv';
config();

const AMBIENT = process.env.AMBIENT;
const VERSION = process.env.VERSION;
const PORT = process.env.PORT;

export { VERSION, AMBIENT, PORT };
