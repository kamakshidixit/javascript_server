import { Router } from 'express';
import { traineeRouter } from './Controllers/trainee';

const mainRouter = Router();

mainRouter.use('/trainee', traineeRouter);

export default mainRouter;


