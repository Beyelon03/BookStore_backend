import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import express from 'express';
import appRoutes from './routes/app.routes';
import handleError from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const app = express();

app.use(cors());
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', appRoutes);
app.use(handleError);

const startServer = async () => {
  try {
    if (!DB_URL) {
      throw Error('DB_URL не определен.');
    }

    await mongoose.connect(DB_URL);
    console.log('Подключено к MongoDB.');

    app.listen(PORT, () => {
      console.log(`Сервер запущен: http://localhost:${PORT}.`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Ошибка:', error.message);
    } else {
      console.log('Произошла непредвиденная ошибка');
      console.error(error);
    }
    process.exit(1);
  }
};

startServer();
