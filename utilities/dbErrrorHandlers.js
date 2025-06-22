// utils/dbErrorHandlers.js

function handleSequelizeForeignKeyError(err, res) {
    const constraint = err.original?.constraint || err.parent?.constraint || '';
    const message = String(err.original?.sqlMessage || err.parent?.sqlMessage || '');

    if (constraint.includes('client') || message.includes('client')) {
        return res.status(400).json({ error: "The specified clientId does not exist." });

    } else if (constraint.includes('coach') || message.includes('coach')) {
        return res.status(400).json({ error: "The specified coachId does not exist." });

    } else if (constraint.includes('service') || message.includes('service')) {
        return res.status(400).json({ error: "The specified serviceId does not exist." });

    } else {
        return res.status(400).json({ error: "A referenced record does not exist." });
    }
}

module.exports = { handleSequelizeForeignKeyError };

// use example

//  if (err.name === 'SequelizeForeignKeyConstraintError') {
//      return handleSequelizeForeignKeyError(err, res); 
//  }