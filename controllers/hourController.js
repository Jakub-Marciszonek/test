const { OperatingHours } = require('../models/index.js');
const { buildLimit} = require('../utilities/buildFilters.js')// from, to filters
const withTimeout = require('../utilities/timeout.js'); // for timeout handling
const { handleSequelizeForeignKeyError } = require('../utilities/dbErrrorHandlers.js');
// database error handling 


// shows all regular hours for all coaches
async function getHour (req, res, eventModel) {
    try {
        const { limit } = buildLimit(req.query);

        const hours = await OperatingHours.findAll({
        limit,
        });

        res.json(hours);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
    };

    module.exports = {
        getHour,
    }