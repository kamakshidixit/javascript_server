
import { Router } from 'express';
import userController from '../../controllers/user/controller';
import { validationHandler } from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import config from './validation';

const userRouter = Router();
userRouter.get('/get', authMiddleWare('getUsers', 'read'), validationHandler(validation.get),
    userController.get);

userRouter.post('/create', authMiddleWare('getUsers', 'read'), validationHandler(validation.create),
    userController.create);
userRouter.put('/update', authMiddleWare('getUsers', 'read'), validationHandler(validation.update),
    userController.update);
userRouter.delete('/:id', authMiddleWare('getUser1', 'Delete'), validationHandler(validation.Delete),
    userController.delete);
userRouter.post('/login', validationHandler(validation.login), userController.login);
userRouter.get('/me', authMiddleWare('getUsers', 'read'), userController.me);


export default userRouter;
