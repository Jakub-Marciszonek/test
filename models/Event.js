class EventModel {
  constructor(db) { this.db = db; }
    //                     30days*8h=240h
    async getEvents({ limit = 250, from, to }) {
        let where = [];
        let params = [];

        if (from) { where.push('Events.eventDate >= ?'); params.push(from); }
        if (to) { where.push('Events.eventDate <= ?'); params.push(to); }

        const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const query = `
            SELECT Events.eventId, Events.eventName, Events.eventDate,
            Events.startTime, Events.EndTime, Coaches.coachName
            FROM Events
            INNER JOIN Coaches ON Events.coachId = Coaches.coachId
            ${whereClause}
            LIMIT ?`;

        params.push(limit);
        return this.db.all(query, params);
    }

    async createEvent({
        clientId, coachId, serviceId, eventName, eventDate, startTime, endTime,
        eventDescription = null, attachments = null, eventLocation = null
    }) {
        const query = `
            INSERT INTO Events (clientId, coachId, serviceId, eventName,
            eventDate, startTime, endTime, eventDescription, attachments,
            eventLocation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            clientId, coachId, serviceId, eventName, eventDate, startTime,
            endTime, eventDescription, attachments, eventLocation
        ];

        const result = await this.db.run(query, params);
        return {
            eventId: result.lastID,
            message: 'Event created successfully'
        };
    }

    async createEventTest({
        eventName, eventDate, startTime, endTime
    }) {
        const query = `
        INSERT INTO Events (eventName, eventDate, startTime, endTime)
            VALUES (?, ?, ?, ?)`;
        
        const params = [
            eventName, eventDate, startTime, endTime
        ];

        const result = await this.db.run(query, params);
        return {
            eventId: result.lastID,
            message: 'Event created successfully'
        };
    }
}


module.exports = EventModel;