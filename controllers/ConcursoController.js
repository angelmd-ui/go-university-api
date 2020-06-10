
// imports models concurso

const Concurso=require('../models/concurso');

getConcursos=(req,res)=>{
    Concurso.find({},(err,concursos)=>{
        if(err){
            res.status(500).send({
                message:`Error en el server ${err}`
            })
        }
        if(!concursos){
            res.status(404).send({
                message:'No existen concursos'
            })
        }else{
            res.status(200).send({
                concursos
            })
        }                            
    })     
};

getConcurso=(req,res)=>{
    let {id}=req.params;
    Concurso.findById(id,(err,concurso)=>{
       if(err){
           res.status(500).json({
               message:`Error al mostrar el concurso ${err}`
           })
       }
       if(!concurso){
           res.status(404).json({
               message:'No existe el concurso'
           })
       }else{
           res.status(200).json({
               concurso
           })
       }
    })
}

newConcurso=(req,res)=>{
    concurso=new Concurso({
        titulo:req.body.titulo,
        descripcion:req.body.descripcion
        // imagen:req.body.imagen,
        // fecha:[{
        //     fecha_inicio:req.body.fecha_inicio,
        //     fecha_finalizacion:req.body.fecha_finalizacion,
        // }],
        // categoria:req.body.categoria,
        // tema:req.body.tema
    })
    concurso.save((err,concurso)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        else{
            res.status(200).send({concurso})
        }
    })
};

deleteConcurso=(req,res)=>{
    let {id}=req.params;
    Concurso.findById(id,(err)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        Concurso.deleteOne(err=>{
            if(err){
                res.status(500).json({
                    message:`Error al eliminar el concurso ${err}`
                })
            }else{
                res.status(200).json({
                    message:'El concurso ha sido eliminado con exito'
                })
            }
        })
    })
};

updateConcurso=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Concurso.findByIdAndUpdate(id,update,{new:true},(err,concursoUpdated)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        res.status(200).json({
            concurso:concursoUpdated
        })
    })
}

module.exports={
    getConcursos,
    newConcurso,
    getConcurso,
    deleteConcurso,
    updateConcurso
}