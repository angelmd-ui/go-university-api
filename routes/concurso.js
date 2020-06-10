const express=require('express');
const concursoController= require('../controllers/ConcursoController');
const router=express.Router();
const {isAuthenticated,hasRole} = require('../auth')

router.get('/concursos',concursoController.getConcursos);
router.post('/concurso/add',isAuthenticated,concursoController.newConcurso);
router.get('/concurso/edit/:id',concursoController.getConcurso);
router.delete('/concurso/delete/:id',concursoController.deleteConcurso);
router.put('/concurso/update/:id',concursoController.updateConcurso);

module.exports=router;
