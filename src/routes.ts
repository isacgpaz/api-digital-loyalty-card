import { Router } from 'express';
import UserController from './controllers/UserController';

const basicRouter = Router();
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.removeUser);

export { basicRouter, userRouter }