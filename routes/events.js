const express = require('express');
const eventController = require('../controllers/eventController.js');

const { createEventLimiter } = require('../middlewares/rateLimiters');
const { dateRangeValidation, limitValidation, idValidation }
= require('../middlewares/APIfiltersValidation.js');
const { createEventValidation } = require('../middlewares/eventValidation.js');
const validate = require('../middlewares/validate.js');

const EventModel = require('../models/event.js')

const { body } = require('express-validator');
// its used only by the test endpoint #temporary

const router = express.Router();

// ### Database connection setup ###
// This will be set by the server.js file
let db;
let eventModel;
function setDb(database) {
    db = database;
    eventModel = EventModel(db);// eventModel is set to be assignet as event models:
//                                  models/event.js
}

// ### Passive API for default render ###
// Event to be displayed does have to not have empty:
// eventId, eventName, eventDate, startTime, EndTime, coachId
router.get('/', [
    ...dateRangeValidation,
    ...limitValidation,
    validate
], async (req, res) => {
    await eventController.getEvent(req, res, eventModel);
});

router.get('/getall', [
    ...dateRangeValidation,
    ...limitValidation,
    validate
], async (req, res) => {
    await eventController.getEventAdmin(req, res, eventModel);
});

router.get('/personal', [
    ...dateRangeValidation,
    ...limitValidation,
    ...idValidation,
    validate
], async (req, res) => {
    await eventController.getEventPersonal(req, res, eventModel);
});

// ----------- Post API for adding events -----------
router.post('/post',createEventLimiter, createEventValidation(), validate, async (req, res) => {
    try {
        // send query parameters to controller
        await eventController.createEvent(req, res, eventModel);
    } catch (err) {
        return res.status(500).json({ error: 'Unexpected server error' });
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
    validate
], async (req, res) => {
    try {
        const result = await eventModel.createEventTest(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to execute query' });
    }
});

module.exports = { router, setDb };