// @ts-check
const process = require("process");

const config = {
    azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTION_STRING,
    azure_storage_queue_preorder: process.env.AZURE_STORAGE_QUEUE_PREORDER
};

module.exports = { config };