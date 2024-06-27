const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const orderProductSchema = new Schema({
    OrderId: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    UserId: {
        type: String,
        required: true,
    },
    ProductName: {
        type: String,
        required: true,
    },
    ProductPrice: {
        type: Number,
        required: true,
    },
    OrderQuantity: {
        type: Number,
        required: true,
    },
    UserFullName: {
        type: String,
        required: true,
    },
    UserAddress: {
        type: String,
        required: true,
    },
    UserEmail: {
        type: String,
        required: true,
    },
    UserPhone: {
        type: String,
        required: true,
    },
    OrderDiliveryCharge: {
        type: Number,
        required: true,
    },
    OrderTax: {
        type: Number,
        required: true,
    },
    OrderDiscount: {
        type: Number,
        required: true,
    },
    OrderStatus: {
        type: String,
        required: true,
    },
    OrderPayment: {
        type: String,
        required: true,
    },
    OrderTotal: {
        type: Number,
        required: true,
    },
    OrderTimeRequired : {
        type : String,
        required : false,
    },
}, {
    timestamps: true,
},
);

const OrderProductModel = db.model("OrderProduct", orderProductSchema);
module.exports = OrderProductModel;