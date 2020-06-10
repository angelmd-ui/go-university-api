
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ProgresoSchema=new Schema({
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
    concurso:{
        type:Schema.Types.ObjectId,
        ref:'Concurso'
    },
    evidencia:[{
      titulo:{type:String},
      image:{type:String},
      raiting:{type:Number,default:1},
      views:{type:Number,default:0}
    }]
},{versionKey:false});

// exports models
const Progreso=mongoose.model('Progreso',ProgresoSchema);
module.exports=Progreso;