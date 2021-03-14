const data = require('../shared/catalog-data');

module.exports = async function (context, req) {
  try{
    const catalog = await data.getCatalog();
    context.res.status(200).send(catalog);
  } catch (error) {
    context.res.status(500).send(error);
  }
};