import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../permissions';
import IRequest from '../../IRequest';
import configuration from '../../config/configuration';
import {permissions}  from './constant'

export const authMiddleWare = ( module, permissionType ) => (req: IRequest, res: Response, next: NextFunction ) => {
try {

    
    const token = req.headers.authorization;
    const decodedUser =  jwt.verify(token, configuration.SECRET);
    req.userData = decodedUser;
    const irole = decodedUser.role;

    console.log( 'the config is ' , module, permissionType );
    console.log( 'Decoded Token User', decodedUser );
    console.log('Role is ', irole);

    if ( irole ) {
        if ( hasPermission( permissions[module], irole, permissionType )) {
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
