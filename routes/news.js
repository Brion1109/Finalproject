const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router
.route('/')
.get(newsController.getAllNewss)
.post(newsController.createNewss);

router
.route('/:id')
.get(newsController.getNews)
.put(newsController.updateNews)
.delete(newsController.deleteNews);
module.exports = router;
