const Programa = require('../models/programa');

    getProgramas = async (req,res)=>{
        let querytext =  req.query.searchProgram;
        
        
        
        if(querytext == '' || querytext == undefined){
            Programa.find((err,programas)=>{
                if(err){
                    res.status(500).send({
                        message: `Error ${err}`
                    })
                }
                if(!programas){
                    res.status(404).send({
                        message:'No existen programas'
                    })
                }
                res.json({
                    ok:true,
                    programa: programas 
                })
     
            })
        }else{
          
          
      

              const programData = await Programa.search(querytext)
               const result = programData
               res.json({
                programa:result
               }
               )   
             
     
           
        }
    
    }
    getPrograma = (req,res)=>{
        let {id}= req.params
        Programa.findById(id,(err,programa)=>{
            if(err){
                res.status(500).json({
                    message:`Error al mostrar el programa ${err}`
                })
            }
            if(!programa){
                res.status(404).json({
                    message:'No existe el programa'
                })
            }
            res.json({
                ok:true,
                programa
            })
        })
    }

    addPrograma=(req,res)=>{
        const body = req.body;
        const programa= new Programa({
            nombre:body.nombre,
            descripcion:body.descripcion,
            facultad:body.facultad,
            icon:body.icon
            
          });

          programa.save((err,programa)=>{
            if(err){
                res.status(500).send({
                    message:`Error ${err}`
                })
            }
            res.send(programa);

         })
      
       /* const categoria= new News({
          nombre:body.nombre,
          descripcion:body.descripcion,
          

            
         //photo:req.file.filename
        });
        categoria.save((err,category)=>{
          if(err){
              res.status(500).send({
                  message:`Error ${err}`
              })
          }

         category.programas.push(body)
         categoria.save((err,post)=>{
            if(err){
                res.status(500).send({
                    message:`Error ${err}`
                })
            }
            res.send(post);

         })
          
        }) 
        */
    }

    /**/
    getProgramaFacultad=(req,res)=>{

        Programa.find((err,facultad)=>{
            if(err){
                res.status(500).send({
                    message: `Error ${err}`
                })
            }
            if(!facultad){
                res.status(404).send({
                    message:'No existen programas'
                })
            }
            res.json(facultad)
 
        })
    }

    deletePrograma=(req,res)=>{
        let {id}=req.params; 
        Programa.findByIdAndDelete(id,(err)=>{
            if(err){
                res.status(500).json({
                    message:`Error al realizar la petición ${err}`
                })
            }else{
                res.status(200).json({
                    message:`El programa ${id} ha sido eliminada con exito`
                })
            }
        })
    }

    module.exports={
        getProgramas,
        getPrograma,
        addPrograma,
        deletePrograma,
        getProgramaFacultad


    }
