const News =require('../models/news.js');

getNews=(req,res)=>{
  News.find({},(err,news)=>{
    if(err){
        res.status(500).send({
            message:`Error en el server ${err}`
        })
    }
    if(!news){
        res.status(404).send({
            message:'No existen concursos'
        })
    }else{
        res.status(200).send({
            news
        })
    }                            
})  
};
getItemNews= async (req,res)=>{
    let id = req.params.id;
    let newsModel = {data:{}}
    const news = await News.findById(id);

      if(news){
        news.views = news.views + 1; //views
        newsModel.data = news;
        await news.save();
         res.status(200).send({
             news
         });
      }else{
          res.status(404).send({
            message:'No existen concursos'
        })
      }                            
  
  };
addNews= (req,res)=>{
    const body = req.body;
  
    const news= new News({
     title:body.title,
     description:body.description,
     topic:body.topic,
     fileRecord:req.file.filename
    });
    news.save((err,post)=>{
      if(err){
          res.status(500).send({
              message:`Error ${err}`
          })
      }
      res.send({news:post});
    }) 
  
  };

  addNewsComments = (req,res)=>{
    const body   = req.body;
    let id = req.params.id;
    News.findById(id,(err,news)=>{
      if(err){
          res.status(500).send({
              message:`Error en el server ${err}`
          })
      }
      if(!news){
          res.status(404).send({
              message:'No existen concursos'
          })
      }else{
         news.comments.push(body);
          news.save((err,post)=>{
              if(err){
                  res.status(500).send({
                      message:`Error ${err}`
                  })
              }
              News.findById(post._id)
                   .populate('comments.author','username')
                   .exec(function (err, story) {
                      if (err) return handleError(err);
                      res.send({story});
                      // prints "The author is Ian Fleming"
                    });
              
            }) 
         
      }                            
  })  
    
       
  },
  getnewsComments =(req,res) =>{
    
    let id = req.params.id;
    News.findById(id)
    .populate('comments.author','username')
    .exec(function (err, story) {
      if (err) return handleError(err);
      res.send({story});
      // prints "The author is Ian Fleming"
    });
  
    
  }

module.exports={
    getNews,
    getItemNews,
    addNews,
    addNewsComments,
    getnewsComments
}

