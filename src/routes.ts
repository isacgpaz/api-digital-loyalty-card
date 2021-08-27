import { Router } from 'express';
import UserController from './controllers/UserController';
import AdminController from './controllers/AdminController';
import authMiddleware from './middleware/auth';

const basicRouter = Router();
const userRouter = Router();
const adminRouter = Router();

/* 
  * User (client) routes
*/

userRouter.post('/', UserController.createUser);
userRouter.get('/:userId', UserController.getUser);

userRouter.get('/', authMiddleware, UserController.getAllUsers);
userRouter.put('/:userId', authMiddleware, UserController.updateUser);
userRouter.delete('/:userId', authMiddleware, UserController.removeUser);

/*
  * Admin router
*/

adminRouter.post('/auth', AdminController.auth);

adminRouter.post('/', AdminController.createAdmin);
adminRouter.get('/', authMiddleware, AdminController.getAllAdmins);
adminRouter.get('/:adminId', authMiddleware, AdminController.getAdmin);
adminRouter.put('/:adminId', authMiddleware, AdminController.updateAdmin);
adminRouter.delete('/:adminId', authMiddleware, AdminController.removeAdmin);

export { basicRouter, userRouter, adminRouter }