import { creatediamond , createequilatral } from './pattern';
import { hasPermission, validateUsers } from './utils';
import { permissions , users } from './constant';
creatediamond(4);
createequilatral(4);
hasPermission(permissions.getUsers, 'tainer', 'all');
validateUsers(users);

