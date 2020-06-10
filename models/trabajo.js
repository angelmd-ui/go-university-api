const {Schema,model} =  require('mongoose');
const TrabajoSchema = new Schema({
    area:{type: Schema.Types.ObjectId,ref:'Area'},
    nombre:{type:String},
    icono:{type:String},
    descripcion:{type:String}
},{versionKey:false})

const Trabajo = model('Trabajo',TrabajoSchema);
module.exports = Trabajo;