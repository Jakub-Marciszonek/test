const { Event, Coach } = require('../models/index.js');
const {buildRange, buildLimit} = require('../utilities/buildFilters.js')// from, to filters
const withTimeout = require('../utilities/timeout.js'); // for timeout handling
const { handleSequelizeForeignKeyError } = require('../utilities/dbErrrorHandlers.js');
// database error handling 
const eventService = require('../services/eventService.js');// for buissnes logic
const { filterUpdateFields, CLIENTPATCHWHITELIST, COACHPATCHWHITELIST}
= require('../utilities/filterPatchFields.js');

// Defoult only necessary and public data
async function getEvent (req, res) {
    try {
        const { where } = buildRange(req.query);
        const { limit } = buildLimit(req.query);

        const events = await Event.findAll({
        where,
        limit,
        attributes: ['eventDate', 'startTime', 'endTime'],//only time attributes
        include: [{ model: Coach, 
            attributes: ['coachName', 'coachSurname']
        }]
        });

        res.json(events);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
    };

async function getEventClient (req, res) {
    try {
        const { where } = buildRange(req.query);
        const { limit } = buildLimit(req.query);
        const clientId = req.params.clientid;
        // const clietIdFromToken = req.user.?userId
        // its going to be get after authentication
        //  from middleware from login

// Fetch all events
        const events = await Event.findAll ({
            where,
            limit,
            include: [{ model: Coach,
            }],
            raw: false,
        });

        const result = events.map(event => {
            const eventData = event.get ? event.get({ plain: true }) : event;

            if (clientId && String(eventData.clientId) === String(clientId)) {
                return eventData;
            } else {
                return {
                    eventName: eventData.eventName,
                    eventDate: eventData.eventDate,
                    coachName: eventData.Coach?.coachName,
                    coachSurname: eventData.Coach?.coachSurname
                };
            }
        });
        
        res.json(result);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Server error' });
        }
};

// after login
async function getEventCoach (req, res) {
    try {
        const { where } = buildRange(req.query);
        const { limit } = buildLimit(req.query);
        const coachId = req.params.coachid;
        // const coachIdFromToken = req.user.?userId
        // its going to be get after authentication
        //  from middleware from login

// Fetch all events
        const events = await Event.findAll ({
            where, 
            limit,
            include: [{ model: Coach,
            }],
            raw: false,
        });

        const result = events.map(event => {
            const eventData = event.get ? event.get({ plain: true }) : event;

            if (coachId && String(eventData.coachId) === String(coachId)) {
                return eventData;
            } else {
                return {
                    eventName: eventData.eventName,
                    eventDate: eventData.eventDate,
                    coachName: eventData.Coach?.coachName,
                    coachSurname: eventData.Coach?.coachSurname
                };
            }
        });
        
        res.json(result);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Server error' });
        }
};

// This function retrieves all events with their associated coaches for admin view.
async function getEventAdmin (req, res) {
    try {
        const { where } = buildRange(req.query);
        const { limit } = buildLimit(req.query);

        const events = await Event.findAll({
        where,
        limit,
        include: [{ model: Coach, 
        }]
        });

        res.json(events);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// client post api
async function createEvent (req, res, eventModel) {
    try {
        //const coachIdFromToken = req.user?.userId;
        const clientId = req.params.clientid;
        //const clientIdFromToken = req.user.?userId
        // its going to be get after authentication
        //  from middleware from login
        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        const { eventDate, startTime } = req.body;
        await eventService.twoHNotice(eventDate, startTime);
        //const event = await eventModel.create(req.body);

/*
        // --- Restrict editing to the event owner ---

        if (event clientId !== clientIfFromToken) {
            return res.status(403).json({
                 error: 'You are not allowed to edit this event. '
                });
        }
*/

        const eventData = {
            ...req.body, // all fields from the request body
            clientId: clientId // overwrite clientId from request params
        };

        const eventPromise = eventModel.create(req.body);
        const event = await withTimeout(eventPromise, 5000, 'DB operation timed out');
        
        return res.status(201).json(event);
    } catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return handleSequelizeForeignKeyError(err, res); 
        }

        if (err.message.includes('two-hour notice')) {
            return res.status(400).json({error: err.message});
        }

        return res.status(500).json({ error: err.message || 'Failed to create event' });
    }
};

// coach post api
async function createEventAsCoach (req, res, eventModel) {
    try {
        //const coachIdFromToken = req.user?.userId;
        const coachId = req.params.coachid;// its going to be get after authentication
        //  from middleware from login
        if (!coachId) {
            return res.status(400).json({ error: 'Coach ID is required' });
        }

        const { eventDate, startTime } = req.body;
        await eventService.twoHNotice(eventDate, startTime);
        //const event = await eventModel.create(req.body);

/*
        // --- Restrict editing to the event owner ---

        if (event coachId !== coachIdFromToken) {
            return res.status(403).json({
                 error: 'You are not allowed to edit this event. '
                });
        }
*/

        const eventData = {
            ...req.body, // all fields from the request body
            coachId: coachId // overwrite coachId from request params
        };

        const eventPromise = eventModel.create(req.body);
        const event = await withTimeout(eventPromise, 5000, 'DB operation timed out');
        return res.status(201).json(event);
    } catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return handleSequelizeForeignKeyError(err, res); 
        }        
        if (err.message.includes('two-hour notice')) {
            return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: err.message || 'Failed to create event' });
    } 
};

