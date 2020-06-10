const Area = require ('../models//area');

getAreas=(req,res)=>{
  Area.find({},(err,area)=>{
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
  
    res.json(area)
  })
}

addArea=(req,res)=>{
    const body = req.body;
  
    const area= new Area({
      nombre:body.nombre,
      descripcion:body.descripcion,
      icono:body.icono
    });
    area.save((err,area)=>{
      if(err){
          res.status(500).send({
              message:`Error ${err}`
          })
      }
      res.send(area);
    }) 
}



module.exports = {
  addArea,
  getAreas
}