import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import express from 'express';
import appRoutes from './routes/app.routes';

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(cors());
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', appRoutes);

const startServer = async () => {
  try {
    if (!DB_URL) {
      throw new Error('DB_URL не определен.');
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
    }
    process.exit(1);
  }
};

startServer();
