require('dotenv').config();
const express = require('express');
const sequelize = require('./database.js'); // Import the database connection
const { router: eventsRouter, setDb: setEventDb } = require('./routes/events.js');

const { router: personalRouter, setDb: setPersonalDb } = require('./routes/personal.js');
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// placeholder for the secound router presumambly personal api is going to be in events.js
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

(async function () {
    try {
        await sequelize.authenticate(); // Test connection to the database
        await sequelize.sync(); // Sync models with the database
        setEventDb(sequelize); // Pass the sequelize instance to router
        setPersonalDb(sequelize);

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
