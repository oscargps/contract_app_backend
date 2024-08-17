import * as dotenv from 'dotenv';
import * as fs from 'fs';
import debug from 'debug';
let envConfig: { [key: string]: string } = {};

export const config = () => {
    if (['production', 'develop'].includes(process.env.NODE_ENV || '')) {
        try {
            envConfig = getEnvVariables();
        } catch (error) {
            return Promise.reject(error);
        }
    } else {
        envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
    return Promise.resolve(true);
};

const getVariable = (key: string): string => {
    try {
        if (!Object.keys(envConfig).length) {
            config();
        }
        return envConfig[key];
    } catch (err) {
        debug(`config error: ${err}`);
        throw new Error('failed to get variable');
    }
};

const getEnvVariables = () => {
    return Object.assign(process.env);
};

export { getVariable };