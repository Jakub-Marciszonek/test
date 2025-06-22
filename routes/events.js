const express = require('express');
const eventController = require('../controllers/eventController.js');

const { createEventLimiter } = require('../middlewares/rateLimiters');
const { dateRangeValidation, limitValidation, idParamsValidation }
= require('../middlewares/APIfiltersValidation.js');

const { createEventValidation, patchEventValidation } 
= require('../middlewares/eventValidation.js');

const validate = require('../middlewares/validate.js');

const EventModel = require('../models/event.js')

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

// ----------- Get API for client events -----------
// after login wall
// diplayes all events plus personal info
// can be changed to display only personal events depends on the concept
router.get('/client/:clientid', [
    ...dateRangeValidation,
    ...limitValidation,
    ...idParamsValidation('clientid'),
    validate
], async (req, res) => {
    await eventController.getEventClient(req, res, eventModel);
});

// ----------- Get API for coache events -----------
router.get('/coach/:coachid', [
    ...dateRangeValidation,
    ...limitValidation,
    idParamsValidation('coachid'),
    validate
], async (req, res) => {
    await eventController.getEventCoach(req, res, eventModel);
});

// ----------- Get API for admin events -----------
router.get('/admin', [
    ...dateRangeValidation,
    ...limitValidation,
    validate
], async (req, res) => {
    await eventController.getEventAdmin(req, res, eventModel);
});

// ----------- Post API for adding events as client -----------
// after login wall
router.post('/post/:clientid', createEventLimiter,
idParamsValidation('clientid'), createEventValidation(), validate,
async (req, res) => {
    try {
        // send query parameters to controller
        await eventController.createEvent(req, res, eventModel);
    } catch (err) {
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});

// ----------- Post API for adding events as coach -----------
// after login wall
router.post('/post/coach/:coachid', createEventLimiter, 
idParamsValidation('coachid'), createEventValidation(), validate, 
async (req, res) => {
    try {
        // send query parameters to controller
        await eventController.createEventAsCoach(req, res, eventModel);
    } catch (err) {
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});

// ----------- Post API for adding events as admin -----------
// after login wall at least
router.post('/admin/post', createEventLimiter, createEventValidation(), validate, 
async (req, res) => {
    try {
        await eventController.createEventAsAdmin(req, res, eventModel);
    } catch (err) {
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});

router.patch('/edit/:eventid', createEventLimiter, idParamsValidation('eventid'),
patchEventValidation(), validate,
async (req, res) => {
    try {
        await eventController.editEvent(req, res, eventModel);
    } catch (err) {   
        return res.status(500).json({ error: 'Unexpected server error'})
    }
});

router.patch('/edit/coach/:eventid', createEventLimiter, idParamsValidation('eventid'),
patchEventValidation(), validate,
async (req, res) => {
    try {
        await eventController.editEventAsCoach(req, res, eventModel);
    } catch (err) {
        console.error('Error updating event:', err);
        return res.status(500).json({ error: 'Unexpected server error'})
    }
});

module.exports = { router, setDb };