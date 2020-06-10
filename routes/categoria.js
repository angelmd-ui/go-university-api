const express=require('express');
const categoriaController = require('../controllers/CategoriaController') ;
/*============================================
    Importamos el archivo de authentication
=========================================== */

// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/categoria',categoriaController.addCategory)
router.get('/categorias',categoriaController.getCategorias);
router.get('/categoria/:id',categoriaController.getCategoria);
router.delete('/categoria/:id',categoriaController.deleteCategoria);
// router.put('/usuario/:id',[auth.verificaToken,auth.verificaAdmin_Role],usuarioController.updateUsuario);
module.exports=router; 