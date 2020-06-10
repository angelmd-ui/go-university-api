
//import models Usuario
const Usuario=require('../models/usuario');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();
require('../config/cloudinaryConfig')

const signToken = (_id) =>{
  return jwt.sign({ _id },'mi-scret',{
      expiresIn:60 * 60 * 24 * 365,
  })
}

getUsuarios=(req,res)=>{
    // req.body.password = bcrypt.hash(req.body.password,10);
    Usuario.find()
    .populate('concurso')
    .exec((err,usuarios)=>{
        if(err){
            res.status(500).send({
                message:`No existen usuarios ${err}`
            })
        }
        if(!usuarios){
            res.status(404).send({
                message:'NO existen usuarios'
            })
        }
        res.status(200).send({usuarios})
    })
};

getUsuario=(req,res)=>{
    let {id}=req.params;
    Usuario.findById(id,(err,usuario)=>{
       if(err){
           res.status(500).json({
               message:`Error al mostrar el usuario ${err}`
           })
       }
       if(!usuario){
           res.status(404).json({
               message:'No existe el usuario'
           })
       }else{
           res.json(usuario)
       }
    })
};

newUsuario=(req,res)=>{
   const { name, username,password } = req.body
    crypto.randomBytes(16, (err,salt)=>{
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt,10000, 64, 'sha1', (err, key)=>{
            const encryptePasssword = key.toString('base64')
            Usuario.findOne({ username }).exec()
            .then(user =>{
                if(user){
                    return res.send('user exist now')
                }
                Usuario.create({
                    name,
                    username,
                    password: encryptePasssword,
                    salt: newSalt
                }).then(() =>{
                    res.send('usuario creado')
                })
            })
        })
    })

};

login=(req,res)=>{
    const { username,password } = req.body
    Usuario.findOne({ username }).exec()
    .then(user =>{
        if(!user){
            return res.send('usuario no existe')
        }

        crypto.pbkdf2(password, user.salt,10000, 64, 'sha1', (err, key)=>{
            const encryptePasssword = key.toString('base64')
            if(user.password === encryptePasssword){
                const token = signToken(user._id)
                return res.send({ token })
            }
            return res.send('usuario no existe')
        })
    })

}

deleteUsuario=(req,res)=>{
    let {id}=req.params;
    Usuario.findById(id,(err)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        Usuario.deleteOne(err=>{
            if(err){
                res.status(500).json({
                    message:`Error al eliminar el usuario ${err}`
                })
            }else{
                res.status(200).json({
                    message:'El usuario ha sido eliminado con exito'
                })
            }
        })
    })
};

updateUsuario=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Usuario.findByIdAndUpdate(id,update,{new:true},(err,usuarioUpdated)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        res.json(usuarioUpdated)
    })
}

module.exports={
    getUsuarios,
    getUsuario,
    newUsuario,
    deleteUsuario,
    updateUsuario,
    login
}