async function createEventAsAdmin (req, res ,eventModel) {
    try{
        // place for admin athentification check code
        const { eventDate, startTime } = req.body;
        await eventService.twoHNotice(eventDate, startTime);

        const eventPromise = eventModel.create(req.body);
        const event = await withTimeout(eventPromise, 5000, 'DB operation timed out');
        return res.status(201).json(event);
    } catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return handleSequelizeForeignKeyError(err, res); 
        }

        if (err.message.includes('two-hour notice')) {
            return res.status(400).json({error: err.message});
        }

        return res.status(500).json({ error: err.message || 'Failed to create event '});
    }
};

// client edit api
async function editEvent (req, res, eventModel) {
    try {
        //const coachIdFromToken = req.user?.userId;
        const eventId = req.params.eventid; // for know i thing to acquire event id you need
// access to the information about event eg ur own event as client or coach
        const { updates, blocked } = filterUpdateFields(req.body, CLIENTPATCHWHITELIST);

        if (blocked.length > 0) {
            return res.status(400).json({
                error: `The following field are not allowed to be updated: ${blocked.join(', ')}`
            });
        }

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
/*
        // --- Restrict editing to the event owner ---

        if (event clientId !== clientIdfFromToken) {
            return res.status(403).json({
                 error: 'You are not allowed to edit this event. '
                });
        }
*/
        // -------------------------------------------

        await event.update(updates);

        res.json(event);
    } catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return handleSequelizeForeignKeyError(err, res); 
        
        }
        return res.status(500).json({ error: err.message || 'Failed to change the event'});
    }
};

async function editEventAsCoach (req, res, eventModel) {
    try {
        //const coachIdFromToken = req.user?.userId;
        const eventId = req.params.eventid; // for know i thing to acquire event id you need
// access to the information about event eg ur own event as client or coach
        const { updates, blocked } = filterUpdateFields(req.body, COACHPATCHWHITELIST);

        if (blocked.length > 0) {
            return res.status(400).json({
                error: `The following field are not allowed to be updated: ${blocked.join(', ')}`
            });
        }

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

/*
        // --- Restrict editing to the event owner ---

        if (event coachId !== coachIfFromToken) {
            return res.status(403).json({
                 error: 'You are not allowed to edit this event. '
                });
        }
*/

        await event.update(updates);

        res.json(event);
    } catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return handleSequelizeForeignKeyError(err, res); 
        }
        return res.status(500).json({ error: err.message || 'Failed to change the event'});
    }
};

async function editEventAsAdmin(req, res, eventModel) {
    try {
        const eventId = req.params.eventid;
        const updates = req.body;

        if('clientId' in updates && 'coachId' in updates) {
            return res.status(400).json({
                error: "You cannont update both clientId and coachId in the same request."
            });
        }
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.update(updates);
    } catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return handleSequelizeForeignKeyError(err, res); 
        }
        return res.status(500).json({ error: err.message || 'Failed to change the event'});        
    }
};

async function deleteEvent(req, res, eventModel) {
    try {
        const eventId = req.params.eventid;
        // const clientIdFromToken = req.user.?userId
        const event = await eventModel.findByPk(eventId);
        if (!eventId) {
            return res.status(404).json({ error: 'Event not found' });
        }

/*
        if (event.clietId !== clietIdFromToken) {
        return res.status(403).json({ error: 'You are not allowed to delete this event. });
        }
*/

        await event.destroy();
        
        return res.json({ message: 'Event deleted successfully. '});
    } catch (err) {
        return res.status(500).json ({ error: err.message });
    }
};

async function deleteEventAsCoach(req, res, eventModel) {
    try {
        const eventId = req.params.eventid;
        // const coachIdFromToken = req.user.?userId
        const event = await eventModel.findByPk(eventId);
        if (!eventId) {
            return res.status(404).json({ error: 'Event not found' });
        }

/*
        if (event.coachId !== coachIdFromToken) {
        return res.status(403).json({ error: 'You are not allowed to delete this event. });
        }
*/

        await event.destroy();
        
        return res.json({ message: 'Event deleted successfully. '});
    } catch (err) {
        return res.status(500).json ({ error: err.message });
    }
};


// after login
async function deleteEventAsAdmin(req, res, eventModel) {
    try {
        const eventId = req.params.eventid;
        const event = await eventModel.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.destroy();
        
        return res.json({ message: 'Event deleted successfully. '});
    } catch (err) {
        return res.status(500).json ({ error: err.message });
    }
};

module.exports = {
  getEvent,
  getEventClient,
  getEventCoach,
  getEventAdmin,
  createEvent,
  createEventAsCoach,
  createEventAsAdmin,
  editEvent,
  editEventAsCoach,
  editEventAsAdmin,
  deleteEvent,
  deleteEventAsCoach,
  deleteEventAsAdmin
}