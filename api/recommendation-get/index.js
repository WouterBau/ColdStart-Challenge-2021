const data = require('../shared/recommendations');
const { getUser } = require('../shared/user-utils');
const platform = require('platform');

module.exports = async function (context, req) {
    const eventId = req.query.eventid;
    if(eventId !== undefined) {
        await data.rewardItem(eventId, 0);
    }

    const platforminfo = platform.parse(req.headers['user-agent']);
    const user = getUser(req);
    const userLoggedIn = user === null || user === undefined;

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const timeOfDay =
        currentHour >= 6 && currentHour < 12 ? 'morning':
        currentHour >= 12 && currentHour <= 17 ? 'afternoon' :
        currentHour > 17  ? 'evening' : 'night';

    try {
        const contextFeatures = [
            {dayOfWeek: currentDate.getDay()},
            {timeOfDay: timeOfDay},
            {userLoggedIn: userLoggedIn},
            {browser: platforminfo.name}
        ];
        const recommendations = await data.rankItem(contextFeatures);
        context.res.status(200).send(recommendations);
    } catch (error) {
        context.res.status(500).send(error);
    }
};