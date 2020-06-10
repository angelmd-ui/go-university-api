const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsuarioSchema = new Schema({
    nombre: { type: String },
    username: { type: String },
    password:{type:String,maxlength:255},
    salt:{type:String},
    contacto:{
      tel:{type:Number},
      direccion:{type:String},
      correo:{type:String}
      
  },
  biografia:{type:String},
  role:{type:String, default: 'user'},
  statuService:{type:Boolean,default:false},
  photo:{type:String}
},{versionKey:false})

// exports models
const Usuario=mongoose.model('Usuario',UsuarioSchema);
module.exports=Usuario;


