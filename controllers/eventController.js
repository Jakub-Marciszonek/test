const { Event, Coach } = require('../models/index.js');
const {buildRange, buildLimit} = require('../utilities/buildFilters.js')// from, to filters
const withTimeout = require('../utilities/timeout.js'); // for timeout handling
const eventService = require('../services/eventService.js');// for buissnes logic

// Defoult only necessary and public data
async function getEvent (req, res) {
    try {
        const { where } = buildRange(req.query);
        const { limit } = buildLimit(req.query);

        const events = await Event.findAll({
        where,
        limit,
        attributes: ['eventId', 'eventDate', 'startTime', 'endTime'],//only time attributes
        include: [{ model: Coach, 
            attributes: ['coachId', 'coachName', 'coachSurname']
        }]
        });

        res.json(events);
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

async function getEventPersonal (req, res) {
    try {
        const { where } = buildRange(req.query);
        const { limit } = buildLimit(req.query);
        const clientId = req.query.clientId;

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
                    eventId: eventData.eventId,
                    eventName: eventData.eventName,
                    eventDate: eventData.eventDate,
                    coachName: eventData.Coach?.coachName,
                    coachName: eventData.Coach?.coachSurname
                };
            }
        });
        
        res.json(result);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Server error' });
        }
};

async function createEvent (req, res, eventModel) {
    try {
        const { eventDate, startTime } = req.body;
        await eventService.twoHNotice(eventDate, startTime);
        //const event = await eventModel.create(req.body);
        const eventPromise = eventModel.create(req.body);
        const event = await withTimeout(eventPromise, 5000, 'DB operation timed out');
        return res.status(201).json(event);
    } catch (err) {
        if (err.message.includes('two-hour notice')) {
            return res.status(400).json({error: err.message});
        }

        return res.status(500).json({ error: err.message || 'Failed to create event' });
  }
};

module.exports = {
  getEvent,
  getEventAdmin,
  getEventPersonal,
  createEvent
}