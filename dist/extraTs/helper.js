"use strict";
// import validation from './validation'
Object.defineProperty(exports, "__esModule", { value: true });
function validateEmail(email) {
    var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var domain = email.split('@')[1];
    return reg.test(email) && (domain == 'successive.tech');
}
exports.default = validateEmail;
//# sourceMappingURL=helper.js.map