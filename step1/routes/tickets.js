const { Router } = require('express');
const { reserveTicket } = require('../controllers/tickets');

const router = Router();

// Method GET to create the event and show the id of the event
router.get('/reserveticket', [
], reserveTicket);


module.exports = router;