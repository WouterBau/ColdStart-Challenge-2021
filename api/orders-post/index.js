const { getUser } = require('../shared/user-utils');
const addOrder = require('../shared/add-order');

module.exports = function (context, req) {

  // Get the user details from the request
  var user = getUser(req);
  if(user === null || user === undefined){
    context.res.status = 401;
    context.done();
    return;
    // Switch during local tests
    //user = { userDetails: "John Doe" };
  }

  const userDetails = user.userDetails;
  const iceCreamId = req.body.id;
  const fullAddress = '1 Microsoft Way, Redmond, WA 98052, USA';

  addOrder.addOrder(userDetails, iceCreamId, fullAddress)
  .then(id => {
    context.res.body = id;
    context.res.status = 201;
    context.done();
  })
  .catch(err => {
    context.log.error(err);
    if(err === 'not found') {
      context.res.status = 404;
    } else {
      context.res.status = 500;
    }
    context.done();
  });

};
