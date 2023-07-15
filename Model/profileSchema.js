const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    }
})

const profiles = mongoose.model("profile",profileSchema)
module.exports=profiles