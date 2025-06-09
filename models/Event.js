// Description: Event model for managing events in the database
class EventModel {
    // Constructor to initialize the database connection
    constructor(db) { this.db = db; }

    // Method to retrieve events based on optional query parameters
    async getEvents({ limit = 250, from, to }) {
        //                        ^^^
        //                     30days*8h=240h
        let where = [];
        let params = [];

        // Check if 'from' and 'to' parameters are provided and add them to the query
        if (from) { where.push('Events.eventDate >= ?'); params.push(from); }
        if (to) { where.push('Events.eventDate <= ?'); params.push(to); }

        // If no parameters are provided, it will return all events
        //where.length is used to check if any conditions were added if yes
        //where.join(' AND ') joins the conditions with 'AND' operator
        const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const query = `
            SELECT Events.eventId, Events.eventName, Events.eventDate,
            Events.startTime, Events.EndTime, Coaches.coachName
            FROM Events
            INNER JOIN Coaches ON Events.coachId = Coaches.coachId
            ${whereClause}
            LIMIT ?`;

        // Add the limit to the parameters array
        params.push(limit);
        // Execute the query with the parameters
        return this.db.all(query, params);
    }

    // Method to create a new event with optional parameters
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
            // Return the last inserted ID and a success message
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

// This line exports the EventModel class so it can be used in other files
// It allows the class to be imported and instantiated in other parts of the application
module.exports = EventModel;