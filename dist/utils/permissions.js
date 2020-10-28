"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = void 0;
function hasPermission(moduleName, role, permissionType) {
    const { all, read, write, Delete = {} } = moduleName;
    let f = all.includes(role);
    if (f === true) {
        return true;
    }
    else {
        if (permissionType === read) {
            f = read.includes(role);
            return f;
        }
        else if (permissionType === write) {
            f = write.includes(role);
            return f;
        }
        else if (permissionType === Delete) {
            f = Delete.includes(role);
            return f;
        }
    }
}
exports.hasPermission = hasPermission;
//# sourceMappingURL=permissions.js.map