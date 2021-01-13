export default () => ({
  environment: process.env.NODE_ENV || 'production',
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_KEY,
    expiresIn: process.env.JWT_EXPIRESIN,
    algorithm: process.env.JWT_ALGORITHM,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  global: {
    port: process.env.GLOBAL_PORT,
    numberRequestPerSlot: process.env.GLOBAL_NUMBER_REQUEST_PER_SLOT,
    slotTime: process.env.GLOBAL_SLOT_TIME,
    timeout: process.env.GLOBAL_TIMEOUT,
    temp: process.env.GLOBAL_TEMP_DEST,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  },
});
