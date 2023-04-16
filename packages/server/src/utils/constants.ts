import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const CLOUD_PATH = path.resolve(__dirname, '../../../../cloud');

export const HOST = process.env.HOST as string;
export const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
export const SMTP_HOST = process.env.SMTP_HOST as string;
export const SMTP_PORT = parseInt(process.env.SMTP_PORT as string, 10);
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
export const REDIS_PASS = process.env.REDIS_PASS as string;
export const TRANSLATE_URL = process.env.TRANSLATE_URL as string;
export const APP_URL = process.env.APP_URL as string;
export const JSONWEBTOKEN_KEY = process.env.JSONWEBTOKEN_KEY as string;
export const PORT = parseInt(process.env.PORT as string, 10);
export const LOG_LEVEL = parseInt(process.env.LOG_LEVEL as string, 10);
export const IS_DEV = process.env.NODE_ENV === 'development';
export const FASTIFY_LOGGER = process.env.FASTIFY_LOGGER === 'true';

export const PASSWORD_SALT_LENGTH = 16;
export const PASWWORD_HASH_LENGTH = 64;
export const PASSWORD_ITERATIONS = 1000;
export const PASSWORD_ALGORITHM = 'sha512';
export const RESTORE_LINK_TIMEOUT_IN_HOURS = 48;
export const NULL_TIMEOUT = new Date(0, 0, 0, 0, 0, 0, 0);
