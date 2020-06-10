const express=require('express');
const router=express.Router();

const concursoRouter=require('./concurso');
const progresoRouter=require('./progreso');
const usuarioRouter=require('./usuario');


const NotifyRouter=require('./notifications');

const categoriaRouter = require('./categoria')
const etiquetaRouter = require('./etiqueta')
const registroRouter = require('./registro')
const programaRouter = require('./programa')
const servicioRouter = require('./academico')
const areaRouter = require('./area')
const trabajoRouter = require('./trabajo')
const postRouter = require('./post')


// router.use('/concurso',concursoRouter);
router.use(concursoRouter);
router.use(progresoRouter);
router.use(usuarioRouter);


router.use(NotifyRouter);

router.use(categoriaRouter);
router.use(etiquetaRouter);
router.use(programaRouter);
router.use(registroRouter);
router.use(servicioRouter);
router.use(areaRouter);
router.use(trabajoRouter);
router.use(postRouter);


module.exports=router;