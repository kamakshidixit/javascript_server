"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsers = exports.hasPermission = void 0;
const permissions_1 = require("./permissions");
Object.defineProperty(exports, "hasPermission", { enumerable: true, get: function () { return permissions_1.hasPermission; } });
const validation_1 = require("./validation");
exports.validateUsers = validation_1.default;
//# sourceMappingURL=index.js.map