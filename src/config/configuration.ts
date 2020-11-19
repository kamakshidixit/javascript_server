import { IConfig } from './IConfig';
// tslint:disable-next-line: no-var-requires
const envVars = require ('dotenv').config();
//console.log('Inside config', envVars);
//const config = envVars.parsed;
const config: IConfig = { port: envVars.parsed.PORT , nodeEnv: envVars.parsed.NODE_ENV, mongoUrl: envVars.parsed.MONGO_URL,  key: envVars.parsed.KEY, password: envVars.parsed.PASSWORD};
Object.freeze(config);
// config.PORT=7000;
export default config;
