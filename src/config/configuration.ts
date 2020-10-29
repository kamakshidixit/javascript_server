import { IConfig } from './IConfig';
// import * as dotenv from 'dotenv';
// console.log(dotenv);


// tslint:disable-next-line: no-var-requires
const envVars = require ('dotenv').config();
console.log('Inside config', envVars);
const config = envVars.parsed;
Object.freeze(config);
// config.PORT=7000;
export default config;
