import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../permissions';
console.log('Json Web tokens', jwt);

export default (module, permissionType) => (req, res, next) => {
  console.log('The Config is', module, permissionType);

  console.log('Header is', req.headers['authorization']);
  try {
    console.log( 'config is', module, permissionType );
    const token = req.headers.authorization;
    //console.log( token );
    const User = jwt.verify( token, 'qwertyuiopasdfghjklzxcvbnm123456' );
    console.log( 'user', User.result );
    req.userData = User.result;
    console.log( User.result.role );
    const result = hasPermission( module , User.result.role , permissionType );
    console.log( 'result is', result );
    if ( result === true )
        next();
else{
  next({
    error:403,
    message: "Unauthorization"
  })
}

}
catch (err) {
 next({
   error: 'Unauthorization',
   code: 403
 });
}
}
