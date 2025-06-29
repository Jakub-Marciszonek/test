//~~~~~~~~~~~~~~~~~~ routers for clients to check available time ~~~~~~~~~~~~~~~~~~~~~~~~~~

const express = require('express');

const { createEventLimiter } = require('../middlewares/rateLimiters');
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

module.exports = { router, setDb };