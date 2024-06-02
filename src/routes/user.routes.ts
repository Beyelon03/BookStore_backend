import { Router, Request, Response } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/registration', userController.registration)


export default router;
