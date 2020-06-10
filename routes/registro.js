const express = require('express');
const registroController = require('../controllers/RegistroController');
const upload = require('../controllers/upload_v2');
/*============================================
    Importamos el archivo de authentication
=========================================== */
//import auth from '../middlewares/auth';
// Importamos el archivo para verficar rol admin;
const router=express.Router();
router.post('/registro',upload,registroController.addRegister);
router.post('/registro/:id/comentario',registroController.registroComentario);
router.get('/registro/:id/comentarios',registroController.getRegistrosComents);
router.get('/registros',/*[auth.verificaToken,auth.verificaAdmin_Role]*/registroController.getRegistros);
router.get('/registros/lasted',/*[auth.verificaToken,auth.verificaAdmin_Role]*/registroController.getRegistrosLated);
router.get('/registros/:id_programa',registroController.getRegistrosItem);
router.get('/registros/:id_programa/:id_etiqueta',registroController.getRegistroProgram);
router.get('/registro/:id',/*[auth.verificaToken,auth.verificaAdmin_Role]*/registroController.getRegistro);
router.get('/registro/categoria/:id_categoria/programa/:id_programa/etiqueta/:id_etiqueta',/*[auth.verificaToken,auth.verificaAdmin_Role]*/registroController.getRegistrosByCategory);
router.delete('/registro/:id',/*[auth.verificaToken,auth.verificaAdmin_Role],*/registroController.deleteRegistro);
module.exports=router; 