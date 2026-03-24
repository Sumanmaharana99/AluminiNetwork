import dotenv from 'dotenv';
dotenv.config();

export const ENV={
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
     JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    CLIENT_URL:process.env.CLIENT_URL,
}