//https://github.com/tediousjs/tedious/blob/master/examples/prepared.js
const connect = require('../shared/tedious-connection');
const { Request, TYPES } = require("tedious");

const addOrder = (user, icecreamId, fullAddress) => new Promise((resolve, reject) => {
  
  //Insert SQL and Request
  var insertedId = null;
  const insertOrderSql = 'INSERT INTO [dbo].[Orders] ([User], IcecreamId, FullAddress) OUTPUT Inserted.Id VALUES (@user, @icecreamId, @fullAddress)';
  const insertOrderRequest = new Request(insertOrderSql, (err) => {
    if (err) {
        console.log("insert sql err");
        console.error(err.message);
        reject(err);
    }
    resolve(insertedId);
  });
  insertOrderRequest.addParameter('user', TYPES.NVarChar, user);
  insertOrderRequest.addParameter('icecreamId', TYPES.Int, icecreamId);
  insertOrderRequest.addParameter('fullAddress', TYPES.NVarChar, fullAddress);
  insertOrderRequest.on("row", columns => {
      columns.forEach(column => {
        insertedId = column.value;
      });    
  });

  //Check ice cream exists SQL and Request
  var hasIceCream = false;
  const checkExistsSql = 'SELECT * FROM [dbo].[Icecreams] WHERE Id = @icecreamId';  
  const checkExistsRequest = new Request(checkExistsSql, (err) => {
    if (err) {
      console.log("select sql err");
      console.error(err.message);
      reject(err);
    }
    if(hasIceCream){
        connection.execSql(insertOrderRequest);
    } else {
        reject('not found');
    }
  });
  checkExistsRequest.addParameter('icecreamId', TYPES.Int, icecreamId);
  checkExistsRequest.on("row", () => {
    hasIceCream = true;
  });

  //Create connection and start chain of request execution
  const connection = connect.getConnection();
  connection.on('connect', err => {
    if (err) {
      console.log("connect err");
      console.error(err.message);
      reject(err);
    }
    
    connection.execSql(checkExistsRequest);
  });
  connection.connect();
  
});

module.exports = { addOrder };