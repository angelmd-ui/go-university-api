const {Schema,model} =  require('mongoose');
const AreaSchema = new Schema({
    nombre:{type:String},
    icono:{type:String},
    descripcion:{type:String}
},{versionKey:false})

const Area = model('Area',AreaSchema);
module.exports = Area;