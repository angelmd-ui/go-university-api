const Post = require ('../models/post');

getPosts=(req,res)=>{
  Post.find()
  .populate('responses.author','username')
  .exec(function (err, post){
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!post){
        res.status(404).send({
            message:'No existen categorias'
        })
    }
    res.json(post)
  })
}

getPostAreaTrabajo = (req,res)=>{

    let id_area = req.params.id_area
    let id_work = req.params.id_work
  
    if(id_area === 'all' & id_work !== 'all'){
     
      Post.find( { trabajo:{_id:id_work} })
         .populate('usuario','username')
         .populate('trabajo', 'nombre' )
         .exec((err,post)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!post){
                 res.status(404).send({
                     message:'No existen etiquetas'
                 })
             }
             res.json(post)
         })
    };
    if(id_work === 'all' && id_area !=='all'){
      Post.find({area:{_id:id_area}})
         .populate('usuario','username')
         .populate( 'area','nombre')
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
      Post.find({area:{_id:id_area},trabajo:{_id:id_work}})
         .populate('usuario','username')
         .populate('trabajo', 'nombre' )
         .populate( 'area','nombre')
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

addPost=(req,res)=>{
    const body = req.body;
  
    const poster= new Post({
      titulo:body.titulo,
      usuario:body.usuario,
      area:body.area,
      trabajo:body.trabajo
    });
    poster.save((err,post)=>{
      if(err){
          res.status(500).send({
              message:`Error ${err}`
          })
      }
      res.send(post);
    }) 
}



postComentario= (req,res) =>{
  const body   = req.body;
  let id = req.params.id;
  Post.findById(id,(err,post)=>{
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
        post.responses.push(body);
        post.save((err,comment)=>{
            if(err){
                res.status(500).send({
                    message:`Error ${err}`
                })
            }
            Post.findById(comment._id)
                 .populate('responses.author','username')
                 .exec(function (err, resPost) {
                    if (err) return handleError(err);
                    res.send({resPost});
                    // prints "The author is Ian Fleming"
                  });
            
          }) 
       
    }                            
})  
}

module.exports={
    addPost,
    getPosts,
    postComentario,
    getPostAreaTrabajo
}