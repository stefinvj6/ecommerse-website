const mongoose = require("mongoose")
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique:true
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const feedbacks = mongoose.model("feedback",feedbackSchema)
module.exports=feedbacks