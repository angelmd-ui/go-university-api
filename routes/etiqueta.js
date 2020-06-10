const express = require('express');
const etiquetaController = require('../controllers/EtiquetaController');
/*============================================
    Importamos el archivo de authentication
=========================================== */
//import auth from '../middlewares/auth';
// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/etiqueta',etiquetaController.addTag)
router.get('/etiquetas',etiquetaController.getEtiquetas);
router.get('/etiquetas/favorites',etiquetaController.getEtiquetasFavorites);
router.get('/etiqueta/programa/:id_programa',etiquetaController.getEtiquetaProgram);
router.get('/etiqueta/categoria/:id_categoria',etiquetaController.getEtiquetaCategory);
router.get('/etiqueta/:id_programa/:id_categoria',etiquetaController.getEtiquetaProgramTema);
router.get('/etiqueta/:id',etiquetaController.getEtiqueta);
router.delete('/etiqueta/:id',etiquetaController.deleteEtiqueta);
// router.put('/usuario/:id',[auth.verificaToken,auth.verificaAdmin_Role],usuarioController.updateUsuario);
module.exports=router; 