// @ts-check
const process = require("process");

const config = {
    azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTION_STRING,
    azure_storage_queue_preorder: process.env.AZURE_STORAGE_QUEUE_PREORDER
};

const dbConfig = {
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
};

const personalizerConfig = {
    serviceKey: process.env.AZURE_PERSONALIZER_SERVICEKEY,
    endpoint: process.env.AZURE_PERSONALIZER_ENDPOINT
};

module.exports = { config, dbConfig, personalizerConfig };