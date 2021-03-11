const config = require('../shared/dbconfig');
const { Connection, Request } = require("tedious");

const getCatalog = () => new Promise((resolve, reject) => {
  
  var catalog = [];

  const request = new Request('SELECT * FROM [dbo].[Icecreams];', (err, rowCount) => {
    if (err) {
      console.log("sql err");
      console.error(err.message);
      reject(err);
    }
    resolve(catalog);
  });

  request.on("row", columns => {
    var row = {};
    columns.forEach(column => {
      row[column.metadata.colName] = column.value;
    });
    catalog.push(row);
  });

  const connection = new Connection(config.config);
  connection.on('connect', err => {
    if (err) {
      console.log("connect err");
      console.error(err.message);
      reject(err);
    }
    connection.execSql(request);
  });

  connection.connect();
});

module.exports = { getCatalog };