const data = require('../shared/catalog-data');

//https://devblogs.microsoft.com/azure-sql/promises-node-tedious-azure-sql-oh-my/
module.exports = function (context, req) {
  data.getCatalog()
  .then(catalog => {
    context.res.body = catalog;
    context.res.status = 200;
    context.done();
  })
  .catch(err => {
    context.log.error(err);
    context.res.status = 500;
    context.done();
  });
};
