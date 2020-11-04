import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../permissions';
console.log('Json Web tokens', jwt);

export default (module, permissionType) => (req, res, next) => {
  console.log('The Config is', module, permissionType);

  console.log('Header is', req.headers['authorization']);
try {
  const tokens = req.headers['authorization'];
  const decodedUser = jwt.verify(tokens, 'qwertyuiopasdfghjklzxcvbnm123456');
  console.log('User: ', decodedUser);
  console.log('Role',decodedUser.role);
  if(hasPermission(module,decodedUser.role,permissionType)){
  next();
}else{
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

};
