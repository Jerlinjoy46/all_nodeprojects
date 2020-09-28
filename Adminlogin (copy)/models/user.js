const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UsersSchema = new mongoose.Schema({
    username:String,
    password:Number,
    phone:Number,
    city:String
}) ;
UsersSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users",UsersSchema);