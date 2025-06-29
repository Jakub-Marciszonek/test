//~~~~~~~~~~~~ routers to set up working hours available for scheduling ~~~~~~~~~~~~~~~~~~~~

const express = require('express');

const hourController = require('../controllers/hourController.js');
const router = express.Router();

const validate = require('../middlewares/validate.js');
const EventModel = require('../models/event.js')
// ### Database connection setup ###
// This will be set by the server.js file
let db;
let eventModel;
function setDb(database) {
    db = database;
    eventModel = EventModel(db);// eventModel is set to be assignet as event models:
//                                  models/event.js
}

router.get('/getall', [
// validation and rate limiting here
], async (req, res) => {
    await hourController.getHour(req, res, eventModel);
});

module.exports = { router, setDb };