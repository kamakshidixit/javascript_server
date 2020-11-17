import { Router } from 'express';
import UserController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import { permissions } from '../../libs/routes/constant';
import config from './validation';

const UserRouter = Router();

UserRouter.route('/')
// .get(UserController.get)
.post(authMiddleWare ( permissions.getUsers, 'read' ), UserController.create )
.put(authMiddleWare ( permissions.getUsers, 'read' ), UserController.update );
// .delete(UserController.delete);

UserRouter.route('/:id').delete( authMiddleWare ( permissions.getUsers, 'read' ), UserController.remove );

UserRouter.route('/me')
.get(authMiddleWare ( 'getUsers', 'all' ), UserController.me);

UserRouter.route('/login')
.post( validationHandler ( config.login) , UserController.login );


export default UserRouter;
