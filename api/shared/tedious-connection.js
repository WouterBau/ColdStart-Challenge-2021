const config = require('../shared/dbconfig');
const { Connection } = require("tedious");

function getConnection() {
    const connection = new Connection(config.config);
    return connection;
};

module.exports = { getConnection };