const express = require('express');
const router = express.Router();
const indietController = require('../controllers/indietController');

router
.route('/')
.get(indietController.getAllIndiets)
.post(indietController.createIndiets);


router
.route('/:id')
.get(indietController.getIndiet)
.put(indietController.updateIndiet)
.delete(indietController.deleteIndiet);


module.exports = router;