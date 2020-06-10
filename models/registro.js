const {Schema,model} =  require('mongoose');
const commentsSchema = new Schema({
    comentario:{
        type:String
    },
  
    author:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
  
      }
  });
const RegistroSchema = new Schema({
    //usuario:{type: Schema.Types.ObjectId,ref:'Usuario'},
    programa: {type:Schema.Types.ObjectId,ref:'Programa'},
    categoria: {type:Schema.Types.ObjectId,ref:'Categoria'},
    etiqueta: {type:Schema.Types.ObjectId,ref:'Etiqueta'},
    titulo:{type:String},
    descripcion:{type:String},
    photo:{type:String},
    visita: {type:Number,default:0},
    like:{type:Number,default:0},
    comentario:[commentsSchema]
    
},{versionKey:false})

const Registro = model('Registro',RegistroSchema);
module.exports = Registro;