import { permissions } from '../constant';

export function hasPermission(moduleName: string, role: string, permissionType: string): boolean {
  const {all, read, write, Delete= {}} = moduleName;

  let f = all.includes(role);

  if (f === true) {
      return true;
  }
  else {
      if (permissionType === read ) {
          f = read.includes(role);
          return f;
      } else if (permissionType === write) {
          f = write.includes(role);
          return f;
      } else if (permissionType === Delete) {
          f = Delete.includes(role);
          return f;
      }
  }

}








