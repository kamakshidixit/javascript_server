import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import { Response , NextFunction } from 'express';
import { hasPermission } from '../permissions';
import configuration from '../../config/configuration';
import { config } from 'dotenv/types';
import UserRepository from '../../repositories/user/UserRepository';
console.log('Json Web tokens', jwt);

export default ( module: any , permissionType: string ) => async ( req: IRequest, res: Response, next: NextFunction ) => {
  const secretKey = configuration.SECRET;
  const head = 'authorization';

  const token = req.headers[head];
    let dbUser;
    if (!token) {
        return next({
            message: 'Token not found',
            error: 'Authentication failed',
            status: 403
        });
    }
    try {
        const userData = jwt.verify(token, secretKey);
        console.log('user: ', userData);
        dbUser =  await UserRepository.findOne({email: userData.email});
        if (!dbUser) {
            return next({
                error: 'Unauthorized',
                message: 'permission Denied',
                status: 403
            });
        }
        req.user = dbUser;
        if (!hasPermission(module, dbUser.role, permissionType)) {
            next({
                message: 'Permission denied',
                error: 'Unauthorized Access',
                status: 403
            });
        }
        next();
    } catch (err) {
        next({
            message: 'User is unauthorized',
            error: 'Unauthorized Access',
            status: 403
        });
    }

};
