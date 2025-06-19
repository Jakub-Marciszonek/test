const { Event, Coach } = require('../models/index.js');
const buildFilters = require('../utilities/buildFilters.js')// from, to, limit filters
const eventService = require('../services/eventService.js');// for buissnes logic
// This function retrieves all events with their associated coaches for admin view.
async function getEventAdmin (req, res) {
  try {
    const { where, limit } = buildFilters(req.query);

    const events = await Event.findAll({
      where,
      limit: parseInt(limit),
      include: [{ model: Coach, 
      }]
    });

    res.json(events);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
// Defoult only necessary and public data
async function getEvent (req, res) {
  try {
    const { where, limit } = buildFilters(req.query);

    const events = await Event.findAll({
      where,
      limit: parseInt(limit),
      attributes: ['eventId', 'eventDate', 'startTime', 'endTime'],//only time attributes
      include: [{ model: Coach, 
        attributes: ['coachId', 'coachName', 'coachSurname'] // only coach attributes
      }]
    });

    res.json(events);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

async function createEvent (req, res, eventModel) {
  try {
    const { eventDate, startTime } = req.body;
    eventService.twoHNotice(eventDate, startTime);

    const event = await eventModel.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    if (err.message.includes('two-hour notice')) {
      return res.status(400).json({error: err.message});
    }

    res.status(500).json({ error: 'Failed to create event' });
  }
};

module.exports = {
  getEvent,
  getEventAdmin,
  createEvent
}