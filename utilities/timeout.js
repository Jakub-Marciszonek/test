function withTimeout(promise, ms, errorMsg) {
    const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(errorMsg)), ms)
    );
    return Promise.race([promise, timeout]);
}

module.exports = withTimeout;
// Usage example:
// const withTimeout = require('./utilities/timeout');

// const eventPromise = eventModel.create(req.body);
// const event = await withTimeout(eventPromise, 5000, 'DB operation timed out');
// return res.status(201).json(event);