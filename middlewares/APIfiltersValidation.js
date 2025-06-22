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

//currently not used
const { param } = require('express-validator');

// Accepts any number of param names and returns validation chains
function idParamsValidation(...paramNames) {
// insert id names as many as neccesarry
    return paramNames.map(name =>
        param(name)
            .isInt({ min: 1 })
            .withMessage(`${name} must be a positive integer`)
    );
}


module.exports = {
    dateRangeValidation, limitValidation, idParamsValidation
};