const { Schema, model } =  require('mongoose');



const favoriteSchema  = new Schema({
    topic:{
        type:String,
        maxLength:64
    },
  
    timestamp:{
        type:Date,
        default: Date.now()
      },

      id_evento:[{
        type:Schema.Types.ObjectId,
        ref:'Events'
    }],
    id_news:[{
        type:Schema.Types.ObjectId,
        ref:'News'
    }],

},{collection:'Favorite'},{versionKey:false});

const Favorite = model('Favorite',favoriteSchema );

module.exports =Favorite;