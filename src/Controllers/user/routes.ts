import { Router } from 'express';
import UserController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import { permissions} from '../../libs/routes/constant';
import config from './validation';

const UserRouter = Router();

UserRouter.route('/')
.get(UserController.get)
.post(UserController.create)
.put(UserController.update)
.delete(UserController.delete);

UserRouter.route('/me')
.post(authMiddleWare ( permissions.getUsers, 'all' ), UserController.me);

UserRouter.route('/login')
.post( validationHandler ( config.login) , UserController.login );


export default UserRouter;
