const { Event, Coach } = require('../models');
const buildFilters = require('../middlewares/APIfilters.js')// from, to, limit filters
const eventService = require('../services/eventService');// for buissnes logic

exports.getEvent = async (req, res, eventModel) => {
  try {
    const { where, limit } = buildFilters(req.query);

    const events = await Event.findAll({
      where,
      limit: parseInt(limit),
      include: [{ model: Coach }]
    });

    res.json(events);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { eventDate, startTime } = req.body;
    eventService.twoHNotice(eventDate, startTime);

    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    if (err.message.includes('two-hour notice')) {
      return res.status(400).json({error: err.message});
    }

    res.status(500).json({ error: 'Failed to create event' });
  }
};
