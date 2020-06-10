
//imports models progreso
const Progreso=require('../models/progreso');

getProgresos=(req,res)=>{
    Progreso.find()
    // .populate('usuario')
    .populate({path:'usuario',select:'nombre'})
    // .populate({path:'usuario',select:'name'})
    .populate('concurso')
     .exec((err,progresos)=>{
        if(err){
            res.status(500).send({
                message:`Error en el server ${err}`
            })
        }
        if(!progresos){
            res.status(404).send({
                message:'No existen progresos'
            })
        }
        res.status(200).send({progresos})
    })
};

getProgreso=(req,res)=>{
    let {id}=req.params;
    Progreso.findById(id,(err,progreso)=>{
       if(err){
           res.status(500).json({
               message:`Error al mostrar el progreso ${err}`
           })
       }
       if(!progreso){
           res.status(404).json({
               message:'No existe el progreso'
           })
       }else{
           res.status(200).json({
               progreso
           })
       }
    })
};

newProgreso=(req,res)=>{
    /*progreso=new Progreso({
        usuario:req.body.usuario,
        concurso:req.body.concurso,
        evidencia:[{
            titulo:req.body.titulo,
            image:req.body.image,
            raiting:req.body.raiting
        }]
    })*/
    const {  _id } = req.user
    Progreso.create({ ...req.body, usuario: _id }).then(x => res.status(201).send(x))
   
};

deleteProgreso=(req,res)=>{
    let {id}=req.params;
    Progreso.findById(id,(err)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        Progreso.deleteOne(err=>{
            if(err){
                res.status(500).json({
                    message:`Error al eliminar el progreso ${err}`
                })
            }else{
                res.status(200).json({
                    message:'El progreso ha sido eliminado con exito'
                })
            }
        })
    })
};

updateProgreso=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Progreso.findByIdAndUpdate(id,update,{new:true},(err,progresoUpdated)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        res.status(200).json({
            usuario:progresoUpdated
        })
    })
};

module.exports={
    getProgresos,
    getProgreso,
    newProgreso,
    deleteProgreso,
    updateProgreso
}