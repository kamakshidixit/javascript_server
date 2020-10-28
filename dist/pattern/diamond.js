"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function creatediamond(n) {
    // using for white space
    let s = '';
    // using for rows
    let j = n;
    for (let i = 1; i <= n; i++) {
        s = ' '.repeat(j);
        console.log(s, '* '.repeat(i));
        s = '';
        j--;
    }
    for (let i = n; i >= 1; i--) {
        s = ''.repeat(j);
        console.log(s, ' *'.repeat(i));
        s = '';
        j++;
    }
}
exports.default = creatediamond;
//# sourceMappingURL=diamond.js.map