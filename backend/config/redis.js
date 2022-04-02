import Redis from 'ioredis';

const LOCAL_CONFIG = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: 0,
};

const getClient = () => {
  return new Redis(LOCAL_CONFIG);
};
