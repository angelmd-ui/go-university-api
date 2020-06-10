const express=require('express');
const NewsController= require('../controllers/NewsController');
const upload = require('../controllers/upload');
const {isAuthenticated,hasRole} = require('../auth')


const router=express.Router();  

router.post('/news/add',upload,NewsController.addNews);
//router.post('/news/:id/coment',isAuthenticated,NewsController.addNewsComments);
router.post('/news/:id/coment',NewsController.addNewsComments);
router.get('/news',NewsController.getNews);
router.get('/news/:id',NewsController.getItemNews);
router.get('/news/:id/coments',NewsController.getnewsComments);

module.exports=router;