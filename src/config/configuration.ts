import { config } from 'dotenv';
config();
import { IConfig } from './IConfig';
const envVars: NodeJS.ProcessEnv = process.env;
const configuration: IConfig = Object.freeze({
    NODE_ENV: process.env.NODE_ENV ,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
    PASSWORD: process.env.PASSWORD
});
console.log('config is', configuration);
export default configuration;
