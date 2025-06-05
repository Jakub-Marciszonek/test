require('dotenv').config();
const express = require('express');
const { Database } = require('sqlite-async');
console.log(Database);
const { body, query, param, validationResult } = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let db;

(async function() {
    db = await Database.open(process.env.DB_PATH);
    console.log('Connected to SQLite database');
})();

// ### Passive API for default render ###
// Event to be displayed does have to not have empty:
// eventId, eventName, eventDate, startTime, EndTime, coachId

app.get('/Default', [ //results= number of results in api
    query('results').optional().isInt({ min: 1, max: 1000 }).toInt(),
    query('from').optional().isDate({ format: 'YYYY-MM-DD' }),
    query('to').optional().isDate({ format: 'YYYY-MM-DD' })
], async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log('Get Default starting');
                                    // 30days*8h=240h
        const results = req.query.results || 250; // results is number of results in api
        const from = req.query.from;
        const to = req.query.to;
        
        let where = [];
        let params = [];

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
        SELECT Events.eventId, Events.eventName, 
                Events.eventDate, Events.startTime, Events.EndTime,
                Coaches.coachName
        FROM Events
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
// ### Personalized API for displaying detailed data ###
app.get('/personal', [
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

// ----------- simplify post api for testing -----------
app.post('/event/test', [
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('eventDate').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage(
        'Event date is required and must be in YYYY-MM-DD format'),
    body('startTime').notEmpty().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage(
        'Start time must be in HH:MM format'),
    body('endTime').notEmpty().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage(
        'Start time must be in HH:MM format'),
],async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {eventName, eventDate, startTime, endTime} = req.body;

        console.log(`Recieved: \n ${JSON.stringify(req.body)}`);
        
        const result = await db.run(
            `INSERT INTO Events (eventName, eventDate, startTime, endTime)
            VALUES (?, ?, ?, ?)`,
            [eventName, eventDate, startTime, endTime]
        );

        res.status(201).json({message: 'Event created', eventId: result.lastID});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({error: 'Failed to execute query'});
    }
});

app.post('/events/post', [
    body('clientId').notEmpty().isInt().withMessage(
        'Client ID is required and must be an integer'),
    body('coachId').notEmpty().isInt().withMessage(
        'Coach ID is required and must be an integer'),
    body('serviceId').notEmpty().isInt().withMessage(
        'Service ID is required and must be an integer'),
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('eventDate').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage(
        'Event date is required and must be in YYYY-MM-DD format'),
    body('startTime').notEmpty().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage(
        'Start time must be in HH:MM format'),
    body('endTime').notEmpty().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage(
        'End time must be in HH:MM format'),
    // optional fields    
    body('eventDescription').optional().isString(),
    body('attachments').optional().isArray(),
    body('eventLocation').optional().isString()
],async (req, res) => {// adding event
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
            eventDescription, attachments, eventLocation} = req.body;

        console.log(`Recieved: \n ${JSON.stringify(req.body)}`);

        const currentDateTime = new Date();
        // Validate that eventDate is not in the past and has at least a two-hour notice
        const eventStartDateTime = new Date(`${eventDate}T${startTime}`); // combines eventDate and StartTime for datetime format
        const NoticeDateTime = new Date(currentDateTime.getTime() + 2 * 60* 60 * 1000);
        //                                                         h^  m^  s^  ms^
        if (eventStartDateTime <= NoticeDateTime) {
            return res.status(400).json({error: 'Events must start in the future, with at least a two-hour notice'});
        }

        const result = await db.run(`INSERT INTO Events 
        (clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
        eventDescription, attachments, eventLocation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
        [clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
        eventDescription, attachments, eventLocation],
        );

        res.status(201).json({message: 'Event created', eventId: result.lastID});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({error: 'Failed to execute query'});
    }
});


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
