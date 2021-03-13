const config = require('../shared/config');
const { Connection } = require("tedious");

function getConnection() {
    const connection = new Connection(config.dbConfig);
    return connection;
};

module.exports = { getConnection };