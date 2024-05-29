const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const orderProductSchema = new Schema({
    ObjectId: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    ProductName: {
        type: String,
        required: true,
    },
    ProductPrice: {
        type: Number,
        required: true,
    },
    ProductDescription: {
        type: String,
        required: true,
    },
    OrderQuantity: {
        type: Number,
        required: true,
    },
    ProductCategory: {
        type: String,
        required: true,
    },
    TypeOfFood: {
        type: String,
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
    OrderStatus: {
        type: String,
        required: true,
    },
    OrderPayment: {
        type: String,
        required: true,
    },
    OrderDate: {
        type: Date,
        required: true,
    },
    OrderTime: {
        type: String,
        required: true,
    },
    OrderTotal: {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
});

const OrderProductModel = db.model("OrderProduct", orderProductSchema);
module.exports = OrderProductModel;