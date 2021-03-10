// @ts-check
const process = require("process");

const config = {
    authentication: {
        options: {
            userName: process.env.AZURE_SQL_USERNAME,
            password: process.env.AZURE_SQL_PASSWORD
        },
        type: "default"
    },
    server: process.env.AZURE_SQL_SERVER,
    options: {
        database: process.env.AZURE_SQL_DATABASE,
        encrypt: true
    }
}

module.exports = { config };