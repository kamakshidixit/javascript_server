import { Router } from 'express';
import { traineeRouter } from './Controllers/trainee';
import { userRouter } from './Controllers/user';
const mainRouter = Router();
mainRouter.use('/trainee', traineeRouter);
mainRouter.use('/user', userRouter);
export default mainRouter;

