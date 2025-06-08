const express = require('express');
const { body, query, param, validationResult } = require('express-validator');

const router = express.Router();

let db;
function setDb(database) {
    db = database;
}


// ### Personalized API for displaying detailed data ###
router.get('/', [
    query('clientId').exists().isInt(),
    query('results').optional().isInt({ min: 1, max: 1000 }).toInt(),
    query('from').optional().isDate({ format: 'YYYY-MM-DD' }),
    query('to').optional().isDate({ format: 'YYYY-MM-DD' })
],async (req, res) => {// for now it's usin client name and id
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('Get Personal starting');

        const clientId = req.query.clientId // clientId required to use api
       
        const results = req.query.results || 250; // results is number of results in api
        const from = req.query.from; // Format YYYY-MM-DD
        const to = req.query.to; // Format YYYY-MM-DD

        let where = [];
        let params = [clientId];

        where.push('Clients.clientId = ?'); // clientId is required for this api

        if (from) {
        where.push('Events.eventDate >= ?');
        params.push(from);
        }
        if (to) {
        where.push('Events.eventDate <= ?');
        params.push(to);
        }

        const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const query = `
        SELECT Events.eventId, Events.eventName, Events.eventDescription,
            Events.eventDate, Events.startTime, Events.EndTime, Events.eventLocation,
            Services.serviceName, Coaches.coachName, Clients.clientName, Clients.clientId
        FROM Events
        INNER JOIN Clients On Events.clientId = Clients.clientId
        INNER JOIN Services ON Events.serviceId = Services.serviceId
        INNER JOIN Coaches ON Events.coachId = Coaches.coachId
        ${whereClause}
        LIMIT ?`;

        params.push(results);

        const rows = await db.all(query, params);
        res.json(rows);
        } catch (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
    }
});

module.exports = { router, setDb };