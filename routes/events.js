const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const eventController = require('../controllers/eventController');
const EventModel = require('../models/Event.js');

const router = express.Router();

// ### Database connection setup ###
// This will be set by the server.js file
let db;
function setDb(database) {
    db = database;
    eventModel = new EventModel(db);
}
let eventModel;

// ### Passive API for default render ###
// Event to be displayed does have to not have empty:
// eventId, eventName, eventDate, startTime, EndTime, coachId
router.get('/', [               //results= number of results in api
    query('results').optional().isInt({ min: 1, max: 1000 }).toInt(),
    query('from').optional().isDate({ format: 'YYYY-MM-DD' }),
    query('to').optional().isDate({ format: 'YYYY-MM-DD' })
], async (req, res) => {
    // send query parameters to controller
    eventController.getEvent(req, res, eventModel);
});


// ----------- Post API for adding events -----------
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
], async (req, res) => {// adding event

    // send query parameters to controller
    eventController.createEvent(req, res, eventModel);
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
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await eventModel.createEventTest(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to execute query' });
    }
});

module.exports = { router, setDb };