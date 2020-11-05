import { IConfig } from './IConfig';
const envVars = require ('dotenv').config();
console.log('Inside config', envVars);
const config = envVars.parsed;
Object.freeze(config);
// config.PORT=7000;
export default config;
