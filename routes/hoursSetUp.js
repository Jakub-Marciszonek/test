//~~~~~~~~~~~~ routers to set up working hours available for scheduling ~~~~~~~~~~~~~~~~~~~~

const express = require('express');

const hourController = require('../controllers/hoursSetUpController.js');
const router = express.Router();

const validate = require('../middlewares/validate.js');

// ### Database connection setup ###
// This will be set by the server.js file

router.get('/general', [
// validation and rate limiting here
], async (req, res) => {
    await hourController.getGeneralHours(req, res);
});

router.get('/coach/hours/:coachId', [
    // validation and rate limiting here
], async (req, res) => {
    await hourController.getCoachHours(req, res);
});

router.post('/general/post', [
    // validation and rate limiting here
], async (req, res) => {
    await hourController.postGeneralHours(req, res)
})

module.exports = router;