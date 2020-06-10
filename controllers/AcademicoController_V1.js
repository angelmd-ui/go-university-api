const Servicio = require( '../models/servicio');
const Trabajo = require('../models/trabajo')

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
     .populate('usuario','username')
     .populate({ path: 'services.trabajo' })
     //.populate({ path: 'services.area' })
    
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
 
    Servicio.find( { services: 
      { 
        $elemMatch: { trabajo:{ _id:id_work } } 
       } })
       .populate([{path: 'usuario'},{path: 'services.trabajo',populate:{path:'area' }}])
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
           
         
           for(const t in service){
            for(const i in service[t].services){
                for(const r in service[t].services[i].trabajo){
                console.log(service[t].services[i].trabajo[r])
                }
           }
           }
           res.json(service)
       })
  };
  if(id_work === 'all' && id_area !=='all'){
  
    Servicio.find( { services: 
        { 
          $elemMatch: {trabajo:{area:{_id:id_area} } } 
         } })
         .populate([{path: 'usuario'},{path: 'services.trabajo',populate:{path:'area' }}])
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
  if(id_work !== 'all' && id_area !=='all'){
    Servicio.find( { services: 
      { 
        $elemMatch: {trabajo:{ _id:id_work,area:{_id:id_area} } } 
       } })
       .populate([{path: 'usuario'},{path: 'services.trabajo',populate:{path:'area' }}])
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


    Servicio.find({usuario:{_id:id}})
    .limit(1)
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
      
     
     if(service.length == 0){
        servicioData = new Servicio({
            usuario:body.usuario,
            photo:body.photo,
            contacto:{
                tel:body.tel,
                direccion:body.direccion,
                correo:body.correo   
            },
            services:[{
              titulo:body.titulo,
              descripcion:body.descripcion,
              //area:body.area,
              trabajo:body.trabajo,
              potho:url
       
          }],
            biografia:body.biografia,
            ranking:body.ranking,
            status:true
      
          })
       
          servicioData.save((err,serv)=>{
            if(err){
                res.status(500).send({
                    message:`Error ${err}`
                })
            }
            res.send(serv);
          }) 
        }else{
          
    
               
     
    
                const dato = {
             titulo:body.titulo,
              descripcion:body.descripcion,
              trabajo:body.trabajo,
              potho:url
                }
    
                for(const t in service){
                  
                   const dt = service[t].services
                   dt.push(dato)
    
                   service[t].save((err,serv)=>{
                    if(err){
                        res.status(500).send({
                            message:`Error ${err}`
                        })
                    }
                    res.send(serv);
                  })
                     
             
                }
        }
    
      

          
            
          
           
           
    
       
       
        

    
 })

   
 
  
  
    
  
   

   
    


  }

module.exports={
  addServicio,
  getServicioAreaTrabajo,
  getServices,
  getServiceUser,
}
