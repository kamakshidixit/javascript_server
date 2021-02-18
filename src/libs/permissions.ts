export const permissions = {
  'getUsers': {
      all: ['head-trainer'],
      read : ['trainee', 'trainer'],
      write : ['trainer'],
      delete: [],
  }
};



export function hasPermission(moduleName: string, role: string, permissionType: string): boolean {

if (!moduleName.hasOwnProperty(permissionType)) {
    return false;
}
else if (moduleName[permissionType].includes(role) || (role === 'head-trainer') || (role === 'trainer')|| (role === 'trainee')) {
    return true;
}
else {
    return false;
}
}








