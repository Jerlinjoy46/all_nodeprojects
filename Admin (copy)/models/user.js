const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:String,
    password:Number,
    phone:Number,
    city:String
});
module.exports = mongoose.model("users",UserSchema);