const { OperatingHours, OperatingException, Coach} = require('../models/index.js');
const { buildLimit} = require('../utilities/buildFilters.js')// from, to filters
const withTimeout = require('../utilities/timeout.js'); // for timeout handling
const { handleSequelizeForeignKeyError } = require('../utilities/dbErrrorHandlers.js');
// database error handling 


// shows all regular hours for all coaches
async function getGeneralHours (req, res) {
    try {
        const hours = await OperatingHours.findAll({
            attributes: ['isOpen', 'weekDay', 'openTime', 'closeTime'],
            include: [
                { model: Coach,
                attributes: ['coachName', 'coachSurname'] 
                },
            ]
    });

        res.json(hours);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

async function getCoachHours (req, res) {
    try {
/*
        cosnt coachId = req.user.?userId
*/
        const coachId = req.params.coachId;
        if (!coachId) {
            return res.status(400).json({ error: 'Coach ID is required' });
        }

        const coach = await Coach.findByPk(coachId, {
            attributes: ['coachName', 'coachSurname'],
            include: [
                { model: OperatingHours, 
                    attributes: ['isOpen', 'weekDay', 'openTime', 'closeTime'],
                },
                { model: OperatingException,
                    attributes: [
                        'exceptionDate', 'isOpen', 'openTime', 'closeTime', 'recurrenceType', 
                        'exceptionDescription'
                    ],
                 }
            ]
        });
        if (!coach) {
            return res.status(404).json({ error: 'Coach not found' });
        }

        res.json(coach);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// post for admins if generalHours are going to be tied with a coach the coachId must
// be included in the request body
async function postGeneralHours (req, res) {
    try{
        //const AdminIdFromToken = req.user?.userId;
        // authenticate admin
        const hourPromise = Event.create(req.body);
        const generalHour = await withTimeout(hourPromise, 5000, 'DB operation timed out');
        return res.status(201).json(generalHour);
    }catch (err) {
        return res.status(500).json({ error:err });
    }
};

    module.exports = {
        getGeneralHours,
        getCoachHours,
        postGeneralHours,
    }