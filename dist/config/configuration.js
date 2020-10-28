"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as dotenv from 'dotenv';
// console.log(dotenv);
// tslint:disable-next-line: no-var-requires
const envVars = require('dotenv').config();
console.log('Inside config', envVars);
const config = envVars.parsed;
Object.freeze(config);
// config.PORT=7000;
exports.default = config;
//# sourceMappingURL=configuration.js.map