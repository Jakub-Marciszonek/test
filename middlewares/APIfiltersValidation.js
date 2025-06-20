const { query } = require('express-validator');

const dateRangeValidation = [
    query('from')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('"From" must be a valid date (YYYY-MM-DD)'),
    query('to')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('"To" must be a valid date (YYYY-MM-DD)')
];

const limitValidation = [
    query('limit')
        .optional()
        .isInt({ min:1 })
        .toInt()
        .withMessage('"limit" must be an positive integer'),
];

const idValidation = [
    query('Id')
        .optional()
        .isInt({min: 1})
        .withMessage('"Id" must be a positive integer'),
];

module.exports = {
    dateRangeValidation, limitValidation, idValidation
};