const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    picture: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const product = mongoose.model('product', productSchema);
module.exports = product