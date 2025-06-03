require('dotenv').config();
const express = require('express');
const { Database } = require('sqlite-async');
console.log(Database);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let db;

(async function() {
    db = await Database.open(process.env.DB_PATH);
    console.log('Connected to SQLite database');
})();

// ### Passive API for default render ###
app.get('/Default', async (req, res) => {
    try{
        console.log('Get Default starting');
                                                // 30days*8h=240h
        const results = parseInt(req.query.results) || 250; // results is number of results in api
        const filterDateStart = req.query.from; // Format YYYY-MM-DD
        const filterDateEnd = req.query.to; // Format YYYY-MM-DD

        let filterDateQuery = '';
        let params = [];

        if (filterDateStart) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(filterDateStart)) {
                return res.status(400).send('Invalid date format. Use YYYY-MM-DD');
            }
            filterDateQuery += 'WHERE Events.eventDate >= ?';
            params.push(filterDateStart);
        }

        if (filterDateEnd) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(filterDateEnd)) {
                return res.status(400).send('Invalid date format. Use YYYY-MM-DD');
            }
            
            filterDateQuery += filterDateQuery ? 'AND Events.eventDate <= ? ' : // checks if filterDateQuery is empty
'WHERE Events.eventDate <= ? '; // if it's not empty adds this ^^^ querry
// if it's adds this ^^^ querry
            params.push(filterDateEnd);
        }
        
        params.push(results);

        const query = `
SELECT Events.eventId, Events.eventName, 
Events.eventDate, Events.startTime, Events.EndTime,
Coaches.coachName
FROM Events
INNER JOIN Coaches ON Events.coachId = Coaches.coachId
${filterDateQuery}
LIMIT ?`;

        const rows = await db.all(query, params);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Server error');
    }
});
// ### Personalized API for displaying detailed data ###
app.get('/personal', async (req, res) => {// for now it's usin client name and id
    try{
        console.log('Get Personal starting');

        const clientId = req.query.clientId // clientId and clientName required to use api
        const clientName = req.query.clientName;
        
        const results = parseInt(req.query.results) || 250; // results is number of results in api
        const filterDateStart = req.query.from; // Format YYYY-MM-DD
        const filterDateEnd = req.query.to; // Format YYYY-MM-DD
        
        if (!clientName || !clientId) {
            return res.status(400).send('Missing required parameter: clientName or clientId');
        }

        let filterDateQuery = '';
        let params = [clientName, clientId];

        if (filterDateStart) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(filterDateStart)) {
                return res.status(400).send('Invalid date format. Use YYYY-MM-DD');
            }
            filterDateQuery += 'AND Events.eventDate >= ?';
            params.push(filterDateStart);
        }

        if (filterDateEnd) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(filterDateEnd)) {
                return res.status(400).send('Invalid date format. Use YYYY-MM-DD');
            }
            
            filterDateQuery += 'AND Events.eventDate <= ?';
        }

        params.push(results);

        const query = `SELECT Events.eventId, Events.eventName, Events.eventDescription, 
Events.eventDate, Events.startTime, Events.EndTime, Events.eventLocation,
Services.serviceName, Coaches.coachName, Clients.clientName
FROM Events
INNER JOIN Clients On Events.clientId = Clients.clientId
INNER JOIN Services ON Events.serviceId = Services.serviceId
INNER JOIN Coaches ON Events.coachId = Coaches.coachId
WHERE Clients.clientName = ? AND Clients.clientId = ? ${filterDateQuery}
LIMIT ?`;

const rows = await db.all(query, params);
res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Server error');
    }
});

// ----------- simplify post api for testing -----------
app.post('/event/test', async (req, res) => {
    try{
    const {eventName, eventDate, startTime, endTime} = req.body;

    console.log(`Recieved: \n ${JSON.stringify(req.body)}`);
    
    if (!eventName || !eventDate || !startTime || !endTime) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    db.run(`INSERT INTO Events(eventName, eventDate, startTime, endTime)
    Values (?, ?, ?, ?)`,
    [eventName, eventDate, startTime, endTime],
    );
    res.status(201).json({message: 'Event created', eventId: result.lastID});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({error: 'Failed to execute query'});
    }
});

app.post('/events/post', async (req, res) => {// adding event
    try{
    console.log('Post Events starting')

    const {clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
    eventDescription = null, // variables with "null" are optional
    attachments = null,// thats why the do have value already
    eventLocation = null} = req.body;

    console.log('Received bodu:', req.body);

    if (!clientId || !coachId || !serviceId || !eventName || !eventDate || !startTime || !endTime) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    const eventStartDateTime = new Date(`${eventDate}T${startTime}`); // combines eventDate and StartTime for datetime format
    const NoticeDateTime = new Date(currentDateTime.getTime() + 2 * 60* 60 * 1000);
    //                                                         h^  m^  s^  ms^
    if (eventStartDateTime <= NoticeDateTime) {
        return res.status(400).json({error: 'Events must start in the future, with at least a two-hour notice'});
    }

    const result = await db.run(`INSERT INTO Events 
    (clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
    eventDescription, attachments, eventLocation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
    [clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
    eventDescription, attachments, eventLocation],
    );

    res.status(201).json({message: 'Event created', eventId: result.lastID});
} catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({error: 'Failed to execute query'});
}
});


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
