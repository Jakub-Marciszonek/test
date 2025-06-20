const { Op } = require('sequelize');

function buildRange(query) {
    const {from, to } = query;
    const where = {};

    if (from || to) {
        where.eventDate = {};
        if (from) where.eventDate[Op.gte] = from;
        if (to) where.eventDate[Op.lte] = to;
    }

    return {
        where
    };
}

function buildLimit(query) {
// If limit is provided, use it, else it's 250
    return query.limit !== undefined ? query.limit : 250;
}

module.exports = {
    buildRange, buildLimit
};