const express = require('express');
const programaController = require('../controllers/ProgramaController');
/*============================================
    Importamos el archivo de authentication
=========================================== */
//import auth from '../middlewares/auth';
// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/programa',programaController.addPrograma)
router.get('/programas',programaController.getProgramas);
router.get('/programas/facultad',programaController.getProgramaFacultad);
router.get('/etiqueta/:id',programaController.getProgramas);
router.delete('/etiqueta/:id',programaController.deletePrograma);
module.exports=router; 