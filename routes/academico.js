const express=require('express');
const AcademicoController = require('../controllers/AcademicoController') ;
const upload = require('../controllers/upload');
/*============================================
    Importamos el archivo de authentication
=========================================== */

// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/servicio',upload,AcademicoController.addServicio)
router.get('/servicio/:id_area/:id_work',AcademicoController.getServicioAreaTrabajo)
router.get('/servicios',AcademicoController.getServices)
router.get('/servicio/usuario/active/:id_user',AcademicoController.getServiceUser)
router.get('/servicio/:id_service/usuario/perfil/:id_user',AcademicoController.getServiceByIdAndUser)


// router.put('/usuario/:id',[auth.verificaToken,auth.verificaAdmin_Role],usuarioController.updateUsuario);
module.exports=router; 