require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const port = process.env.PORT || 3000;

const { sequelize } = require('./models');
const clientRouter = require('./routes/events.js');
const hourSetUpRouter = require('./routes/hoursSetUp.js');

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

        console.log('Connected to SQLite database');

        // Set up routes
        app.use('/event', clientRouter);
        app.use('/hour', hourSetUpRouter);

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
