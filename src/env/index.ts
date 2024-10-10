import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();
export const env = cleanEnv(process.env, {
	// SECRET: str(),
	BASE_URL: str(),
});
