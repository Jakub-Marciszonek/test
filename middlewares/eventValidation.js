const { body } = require('express-validator');

function createEventValidation() {
    const rules = [
        body('eventName')
            .isString().withMessage('Event name must be a string')
            .notEmpty().withMessage('Event name is required'),

        body('eventDate')
            .notEmpty().withMessage('Event date is required')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Event date must be a valid date (YYYY-MM-DD)'),

        body('startTime')
            .notEmpty().withMessage('Start time is required')
            .matches(/^([0-9]|1\d|2[0-3]):([0-5]\d)$/)
            .withMessage('Start time must be in HH:mm or H:mm format'),

        body('endTime')
            .notEmpty().withMessage('End time is required')
            .matches(/^([0-9]|1\d|2[0-3]):([0-5]\d)$/)
            .withMessage('End time must be in HH:mm or H:mm format'),

        body('clientId')
            .notEmpty().withMessage('Client ID is required')
            .isInt({ min: 1 }).withMessage('clientId must be a positive integer'),

        body('coachId')
            .notEmpty().withMessage('Coach ID is required')
            .isInt({ min: 1 }).withMessage('coachId must be a positive integer'),

        body('serviceId')
            .notEmpty().withMessage('Service ID is required')
            .isInt({ min: 1 }).withMessage('serviceId must be a positive integer'),

        body('eventDescription')
            .optional({ nullable: true })
            .isString().withMessage('Event description must be a string'),

        body('attachments')
            .optional({ nullable: true })
            .isString().withMessage('Attachments must be a string'),

        body('attendance')
            .optional({ nullable: true })
            .isInt({ min: 0, max: 1 }).withMessage('Attendance must be 0 or 1'),

        body('eventLocation')
            .optional({ nullable: true })
            .isString().withMessage('Event location must be a string')
    ];
    return rules;
}

function patchEventValidation() {
    return [
        body('eventName')
            .optional()
            .isString().withMessage('Event name must be a string'),

        body('eventDate')
            .optional()
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Event date must be a valid date (YYYY-MM-DD)'),

        body('startTime')
            .optional()
            .matches(/^([0-9]|1\d|2[0-3]):([0-5]\d)$/)
            .withMessage('Start time must be in HH:mm or H:mm format'),

        body('endTime')
            .optional()
            .matches(/^([0-9]|1\d|2[0-3]):([0-5]\d)$/)
            .withMessage('End time must be in HH:mm or H:mm format'),

        body('clientId')
            .optional()
            .isInt({ min: 1 }).withMessage('clientId must be a positive integer'),

        body('coachId')
            .optional()
            .isInt({ min: 1 }).withMessage('coachId must be a positive integer'),

        body('serviceId')
            .optional()
            .isInt({ min: 1 }).withMessage('serviceId must be a positive integer'),

        body('eventDescription')
            .optional({ nullable: true })
            .isString().withMessage('Event description must be a string'),

        body('attachments')
            .optional({ nullable: true })
            .isString().withMessage('Attachments must be a string'),

        body('attendance')
            .optional({ nullable: true })
            .isInt({ min: 0, max: 1 }).withMessage('Attendance must be 0 or 1'),

        body('eventLocation')
            .optional({ nullable: true })
            .isString().withMessage('Event location must be a string')
    ];
}


module.exports = { 
    createEventValidation,
    patchEventValidation
};
