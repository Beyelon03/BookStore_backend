import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import handleError from './middlewares/error.middleware';
import AppRoutes from './routes/app.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class Server {
  private app: express.Application;
  private port: string | number;
  private dbUrl: string | undefined;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.dbUrl = DB_URL;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(fileUpload({}));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private initializeRoutes() {
    this.app.use('/api', AppRoutes);
  }

  private initializeErrorHandling() {
    this.app.use(handleError);
  }

  private async connectToDatabase() {
    if (!this.dbUrl) {
      throw new Error('DB_URL не определен.');
    }

    await mongoose.connect(this.dbUrl);
    console.log('Подключено к MongoDB.');
  }

  public async start() {
    try {
      await this.connectToDatabase();
      this.app.listen(this.port, () => {
        console.log(`Сервер запущен: http://localhost:${this.port}.`);
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
  }
}

const server = new Server();
server.start();
