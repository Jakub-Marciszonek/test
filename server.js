require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const port = process.env.PORT || 3000;

const { sequelize } = require('./models');
const { router: eventsRouter, setDb: setEventDb } = require('./routes/events.js');
const { router: personalRouter, setDb: setPersonalDb } = require('./routes/personal.js');
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// placeholder for the secound router  personal api is in events.js
const { generalLimiter } = require('./middlewares/rateLimiters.js');

const app = express();

app.use(helmet());
app.use(generalLimiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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
        app.get('/health', async (req, res) => {
            try {
                await sequelize.authenticate();
                res.status(200).json({ database: 'connected' });
            } catch (err) {
                res.status(503).json({ database: 'disconnected', error: err.message });
            }
        });


        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
})();
