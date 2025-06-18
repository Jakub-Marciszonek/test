const { Op } = require('sequelize');

function buildFilters(query) {
    const {from, to, limit = 250 } = query;
    const where = {};

    if (from || to) {
        where.eventDate = {};
        if (from) where.eventDate[Op.gte] = from;
        if (to) where.eventDate[Op.lte] = to;
    }

    return {
        where,
        limit: parseInt(limit, 10)
    };
}

module.exports = buildFilters;