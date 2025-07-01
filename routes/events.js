//~~~~~~~~~~~~~~~~~~~~~~ events routers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const express = require('express');
const eventController = require('../controllers/eventController.js');

const { createEventLimiter } = require('../middlewares/rateLimiters');
const { dateRangeValidation, limitValidation, idParamsValidation }
= require('../middlewares/APIfiltersValidation.js');

const { createEventValidation, patchEventValidation } 
= require('../middlewares/eventValidation.js');

const validate = require('../middlewares/validate.js');

const router = express.Router();

// ### Passive API for default render ###
// Event to be displayed does have to not have empty:
// eventId, eventName, eventDate, startTime, EndTime, coachId
router.get('/', [
    ...dateRangeValidation,
    ...limitValidation,
    validate
], async (req, res) => {
    await eventController.getEvent(req, res);
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
    await eventController.getEventClient(req, res);
});

// ----------- Get API for coache events -----------
router.get('/coach/:coachid', [
    ...dateRangeValidation,
    ...limitValidation,
    idParamsValidation('coachid'),
    validate
], async (req, res) => {
    await eventController.getEventCoach(req, res);
});

// ----------- Get API for admin events -----------
router.get('/admin', [
    ...dateRangeValidation,
    ...limitValidation,
    validate
], async (req, res) => {
    await eventController.getEventAdmin(req, res);
});

// ----------- Post API for adding events as client -----------
// after login wall
router.post('/client/post/:clientid', createEventLimiter,
idParamsValidation('clientid'), createEventValidation(), validate,
async (req, res) => {
    try {
        // send query parameters to controller
        await eventController.createEvent(req, res);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// ----------- Post API for adding events as coach -----------
// after login wall
router.post('/coach/post/:coachid', createEventLimiter, 
idParamsValidation('coachid'), createEventValidation(), validate, 
async (req, res) => {
    try {
        // send query parameters to controller
        await eventController.createEventAsCoach(req, res);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// ----------- Post API for adding events as admin -----------
// after login wall at least
router.post('/admin/post', createEventLimiter, createEventValidation(), validate, 
async (req, res) => {
    try {
        await eventController.createEventAsAdmin(req, res);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

router.patch('/client/edit/:eventid', createEventLimiter, idParamsValidation('eventid'),
patchEventValidation(), validate,
async (req, res) => {
    try {
        await eventController.editEvent(req, res);
    } catch (err) {   
        return res.status(500).json({ error: err})
    }
});

router.patch('/coach/edit/:eventid', createEventLimiter, idParamsValidation('eventid'),
patchEventValidation(), validate,
async (req, res) => {
    try {
        await eventController.editEventAsCoach(req, res);
    } catch (err) {
        return res.status(500).json({ error: err})
    }
});

router.patch('/admin/edit/:eventid', createEventLimiter, idParamsValidation('eventid'),
patchEventValidation(), validate,
async (req, res) => {
    try {
        await eventController.editEventAsAdmin(req, res);
    } catch {
        return res.status(500).json({ error: err })
    }
});

router.delete('/client/delete/:eventid', idParamsValidation('eventid'), validate,
async (req, res) => {
    try {
        await eventController.deleteEvent (req, res);
    } catch {
        return res.status(500).json({ error: err });
    }
});

router.delete('/coach/delete/:eventid', idParamsValidation('eventid'), validate,
async (req, res) => {
    try {
        await eventController.deleteEventAsCoach (req, res);
    } catch {
        return res.status(500).json({ error: err });
    }
});

router.delete('/admin/delete/:eventid', idParamsValidation('eventid'), validate,
async (req, res) => {
    try {
        await eventController.deleteEventAsAdmin (req, res);
    } catch {
        return res.status(500).json({ error: err });
    }
});

module.exports = router;