const { body } = require('express-validator');

exports.createFilterValidation = [
    body('from')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('"From" must be a valid date (YYYY-MM-DD)'),
    body('to')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('"To" must be a valid date (YYYY-MM-DD)'),
    body('results')
        .optional()
        .isInt({ min: 1, max: 1000 })
        .toInt()
        .withMessage('"Results" must be an integer between 1 and 1000'),
]