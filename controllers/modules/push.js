const fs = require('fs')

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('../../vapid.json')

const webpush = require('web-push')

webpush.setVapidDetails(
    'mailto:shurakd8@gmail.com',
    vapid.publicKey,
    vapid.privateKey
  );



const suscripciones = [] 
getKeying = () =>{
    return  urlsafeBase64.decode(vapid.publicKey);
}

addSubscripcion = ( subscripcion ) =>{
    
    suscripciones.push( subscripcion )
    //console.log(suscripciones)

    fs.writeFileSync(`${__dirname}/../../dbjson/subs-db.json`,JSON.stringify(suscripciones))
}

sendPush = (post) =>{
  suscripciones.forEach( (suscripcion,i) =>{
      webpush.sendNotification(suscripcion,JSON.stringify( post ))
  } )
}

module.exports={
    getKeying,
    addSubscripcion,
    sendPush
}