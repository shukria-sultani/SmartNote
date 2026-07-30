import dotenv  from "dotenv"
dotenv.config();
export const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: "mysql"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: "mysql"
    }
}