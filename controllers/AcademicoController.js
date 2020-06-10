const Servicio = require( '../models/servicio');
const Trabajo = require('../models/trabajo')
const mongoose = require('mongoose');

const cloudinary = require('cloudinary');
require('dotenv').config();
require('../config/cloudinaryConfig_v_2')



getServices = (req,res) =>{
  Servicio.find()
    .populate([
        {
        path: 'usuario',
       },
       {
        path: 'services.trabajo',
        populate:{
         path:'area' 
        }
       }

])
     
     
     .exec((err,service)=>{
         if(err){
             res.status(500).send({
                 message: `Error ${err}`
             })
         }
         if(!service){
             res.status(404).send({
                 message:'No existen etiquetas'
             })
         }
         
         res.json(service)
     })
}
getServiceUser = (req,res)=>{
  const id= req.params.id_user
  Servicio.find({usuario:{_id:id}})
     .populate('usuario')
     .populate([{ path: 'trabajo' },{path:'area'}])
     .exec((err,service)=>{
      if(err){
          res.status(500).json({
              message:`Error al mostrar el servicio ${err}`
          })
      }
      if(!service){
          res.status(404).json({
              message:'No existe el usuario'
          })
      }
      
      res.json(service)
  })
}
getServiceByIdAndUser = (req,res)=>{
   let { id_service,id_user } = req.params
    Servicio.find({_id:id_service},{usuario:{_id:id_user}})
       .populate('usuario')
       .populate({ path: 'trabajo' })
       .exec((err,service)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar el servicio ${err}`
            })
        }
        if(!service){
            res.status(404).json({
                message:'No existe el usuario'
            })
        }
        
        res.json(service)
    })
  }


getServicioAreaTrabajo = (req,res)=>{

  let id_area = req.params.id_area
  let id_work = req.params.id_work

  if(id_area === 'all' & id_work !== 'all'){
 
    Servicio.find({trabajo:id_work})
       .populate('trabajo')
       .populate('usuario')
       .exec((err,service)=>{
           if(err){
               res.status(500).send({
                   message: `Error ${err}`
               })
           }
           if(!service){
               res.status(404).send({
                   message:'No existen etiquetas'
               })
           }
           

           res.json(service)
       })
  };
  if(id_work === 'all' && id_area !=='all'){
//mongoose.Types.ObjectId(id_area)
  
    Servicio.find({area:{_id:id_area}})
         .populate({path:'trabajo',populate:{path:'area'}})
         .populate({path:'area'})
         .populate('usuario')
         .exec((err,service)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!service){
                 res.status(404).send({
                     message:'No existen etiquetas'
                 })
             }
           
             res.json(service)
         })
            
       
      
  };
  if(id_work !== 'all' && id_area !=='all'){
    Servicio.find({trabajo:{_id:id_work,area:{_id:id_area}}})
       .populate([{path: 'usuario'},
       {path:'trabajo',populate:{path:'area'} }
    ]
       )
       .exec((err,service)=>{
           if(err){
               res.status(500).send({
                   message: `Error ${err}`
               })
           }
           if(!service){
               res.status(404).send({
                   message:'No existen etiquetas'
               })
           }
           res.json(service)
       })
  };
  if(id_work === 'all' && id_area ==='all'){
    Servicio.find()
       .populate([{path: 'usuario'},
       {path:'trabajo',populate:{path:'area'} }
    ]
       )
       .exec((err,service)=>{
        if(err){
            res.status(500).send({
                message: `Error ${err}`
            })
        }
        if(!service){
            res.status(404).send({
                message:'No existen etiquetas'
            })
        }
        res.json(service)
       })
  }

}



addServicio= async(req,res)=>{
    const body = req.body;
    const id = body.id_user
   

   const url = []
    for(const file in req.files){
     const result = await cloudinary.uploader.upload(req.files[file].path)
      url.push(result.secure_url)
    }
    const servicio = new Servicio({
        usuario:body.usuario,
        titulo:body.titulo,
        descripcion:body.descripcion,
        area:body.area,
        trabajo:body.trabajo,
        potho:url,
        ranking:body.ranking,
        status:true
  
      })
   
      servicio.save((err,service)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        res.send(service);
      }) 

  }

module.exports={
  addServicio,
  getServicioAreaTrabajo,
  getServices,
  getServiceUser,
  getServiceByIdAndUser 
}
