export const SERVER = process.env.NEXT_PUBLIC_SERVER as string;
export const IS_DEV = process.env.NODE_ENV === 'development';
export const LOG_LEVEL = parseInt(process.env.NEXT_PUBLIC_LOG_LEVEL as string, 10);
export const WS_ADDRESS = process.env.NEXT_PUBLIC_WS_ADDRESS as string;