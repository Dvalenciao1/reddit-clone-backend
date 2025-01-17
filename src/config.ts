import { MIN } from 'class-validator';

// Desc: Configuration file for the server and database
process.loadEnvFile('.env.development.local');

//Variables from .env file
const {
  ACCESS_KEY,
  SECRET_KEY,
  MINIO_PORT,
  MINIO_HOST,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASS,
  DATABASE_NAME,
  PORT,
  HOST,
  PREFIX,
} = process.env;

//Server Config env variables
export const configEnv = { port: PORT, host: HOST, prefix: PREFIX };

//Database Config env variables
export const configEnvDB = {
  hostDB: DATABASE_HOST,
  portDB: DATABASE_PORT,
  usernameDB: DATABASE_USERNAME,
  passDB: DATABASE_PASS,
  nameDB: DATABASE_NAME,
};

export const configEnvMinio = {
  endPoint: MINIO_HOST,
  port: MINIO_PORT,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
};
