"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
function validateUsers(users) {
    const vuser = [];
    const iuser = [];
    let icount = 0;
    let vcount = 0;
    users.forEach(({ traineeEmail, reviewerEmail }) => {
        if (helper_1.default(traineeEmail) && helper_1.default(reviewerEmail)) {
            icount += 1;
            vuser.push({ traineeEmail, reviewerEmail });
            return icount;
        }
        else {
            vcount += 1;
            iuser.push({ traineeEmail, reviewerEmail });
            return vcount;
        }
    });
    console.log('Number of valid users', icount);
    console.log('Number of Invalid users', vcount);
    console.log();
    console.log('valid users', vuser);
    console.log('Invalid users', iuser);
    console.log();
}
exports.default = validateUsers;
// validateUsers(users);
//# sourceMappingURL=validation.js.map