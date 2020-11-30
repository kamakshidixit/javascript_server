import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../permissions';
import IRequest from '../../IRequest';
import configuration from '../../config/configuration';

export const authMiddleWare = ( module, permissionType ) => (req: IRequest, res: Response, next: NextFunction ) => {
    try {

    console.log( 'the config is ' , module, permissionType );
    console.log( 'Header is ' , req.headers.authorization);
    const token = req.headers.authorization;
    const decodedUser =  jwt.verify(token, configuration.SECRET);
    console.log( 'User', decodedUser );
    req.userData = decodedUser;
    const irole = decodedUser.role;
    console.log('Role is ', irole);
    if ( irole ) {
        if ( hasPermission( module, irole, permissionType )) {
            console.log('true');
            next();
        }
        else {
            next( { error: 'Permission does not exist' } );
        }
    }
    else {
        next( { error: 'Role does not exist in token' } );
        }
 }
 catch ( err ) {
     next( { error: 'authentication failed' } );
 }
};
