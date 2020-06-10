const {Schema,model} =  require('mongoose');
const ServicioSchema = new Schema({
   usuario:{type: Schema.Types.ObjectId,ref:'Usuario'},
   titulo:{type:String},
   descripcion:{type:String},
       //calificacion:{type:Number,default:0},
   area:{type: Schema.Types.ObjectId,ref:'Area'},
   trabajo:{type: Schema.Types.ObjectId,ref:'Trabajo'},
   potho:[],
   status:{type:String,default:true},
   ranking:{type:Number,default:0},
   status:{type:Boolean,default:false}
},{versionKey:false})

const Servicio = model('Servicio',ServicioSchema);
module.exports = Servicio;