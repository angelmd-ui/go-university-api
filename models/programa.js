const {Schema,model} =  require('mongoose');
//var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
// import uniqueValidator from 'mongoose-unique-validator';
const textSearch = require('mongoose-partial-full-search');

const FacultadSchema = new Schema({
    nombre:{type:String},
    //tipo:{type:String}, // facultad
    // tipo:[{
    //     lic_educ_infantil:{type:String},
    //     lic_educ_fisica:{type:String},
    //     lic_leng_castellana:{type:String},
    //     lic_ingles:{type:String},
    //     lic_informatica:{type:String},
    //     lic_cien_sociales:{type:String},
    //     lic_educ_arti_musica:{type:String},
    //     lic_cien_naturales:{type:String}
    // }],
    descripcion:{type:String},
    icon:{type:String},
    facultad:{type:String}

},{versionKey:false})
//FacultadSchema.plugin(mongoose_fuzzy_searching, {fields: ['nombre']});
FacultadSchema.plugin(textSearch);
 
// add a text index to the tags array
FacultadSchema.index({ nombre: 'text' });
const Programa= model('Programa',FacultadSchema);
module.exports = Programa;
