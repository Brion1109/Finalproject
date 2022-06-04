const express = require('express');
const router = express.Router();
const hbsController = require('../controllers/hbsController');
const Beauty = require("../models/hbs");


router
.route('/')
.get(hbsController.getAllBeautys)
.post(hbsController.createBeautys);


router
.route('/:id')
.get(hbsController.getBeauty)
.put(hbsController.updateBeauty)
.delete(hbsController.deleteBeauty);


module.exports = router;