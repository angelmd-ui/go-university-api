const Trabajo = require ('../models/trabajo');

getTrabajos=(req,res)=>{
  Trabajo.find({},(err,works)=>{
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!works){
        res.status(404).send({
            message:'No existen categorias'
        })
    }
    res.json(works)
  })
}
getTrabajosByAreas=(req,res)=>{

  Trabajo.find({area:{_id:req.params.id_area}},(err,works)=>{
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!works){
        res.status(404).send({
            message:'No existen categorias'
        })
    }
    res.json(works)
  })
}

addTrabajo=(req,res)=>{
    const body = req.body;
  
    const trabajo= new Trabajo({
      area:body.area,
      nombre:body.nombre,
      descripcion:body.descripcion,
      icono:body.icono
    });
    trabajo.save((err,work)=>{
      if(err){
          res.status(500).send({
              message:`Error ${err}`
          })
      }
      res.send(work);
    }) 
}



module.exports = {
  addTrabajo,
  getTrabajos,
  getTrabajosByAreas
}