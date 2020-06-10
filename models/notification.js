const {Schema,model} =  require('mongoose');
const NotificationSchema = new Schema({
    usuario:{type: Schema.Types.ObjectId,ref:'Usuario'},
    expirationTime:{},
    endpoint:{type:String},
    keys:{
        p256dh:{type:String},
        auth:{type:String}
    }
},{versionKey:false})

const Notification = model('Notification',NotificationSchema);
module.exports = Notification;