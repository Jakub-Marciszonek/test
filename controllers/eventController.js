exports.getEvent = async (req, res, eventModel) => {
  try {
    // Validate query parameters using express-validator
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('Get events starting');

    // await for the eventModel to fetch events based on query parameters
    const rows = await eventModel.getEvents(req.query);
    res.status(201).json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    return res.status(500).send('Server error');
  }
};

exports.createEvent = async (req, res, eventModel) => {
  try {
    // Validate query parameters using express-validator
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const currentDateTime = new Date();
    // Validate that eventDate is not in the past and has at least a two-hour notice
    const { eventDate, startTime } = req.body;
    const eventStartDateTime = new Date(`${eventDate}T${startTime}`); // combines eventDate and StartTime for datetime format
    const NoticeDateTime = new Date(currentDateTime.getTime() + 2 * 60 * 60 * 1000);
    //                                                         h^  m^  s^  ms^

    if (eventStartDateTime <= NoticeDateTime) {
      return res.status(400).json({
        error: 'Events must start in the future, with at least a two-hour notice'
      });
    }

    // await for the eventModel to create an event based on request body
    const result = await eventModel.createEvent(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Failed to execute query' });
  }
};