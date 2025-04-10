const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('calendar-backend/data/Essentials.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

app.use(express.json());

app.get('/api/events', (req, res) => {
    console.log('Get Events starting')
    // results = number of displayed rows
    const results = parseInt(req.query.results) || 100;
    const filterDateStart = req.query.from; // Format YYYY-MM-DD
    const filterDateEnd = req.query.to

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
        
        filterDateQuery += filterDateQuery ? 'AND Events.eventDate <= ? ' :
'WHERE Events.eventDate <= ? ';
        params.push(filterDateEnd);
    }

    params.push(results);

    const query = `SELECT Events.eventId, Events.eventName, Events.eventDescription, 
Events.eventDate, Events.startTime, Events.EndTime, Services.serviceId,
Coaches.coachName, Clients.ageGroup
FROM Events
INNER JOIN Services ON Events.serviceId = Services.serviceId
INNER JOIN Coaches ON Events.coachId = Coaches.coachId
INNER JOIN Clients ON Events.clientId = Clients.clientId
${filterDateQuery}
LIMIT ?`;

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(rows);
    });
});

app.post('/api/events/post', (req, res) => {
    console.log('Post Events starting')
    const {clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
    eventDescription = null,
    attachments = null,
    eventLocation = null} = req.body;

    if (!clientId || !coachId || !serviceId || !eventName || !eventDate || !startTime || !endTime) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    db.run(`INSERT INTO Events 
    (clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
    eventDescription, attachments, eventLocation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
    [clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
    eventDescription, attachments, eventLocation],
    function(err) {
        if (err) {
            return res.status(500).json({error: 'Failed to create event'});
        }
        res.status(201).json({message: 'Event created', eventId: this.lastID});
    });
});


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
