"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.users = void 0;
exports.users = [
    {
        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech'
    },
    {
        traineeEmail: 'mnr@gmail.com',
        reviewerEmail: 'mnfre@gmail.com'
    },
    {
        traineeEmail: 'trainee2@successive.tech',
        reviewerEmail: 'reviewer2@successive.tech'
    },
    {
        traineeEmail: 'trainee3@successive.tech',
        reviewerEmail: 'reviewer3@successive.tech'
    }
];
exports.permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    },
    'getAccess': {
        all: ['trainer'],
        read: ['trainee', 'head-trainer'],
        write: ['trainer'],
        delete: ['head-trainer']
    }
};
//# sourceMappingURL=constant.js.map