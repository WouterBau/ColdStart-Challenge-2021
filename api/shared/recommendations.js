const { v4: uuidv4 } = require('uuid');
const config = require('../shared/config');
const data = require('../shared/catalog-data');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

async function rankItemWithCatalog(catalog, contextFeatures) {
    const actions = getActionList(catalog);
    const eventId = uuidv4();
    const rankRequest = {
        eventId: eventId,
        contextFeatures: contextFeatures,
        actions: actions,
        deferActivation: null
    };
    
    const client = createPersonalizerClient();
    const rankResponse = await client.rank(rankRequest);
    
    var topItems = catalog.filter(x => x.Id == rankResponse.rewardActionId);
    topItems.forEach(element => {
        element.eventId = eventId
    });
    return topItems;
}

async function rankItem(contextFeatures) {
    const catalog = await data.getCatalog();
    return await rankItemWithCatalog(catalog, contextFeatures);
}

async function rewardItem(eventId, rewardValue) {
    const rewardRequest = {
        value: rewardValue
    };
    const client = createPersonalizerClient();
    await client.events.reward(eventId, rewardRequest);
}

function getActionList(catalog) {
    var actions = [];
    catalog.forEach(element => {
        actions.push({
            id: `${element.Id}`,
            features: [
                {
                    name: element.Name
                }
            ]
        })
    });
    return actions;
}

function createPersonalizerClient() {
    const credentials = new CognitiveServicesCredentials(config.personalizerConfig.serviceKey);
    const personalizerConfig = new Personalizer.PersonalizerClient(credentials, config.personalizerConfig.endpoint);
    return personalizerConfig;
}

module.exports = { rankItem, rewardItem };