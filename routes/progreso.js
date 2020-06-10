const express=require('express');
const progresoController= require('../controllers/ProgresoController');
const router=express.Router();
const {isAuthenticated,hasRole} = require('../auth')

router.get('/progresos',progresoController.getProgresos);
router.post('/progreso',isAuthenticated,progresoController.newProgreso);
// router.get('/progresos/:id',progresoController.getProgreso);

module.exports=router;
