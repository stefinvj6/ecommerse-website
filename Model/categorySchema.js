const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const categories = mongoose.model("category",categorySchema)
module.exports = categories;