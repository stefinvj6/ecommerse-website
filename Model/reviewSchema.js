const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"product",
        required:true
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const reviews = mongoose.model("review",reviewSchema)
module.exports=reviews