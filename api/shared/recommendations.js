
const config = require('../shared/config');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

function getActionList() {

}

function createPersonalizerClient() {
    const credentials = new CognitiveServicesCredentials(config.personalizerConfig.serviceKey);
    const personalizerConfig = new Personalizer.PersonalizerClient(credentials, config.personalizerConfig.endpoint);
    return personalizerConfig;
}