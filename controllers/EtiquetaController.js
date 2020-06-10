const Etiqueta = require ('../models/etiqueta');

    getEtiquetas = (req,res)=>{
      Etiqueta.find({})
    //    .populate('programa',{nombre:1,photo:1,_id:0})
       .populate('programa','nombre')
       .populate('categoria','nombre')
       .exec((err,etiquetas)=>{
           if(err){
               res.status(500).send({
                   message: `Error ${err}`
               })
           }
           if(!etiquetas){
               res.status(404).send({
                   message:'No existen etiquetas'
               })
           }
           res.json({
               ok:true,
               etiqueta: etiquetas 
           })
       })
    }
    getEtiquetasFavorites = (req,res)=>{
        let querytext =  req.query.searchTags;

        if(querytext == '' || querytext == undefined){
          Etiqueta.find().limit(5)
      //    .populate('programa',{nombre:1,photo:1,_id:0})
         .populate('programa','nombre')
         .exec((err,etiquetas)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!etiquetas){
                 res.status(404).send({
                     message:'No existen etiquetas'
                 })
             }
             res.json({
                 ok:true,
                 etiqueta: etiquetas 
             })
         })
        }else{
            Etiqueta.find({titulo:{$regex:querytext,$options:'i'}})
            //    .populate('programa',{nombre:1,photo:1,_id:0})
               .populate('programa','nombre')
               .exec((err,etiquetas)=>{
                   if(err){
                       res.status(500).send({
                           message: `Error ${err}`
                       })
                   }
                   if(!etiquetas){
                       res.status(404).send({
                           message:'No existen etiquetas'
                       })
                   }
                   res.json({
                       ok:true,
                       etiqueta: etiquetas 
                   })
               })
        }
      }

    getEtiqueta = (req,res)=>{
        let {id}= req.params
        Etiqueta.findById(id,(err,etiqueta)=>{
            if(err){
                res.status(500).json({
                    message:`Error al mostrar la etiqueta ${err}`
                })
            }
            if(!etiqueta){
                res.status(404).json({
                    message:'No existe la etiqueta'
                })
            }
            res.json({
                ok:true,
                etiqueta
            })
        })
    }
    getEtiquetaProgram= async (req,res)=>{
        let querytext =  req.query.searchTags;
        let id= req.params.id_programa
        if(querytext == '' || querytext == undefined){
            Etiqueta.find({programa:{_id:id}})
            .populate('programa','nombre')
            .exec((err,etiqueta)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!etiqueta){
                    res.status(404).send({
                        message:'No existen etiquetas'
                    })
                }
                res.json({
                    etiqueta
                })
            })
        }else{
            Etiqueta.find(
                {
                    $and:[
                        {programa:{_id:id}},
                         {titulo:{$regex:querytext,$options:'i'}}
                        ]
                }
                )
            .populate('programa','nombre')
            .exec((err, etiqueta)=>{
                if(err){
                    return  res.status(500).send({
                        message: `Error ${err}`
                    })
                ;}
                if(!etiqueta){
                  return  res.status(404).send({
                        message:'No existen etiquetas'
                    })
                };

               
                    res.json({
                        etiqueta
                    })
               
              
               
               
            })
          
         
        }
  
    }
    getEtiquetaCategory= async (req,res)=>{
        let querytext =  req.query.searchTags;
        let id= req.params.id_categoria
        if(querytext == '' || querytext == undefined){
            Etiqueta.find({categoria:{_id:id}})
            .populate('categoria','nombre')
            .exec((err,etiqueta)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!etiqueta){
                    res.status(404).send({
                        message:'No existen etiquetas'
                    })
                }
                res.json({
                    etiqueta
                })
            })
        }else{
            Etiqueta.find(
                {
                    $and:[
                        {categoria:{_id:id}},
                         {titulo:{$regex:querytext,$options:'i'}}
                        ]
                }
                )
            .populate('categoria','nombre')
            .exec((err, etiqueta)=>{
                if(err){
                    return  res.status(500).send({
                        message: `Error ${err}`
                    })
                ;}
                if(!etiqueta){
                  return  res.status(404).send({
                        message:'No existen etiquetas'
                    })
                };

               
                    res.json({
                        etiqueta
                    })
               
              
               
               
            })
          
         
        }
  
    }

    getEtiquetaProgramTema=  (req,res)=>{
        let querytext =  req.query.searchTags;
        let id_programa = req.params.id_programa
        let id_tema= req.params.id_categoria
        if(querytext == '' || querytext == undefined){
            if(id_tema == 'all' || id_tema == null  ){
                Etiqueta.find({programa:{_id:id_programa}})
                .populate('programa','nombre')
                .populate('categoria','nombre')
                .exec((err,etiqueta)=>{
                    if(err){
                        res.status(500).send({
                            message: `Error ${err}`
                        })
                    }
                    if(!etiqueta){
                        res.status(404).send({
                            message:'No existen etiquetas'
                        })
                    }
                    res.json({
                        etiqueta
                    })
                })
            }else{
                Etiqueta.find({programa:{_id:id_programa},categoria:{_id:id_tema}})
                .populate('programa','nombre')
                .populate('categoria','nombre')
                .exec((err,etiqueta)=>{
                    if(err){
                        res.status(500).send({
                            message: `Error ${err}`
                        })
                    }
                    if(!etiqueta){
                        res.status(404).send({
                            message:'No existen etiquetas'
                        })
                    }
                    res.json({
                        etiqueta
                    })
                })
            }
          
        }else{

            if(id_tema == 'all' || id_tema == null){ 
            Etiqueta.find(
                {
                    $and:[
                        {programa:{_id:id_programa}},
                         {titulo:{$regex:querytext,$options:'i'}}
                        ]
                }
                )
            .populate('programa','nombre')
            .populate('categoria','nombre')
            .exec((err, etiqueta)=>{
                if(err){
                    return  res.status(500).send({
                        message: `Error ${err}`
                    })
                ;}
                if(!etiqueta){
                  return  res.status(404).send({
                        message:'No existen etiquetas'
                    })
                };

               
                    res.json({
                        etiqueta
                    })
               
              
               
               
            })

        }else{
            Etiqueta.find(
                {
                    $and:[
                        {programa:{_id:id_programa},categoria:{_id:id_tema}},
                         {titulo:{$regex:querytext,$options:'i'}}
                        ]
                }
                )
            .populate('programa','nombre')
            .populate('categoria','nombre')
            .exec((err, etiqueta)=>{
                if(err){
                    return  res.status(500).send({
                        message: `Error ${err}`
                    })
                ;}
                if(!etiqueta){
                  return  res.status(404).send({
                        message:'No existen etiquetas'
                    })
                };

               
                    res.json({
                        etiqueta
                    })
               
              
               
               
            })
        }
          
         
        }
  
    }


    addTag =(req,res)=>{
        const body = req.body;
      
        const tag= new Etiqueta({
        
         programa:body.id_programa,
         categoria:body.id_categoria,
       
         titulo:body.titulo,
         descripcion:body.description,
         icono:body.icono
        });
        tag.save((err,tags)=>{
          if(err){
              res.status(500).send({
                  message:`Error ${err}`
              })
          }
          res.send(tags);
        }) 
    },
    deleteEtiqueta=(req,res)=>{
        let {id}=req.params; 
        Etiqueta.findByIdAndDelete(id,(err)=>{
            if(err){
                res.status(500).json({
                    message:`Error al realizar la petición ${err}`
                })
            }else{
                res.status(200).json({
                    message:`La etiqueta ${id} ha sido eliminada con exito`
                })
            }
        })
    }
    // updateCategoria:(req,res)=>{
    //     let {id}=req.params;
    //     let update=req.body;
    //     Categoria.findByIdAndUpdate(id,update,{new:true},(err,categoriaUpdated)=>{
    //         if(err){
    //             res.status(500).json({
    //                 message:`Error al realizar la petición ${err}`
    //             })
    //         }
    //         res.status(200).json({
    //             categoria:categoriaUpdated
    //         })
    //     })
    // }

    module.exports={
        getEtiquetas,
        getEtiqueta,
        addTag,
        deleteEtiqueta,
        getEtiquetaProgram,
        getEtiquetaProgramTema,
        getEtiquetasFavorites,
        getEtiquetaCategory
    }
