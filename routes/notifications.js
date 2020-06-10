const express=require('express');
const NotyController= require('../controllers/NotificationController')

const router=express.Router();  

router.post('/subscribe',NotyController.subscribe);
router.get('/key',NotyController.getKey);
router.post('/push',NotyController.pushKey);


module.exports=router;