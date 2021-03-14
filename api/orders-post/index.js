const { getUser } = require('../shared/user-utils');
const addOrder = require('../shared/add-order');
const data = require('../shared/recommendations');

module.exports = async function (context, req) {

  // Get the user details from the request
  var user = getUser(req);
  if(user === null || user === undefined){
    context.res.status(401);
    return;
    // Switch during local tests
    //user = { userDetails: "John Doe" };
  }

  const eventId = req.body.eventId;
  if(eventId !== undefined && eventId.length > 0) {
    await data.rewardItem(eventId, 1);
  }

  const userDetails = user.userDetails;
  const iceCreamId = req.body.id;
  const fullAddress = '1 Microsoft Way, Redmond, WA 98052, USA';

  try{
    const id = await addOrder.addOrder(userDetails, iceCreamId, fullAddress);
    context.res.status(201).send(id);
  } catch (error) {
    if (err === 'not found') {      
      context.res.status(404).send(error);
    } else {
      context.res.status(500).send(error);
    }
  }

};
