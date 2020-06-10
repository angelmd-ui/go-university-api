const express=require('express');
const FavoriteController= require('../controllers/FavorireController');
const router=express.Router();

router.post('/boardCreate/:id',FavoriteController.addFavorite);

router.post('/boardPush/:id/:id_newser',FavoriteController.addItemOnFavorite);
router.get('/boardView',FavoriteController.getFavorite);
router.get('/boardView/:id',FavoriteController.getItemFavorite);

module.exports=router;