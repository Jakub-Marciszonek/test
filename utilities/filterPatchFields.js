function filterUpdateFields(body, whitelist) {
    const updates = {};
    const blocked = [];
    for (const key of Object.keys(body)) {
        if (whitelist.includes(key)) {
            updates[key] = body[key];
        } else {
            blocked.push(key);
        }
    }
    return { updates, blocked };
}

const CLIENTPATCHWHITELIST = [
    'eventName',
    'eventDate',
    'startTime',
    'endTime',
    'coachId',
    'serviceId',
    'eventDescription',
    'attachments',
    'attendance',
    'eventLocation'
];

const COACHPATCHWHITELIST = [
    'eventName',
    'eventDate',
    'startTime',
    'endTime',
    'clientId',
    'serviceId',
    'eventDescription',
    'attachments',
    'attendance',
    'eventLocation'
]

module.exports = {
    filterUpdateFields,
    CLIENTPATCHWHITELIST,
    COACHPATCHWHITELIST
};
