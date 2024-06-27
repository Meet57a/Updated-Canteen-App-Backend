const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const cartSchema = new Schema({
    CartProductId: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    ProductId: {
        type: String,
        required: true,
    },
    qty:{
        type: Number,
        required: true,
    },
    UserId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const CartModel = db.model("cart", cartSchema);
module.exports = CartModel;