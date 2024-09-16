import pkg from 'dotenv'
import {createPool} from 'mysql'

const dotenv = pkg
dotenv.config();

const connection = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPass,
    port: process.env.dbPort,
    database: process.env.dbName,
    multipleStatements: true
});

export default connection;