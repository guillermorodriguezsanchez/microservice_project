const { Router } = require('express');
const { reserveTicket , deleteTicket, getTickets } = require('../controllers/tickets');

const router = Router();

// Method GET to create the event and show the id of the event
router.get('/reserveticket', [
], reserveTicket);

router.get('/deleteticket', [
], deleteTicket);
router.get('/tickets', [
], getTickets);


module.exports = router;