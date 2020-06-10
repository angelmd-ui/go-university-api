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

const PostSchema = new Schema({
 usuario:{type: Schema.Types.ObjectId,ref:'Usuario'},
 titulo:{type:String},
 area:{type: Schema.Types.ObjectId,ref:'Area'},
 trabajo:{type: Schema.Types.ObjectId,ref:'Trabajo'},
 timestamp:{type:Date},
 responses:[commentsSchema]
},{versionKey:false})



const Post = model('Post',PostSchema);
module.exports = Post;