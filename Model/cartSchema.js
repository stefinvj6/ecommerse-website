const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"product",
        required:true
    }
})

const carts = mongoose.model("cart",cartSchema)
module.exports=carts