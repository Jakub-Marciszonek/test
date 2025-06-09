require('dotenv').config();
const express = require('express');
const { Database } = require('sqlite-async');
console.log(Database);
const {router: eventsRouter, setDb: setEventDb } = require('./routes/events.js');

const {router: personalRouter, setDb: setPersonalDb} = require('./routes/personal.js');
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// placeholder for the secound router presumambly personal api is going to be in events.js
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let db;

(async function() {
    try {
        db = await Database.open(process.env.DB_PATH);
        setEventDb(db); // Set the database instance for the events router
        setPersonalDb(db);
        console.log('Connected to SQLite database');

        // Set up routes
        app.use('/event', eventsRouter);
        app.use('/personal', personalRouter);

        //Helath check endpoint
        app.get('/health', (req, res) => {
            res.status(db ? 200 : 503).json({
                database: db ? 'connected' : 'disconnected'
            });
        });

        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`);
        }); 
        } catch (err) {
            console.error('Database connection error:', err);
            process.exit(1);
    }
})();
