const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    amount: Number,
    price: Number
})

const orderSchema = new mongoose.Schema({
    prodcuts: [productCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports = { Order, ProductCart };