const express=require('express');
const trabajoController = require('../controllers/TrabajoController') ;
/*============================================
    Importamos el archivo de authentication
=========================================== */

// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/trabajo',trabajoController.addTrabajo)
router.get('/trabajos',trabajoController.getTrabajos)
router.get('/trabajos/area/:id_area',trabajoController.getTrabajosByAreas)

module.exports=router; 