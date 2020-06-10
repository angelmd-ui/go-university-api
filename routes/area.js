const express=require('express');
const areaController = require('../controllers/AreaController') ;
/*============================================
    Importamos el archivo de authentication
=========================================== */

// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/area',areaController.addArea)
router.get('/areas',areaController.getAreas)

module.exports=router; 