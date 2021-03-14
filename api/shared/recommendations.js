const uuidv1 = require('uuid/v1');
const config = require('../shared/config');
const data = require('../shared/catalog-data');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

async function rankItem(catalog, contextFeatures) {
    const actions = getActionList(catalog);
    const eventId = uuidv1();
    const rankRequest = {
        eventId: eventId,
        contextFeatures: contextFeatures,
        actions: actions,
        deferActivation: false
    };
    const client = createPersonalizerClient();
    const rankResponse = await client.rank(rankRequest);
    var topItems = catalog.filter(x => x.id === rankResponse.rewardActionId);
    topItems.forEach(element => {
        element.eventId = eventId
    });
}

async function rankItem(contextFeatures) {
    const catalog = await data.getCatalog();
    return await rankItem(catalog, contextFeatures);
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
            id: element.id,
            features: [
                {
                    name: element.name
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