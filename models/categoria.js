const {Schema,model} =  require('mongoose');
const CategoriaSchema = new Schema({
    nombre:{type:String},
    icono:{type:String},
    descripcion:{type:String}
},{versionKey:false})

const Categoria = model('Categoria',CategoriaSchema);
module.exports = Categoria;