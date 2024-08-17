import { Sequelize } from 'sequelize';
import { getVariable } from '../../../../config';

export class ConnectionDB {

    static getConnection() {
        const host = getVariable('HOST')
        const username = getVariable('USERNAME')
        const password = getVariable('PASSWORD')
        const schema = getVariable('SCHEMA_CORE')
        return new Sequelize(schema, username, password, {
            host: host,
            dialect: 'mysql',
        });
    }
}


export default ConnectionDB;