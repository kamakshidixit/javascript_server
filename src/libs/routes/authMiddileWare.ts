import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import { Response , NextFunction } from 'express';
import { hasPermission } from '../permissions';
import configuration from '../../config/configuration';
import { config } from 'dotenv/types';
console.log('Json Web tokens', jwt);

export default ( module: any , permissionType: string ) => ( req: IRequest, res: Response, next: NextFunction ) => {

  try {
  console.log( 'Inside ValidationHandler Middleware' );
  console.log( 'config is', module, permissionType );
  const token = req.headers.authorization;
  console.log('keyeyeye,,', configuration);
  console.log( token );
  const User = jwt.verify( token, configuration.SECRET );
  console.log( 'user', User );
  req.userData = User.result;
  console.log( User.result.role );
  const result = hasPermission ( module , User.result.role , permissionType );
  console.log( 'result is', result );
  if ( result === true )
      next();
  else {
      next ( {
          message: 'Unauthorised',
          status: 403
      } );
  }
  }
  catch ( err ) {
      next ( {
          message: err
      } );
  }
};
