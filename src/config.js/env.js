import dotenv from 'dotenv';

dotenv.config();


export const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  //secret: process.env.SECRET_KEY,
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

  email:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};