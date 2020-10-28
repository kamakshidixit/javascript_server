"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("./pattern");
const utils_1 = require("./utils");
const constant_1 = require("./constant");
pattern_1.creatediamond(4);
pattern_1.createequilatral(4);
utils_1.hasPermission(constant_1.permissions.getUsers, 'tainer', 'all');
utils_1.validateUsers(constant_1.users);
//# sourceMappingURL=index.js.map