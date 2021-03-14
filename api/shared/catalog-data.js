const connect = require('../shared/tedious-connection');
const { Request } = require("tedious");

async function getCatalog() {
  return queryCatalog();
}

const queryCatalog = () => new Promise((resolve, reject) => {
  
  var catalog = [];

  const request = new Request('SELECT * FROM [dbo].[Icecreams];', (err) => {
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

  const connection = connect.getConnection();
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