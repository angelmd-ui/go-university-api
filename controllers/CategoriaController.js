const Categoria = require( '../models/categoria');
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

    getCategorias=(req,res)=>{
      Categoria.find({},(err,categorias)=>{
        if(err){
            res.status(500).send({
                message: `Error ${err}`
            })
        }
        if(!categorias){
            res.status(404).send({
                message:'No existen categorias'
            })
        }
        res.json({
            ok:true,
            categoria: categorias
        })
      })
    }
    getCategoria=(req,res)=>{
        let {id}= req.params
        Categoria.findById(id,(err,categoria)=>{
            if(err){
                res.status(500).json({
                    message:`Error al mostrar la categoria ${err}`
                })
            }
            if(!categoria){
                res.status(404).json({
                    message:'No existe la categoria'
                })
            }
            res.json({
                ok:true,
                categoria 
            })
        })
    }

    addCategory=(req,res)=>{
        const body = req.body;
      
        const categoria= new Categoria({
          nombre:body.nombre,
          descripcion:body.descripcion,
          icono:body.icono
            
         //photo:req.file.filename
        });
        categoria.save((err,post)=>{
          if(err){
              res.status(500).send({
                  message:`Error ${err}`
              })
          }
          res.send(post);
        }) 
    }
    deleteCategoria=(req,res)=>{
        let {id}=req.params; 
        Categoria.findByIdAndDelete(id,(err)=>{
            if(err){
                res.status(500).json({
                    message:`Error al realizar la petición ${err}`
                })
            }else{
                res.status(200).json({
                    message:`La categoria ${id} ha sido eliminada con exito`
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
        getCategorias,
        getCategoria,
        addCategory,
        deleteCategoria
    }