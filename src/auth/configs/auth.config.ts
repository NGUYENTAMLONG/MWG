export const JWT_CONFIG = {
  SECRET: process.env.TOKEN_SECRET,
  EXPIRED_IN: process.env.TOKEN_EXPIRED_IN,
  SALT_ROUNDS: 10,
};
