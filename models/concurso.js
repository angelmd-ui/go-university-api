const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ConcursoSchema=new Schema({
    titulo:{type:String},
    descripcion:{type:String}
//     imagen:{type:String},
//     fecha:[{
//         fecha_inicio:{type:String},
//         fecha_finalizacion:{type:String}
//      }
//     ],
//    categoria:{type:String},
//    tema:{type:String}
},{collection:'concursos'},{versionKey:false});

const Concurso=mongoose.model('Concurso',ConcursoSchema);
module.exports=Concurso;


