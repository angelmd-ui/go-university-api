const Registro =require( '../models/registro');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
require('../config/cloudinaryConfig_v_2.js')


    getRegistros=(req,res)=>{
      Registro.find({})
       .populate('usuario')
       .populate('programa')
       .populate('categoria')
       .populate('etiqueta')
       .exec((err,registros)=>{
           if(err){
               res.status(500).send({
                   message: `Error ${err}`
               })
           }
           if(!registros){
               res.status(404).send({
                   message:'No existen registros'
               })
           }
           res.json(registros )
       })
    },

    /*REGISTRO BY CATEGORIA*/
    getRegistrosByCategory=(req,res)=>{
        let id_categoria = req.params.id_categoria
        let id_programa = req.params.id_programa
        let id_etiqueta = req.params.id_etiqueta

        if(id_etiqueta === 'all' & id_programa !=='all'){
            Registro.find({categoria:{_id:id_categoria},programa:{_id:id_programa}})
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            })
           
        }
        else if(id_programa === 'all' & id_etiqueta !== 'all'){
            Registro.find({categoria:{_id:id_categoria},etiqueta:{_id:id_etiqueta}})
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            })
        }else{
            Registro.find({categoria:{_id:id_categoria}})
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            }) 
        }

   
      },
    getRegistrosItem=(req,res)=>{
        let id_programa = req.params.id_programa
        Registro.find({programa:{_id:id_programa}})
         .populate('usuario')
         .populate('programa')
         .populate('categoria')
         .populate('etiqueta')
         .exec((err,registros)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!registros){
                 res.status(404).send({
                     message:'No existen registros'
                 })
             }
             res.json(registros )
         })
      },

    getRegistrosLated=async(req,res,)=>{
      
      
        Registro.find({}).limit(5)
        .populate('usuario')
        .populate('programa')
        .populate('categoria')
        .populate('etiqueta')
        .exec((err,registros)=>{
            if(err){
                res.status(500).send({
                    message: `Error ${err}`
                })
            }
            if(!registros){
                res.status(404).send({
                    message:'No existen registros'
                })
            }else{
                res.json( registros )
            }
            
        })
    
      },

    /*getProgramaEtiqeutas*/
    getRegistroProgram=(req,res)=>{
        let id_programa = req.params.id_programa
        let id_etiqueta =  req.params.id_etiqueta

        if((id_etiqueta === 'all' & id_programa === 'all' )){
            Registro.find()
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            })
        }

        else if(id_programa === 'all' ){
            Registro.find({etiqueta:{_id:id_etiqueta}})
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            })
        }

        
       else if(id_etiqueta === 'all' ){
            Registro.find({programa:{_id:id_programa}})
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            })
        }else{
            Registro.find({programa:{_id:id_programa},etiqueta:{_id:id_etiqueta}})
            .populate('usuario')
            .populate('programa')
            .populate('categoria')
            .populate('etiqueta')
            .exec((err,registros)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!registros){
                    res.status(404).send({
                        message:'No existen registros'
                    })
                }
                res.json(registros )
            }) 
        }
      
      },


    getRegistro=(req,res)=>{
        let {id}= req.params
        Registro.findById(id,(err,registro)=>{
            if(err){
                res.status(500).json({
                    message:`Error al mostrar el registro ${err}`
                })
            }
            if(!registro){
                res.status(404).json({
                    message:'No existe el registro'
                })
            }
            res.json({
                ok:true,
                registro 
            })
        })
    }

  /* Add */
  
  addRegister= async (req,res)=>{
     
    let result;
    let body = req.body;
    let fileType = req.file.mimetype.split("/");

    
    if(fileType[0] == 'video'){
        const fileUpload = await cloudinary.uploader.upload(req.file.path,{ resource_type: "video" ,chunk_size: 100000000})
        result = fileUpload
    }else{
        const fileUpload = await cloudinary.uploader.upload(req.file.path)
        result = fileUpload
    }
    
      
        const register= new Registro({
         categoria:body.id_categoria,
         programa:body.id_programa,
         etiqueta:body.id_etiqueta,
         titulo:body.titulo,
         descripcion:body.descripcion,
         photo: result.secure_url,
        });
        register.save((err,post)=>{
          if(err){
              res.status(500).send({
                  message:`Error ${err}`
              })
          }
          res.send(post);
        }) 
      
     
  }

//Comentario
  registroComentario= (req,res) =>{
    const body   = req.body;
    let id = req.params.id;
    Registro.findById(id,(err,post)=>{
      if(err){
          res.status(500).send({
              message:`Error en el server ${err}`
          })
      }
      if(!post){
          res.status(404).send({
              message:'No existen post'
          })
      }else{
          post.comentario.push(body);
          post.save((err,comment)=>{
              if(err){
                  res.status(500).send({
                      message:`Error ${err}`
                  })
              }
              Registro.findById(comment._id)
                   .populate('comentario.author','username')
                   .exec(function (err, resPost) {
                      if (err) return handleError(err);
                      res.send({resPost});
                      // prints "The author is Ian Fleming"
                    });
              
            }) 
         
      }                            
  })  
  }
//getComentario
  getRegistrosComents=(req,res)=>{
      let id = req.params.id
    Registro.findById({_id:id})
     .populate({path:'comentario.author',select:'username'})
     
     .exec((err,registro)=>{
         if(err){
             res.status(500).send({
                 message: `Error ${err}`
             })
         }
         if(!registro){
             res.status(404).send({
                 message:'No existen registros'
             })
         }
         res.json(registro.comentario )
     })
  }

    deleteRegistro=(req,res)=>{
        let {id}=req.params; 
        Registro.findByIdAndDelete(id,(err)=>{
            if(err){
                res.status(500).json({
                    message:`Error al realizar la petición ${err}`
                })
            }else{
                res.status(200).json({
                    message:`El registro ${id} ha sido eliminado con exito`
                })
            }
        })
    }

    module.exports={
        getRegistros,
        getRegistro,
        addRegister,
        deleteRegistro,
        getRegistrosLated,
        getRegistrosItem,
        getRegistroProgram,
        getRegistrosByCategory,
        registroComentario,
        getRegistrosComents
    }
