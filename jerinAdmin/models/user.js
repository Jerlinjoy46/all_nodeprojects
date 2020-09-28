const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:String,
    password:Number,
    phone:Number,
    email:String,
    pin:Number
});
module.exports = mongoose.model("users",UserSchema);