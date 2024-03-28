const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const productSchema = new Schema({
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
  ProductQuantity: {
    type: String,
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

  ProductAdmin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = db.model("Product", productSchema);
module.exports = ProductModel;
