export const sessionOptions = {
  cookieName: "local-example-app",
  password: "wpwQZktHxFMZN3V4hbDbux1WYjPKr9M6",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.SESSION_SECURE === "active",
    ttl: 20,
  },
};
