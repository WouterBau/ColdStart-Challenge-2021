//const fs = require('fs').promises;
const config = require('../shared/dbconfig');
const { Connection, Request } = require("tedious");

var catalog = { icecreams : [] };

const executeSql = () => new Promise((resolve, reject) => {
  const request = new Request('SELECT * FROM [dbo].[Icecreams];', (err, rowCount, rows) => {
    if (err) {
      console.log("sql err");
      console.error(err.message);
      reject(err);
    }
    console.log(`${rowCount} row(s) returned`);
    resolve();
  });
  request.on("row", columns => {
    var row = {};
    columns.forEach(column => {
      row[column.metadata.colName] = column.value;
    });
    catalog.icecreams.push(row);
    console.log(catalog);
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

function getCatalog() {
  var catalog = { icecreams : [] };
  
  executeSql()
  .then()
  .catch(err => {throw err;});

  console.log(catalog);
  return catalog;

  /*console.log('using static data.');
  var stringData = await fs.readFile('./shared/catalog.json', 'utf8');
  const data = JSON.parse(stringData);  
  return data.icecreams;*/
}

module.exports = { getCatalog };