const {Schema,model} =  require('mongoose');
const textSearch = require('mongoose-partial-full-search');
const EtiquetaSchema = new Schema({
  programa: {type: Schema.Types.ObjectId, ref: 'Programa'},
  categoria: {type: Schema.Types.ObjectId, ref: 'Categoria'},
  titulo:{type:String},
  icono: {type:String},
  description: {type:String}
},{versionKey:false})

EtiquetaSchema.plugin(textSearch);
 
// add a text index to the tags array
EtiquetaSchema.index({ titulo: 'text' });

const Etiqueta = model('Etiqueta',EtiquetaSchema);
module.exports = Etiqueta;
