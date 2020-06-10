const express=require('express');
const postController = require('../controllers/PostController') ;
/*============================================
    Importamos el archivo de authentication
=========================================== */

// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/service/post',postController.addPost),
router.post('/service/post/:id/comentario',postController.postComentario)
router.get('/service/posts',postController.getPosts)
router.get('/service/posts/:id_area/:id_work',postController.getPostAreaTrabajo)


module.exports=router; 