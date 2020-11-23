
import { Router } from 'express';
import userController from '../../controllers/user/controller';
import { validationHandler } from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import config from './validation';

const userRouter = Router();
userRouter.route('/');

userRouter.route('/me')
.get(authMiddleWare ('getUsers', 'all'), userController.get);

userRouter.route('/login')
.post( validationHandler ( config.login ) , userController.login );

export default userRouter;
