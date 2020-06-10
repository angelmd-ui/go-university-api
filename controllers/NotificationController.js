
const  push = require('./modules/push')

const Subscribedb = require('../models/notification') 
const vapid = require('../vapid.json')

const webpush = require('web-push')

webpush.setVapidDetails(
    'mailto:shurakd8@gmail.com',
    vapid.publicKey,
    vapid.privateKey
  );

subscribe = (req,res) =>{
   const suscripcion = req.body;
   console.log(suscripcion);
    
   //push.addSubscripcion(suscripcion)
   Subscribedb.find({endpoint:suscripcion.endpoint},(err,docs)=>{
  

    if(docs.length === 0){
        const subscribe = new Subscribedb(suscripcion)
        subscribe.save((err,doc)=>{
          
            res.json(doc)
        
           })
    }
   

   })

   
  

}

getKey = (req,res) =>{
    const key = push.getKeying();
 
    res.send(key)
   
}

pushKey = (req,res) =>{
    const notificacion = {
        titulo:req.body.titulo,
        cuerpo:req.body.cuerpo,
        image:req.body.image,
        usuario:req.body.usuario
    }
   //push.sendPush(notificacion)

    Subscribedb.find((err,subs)=>{
         subs.map(subscribtion=>{
            webpush.sendNotification(subscribtion,JSON.stringify(notificacion))
           // res.json(subs)
           })
        
          
           
        
           
    })
 

   
}



module.exports={
    subscribe,
    getKey,
    pushKey
}