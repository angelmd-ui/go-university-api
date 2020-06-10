const express=require('express');
const usuarioController= require('../controllers/UsuarioController');
const router=express.Router();

router.get('/usuarios',usuarioController.getUsuarios);
router.post('/register',usuarioController.newUsuario);
router.post('/login',usuarioController.login);

router.get('/usuario/:id',usuarioController.getUsuario);
router.delete('/usuario/:id',usuarioController.deleteUsuario);
router.put('/usuario/:id',usuarioController.updateUsuario);

module.exports=router;
