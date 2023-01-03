const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String

})

const UserModel = new mongoose.model("UserModel",UserSchema);
module.exports = UserModel;