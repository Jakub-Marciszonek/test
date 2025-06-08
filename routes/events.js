const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const EventModel  = require('../models/Event.js');

const router = express.Router();

let db;
let eventModel;

function setDb(database) {
    db = database;
    eventModel = new EventModel(db);
}

// ### Passive API for default render ###
// Event to be displayed does have to not have empty:
// eventId, eventName, eventDate, startTime, EndTime, coachId
router.get('/', [               //results= number of results in api
    query('results').optional().isInt({ min: 1, max: 1000 }).toInt(),
    query('from').optional().isDate({ format: 'YYYY-MM-DD' }),
    query('to').optional().isDate({ format: 'YYYY-MM-DD' })
], async (req, res) => {
    if (!db) {
        return res.satatus(503).json({ error: 'Database not initialized' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        console.log('Get events starting');
        
        const rows = await eventModel.getEvents(req.query);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Server error');
    }
});

router.post('/post', [
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
        const currentDateTime = new Date();
        // Validate that eventDate is not in the past and has at least a two-hour notice
        const { eventDate, startTime } = req.body;
        const eventStartDateTime = new Date(`${eventDate}T${startTime}`); // combines eventDate and StartTime for datetime format
        const NoticeDateTime = new Date(currentDateTime.getTime() + 2 * 60* 60 * 1000);
        //                                                         h^  m^  s^  ms^
        if (eventStartDateTime <= NoticeDateTime) {
            return res.status(400).json({error: 'Events must start in the future, with at least a two-hour notice'});
        }

        const result = await eventModel.createEvent(req.body);
        res.status(201).json(result);

    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({error: 'Failed to execute query'});
    }
});

// ----------- simplify post api for testing -----------
router.post('/test', [
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

module.exports = { router, setDb };