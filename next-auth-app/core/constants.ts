export const SECONDS_LEFT_EXPIRE_TOKEN = process.env.SECONDS_LEFT_EXPIRE_TOKEN
  ? parseInt(process.env.SECONDS_LEFT_EXPIRE_TOKEN)
  : 10;

export const SESSION_TTL_IN_SECONDS = process.env.SESSION_TTL_IN_SECONDS
  ? parseInt(process.env.SESSION_TTL_IN_SECONDS)
  : 20;
