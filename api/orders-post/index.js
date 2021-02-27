const { getUser } = require('../shared/user-utils');
const config = require('../shared/config');
const { QueueClient } = require("@azure/storage-queue");
const uuidv1 = require("uuid/v1");
const data = require('../shared/catalog-data');

module.exports = async function (context, req) {

  // Get the user details from the request
  var user = getUser(req);
  if(user === null || user === undefined){
    context.res.status(401);
    return;
    // Switch during local tests
    //user = { userDetails: "John Doe" };
  }
  const userDetails = user.userDetails;

  // Get the pre-order from the request
  const iceCreamId = req.body.id;
  if(iceCreamId === null || iceCreamId === undefined) {
    context.res.status(404);
    return;
  }

  //Check if received ID exists
  var found = false;
  const items = await data.getCatalog();
  for (var i = 0; i < items.length; i++) {
    if (items[i].Id == iceCreamId) {
      found = true;
      break;
    }
  }
  if (!found) {
    context.res.status(404);
    return;
  }

  // Create JSON message
  const preOrderMessage = {
    Id: uuidv1(),
    User: userDetails,
    Date: (new Date()).toISOString(),
    IceCreamId: iceCreamId,
    Status: 'New',
    DriverId: null,
    FullAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
    LastPosition: null
  };
  const preOderMessageString = JSON.stringify(preOrderMessage);

  // add the pre-order JSON document in a queue
  const queueClient = new QueueClient(config.config.azure_storage_connectionstring, config.config.azure_storage_queue_preorder);
  await queueClient.createIfNotExists();
  const queueResponse = await queueClient.sendMessage(preOderMessageString);
  
  // Send response with creation ID
  context.res.status(201).send(queueResponse.messageId);
};
