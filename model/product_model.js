const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const productSchema = new Schema({
  ProductId: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductPrice: {
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
  ProductSubCategory: {
    type: String,
    required: true,
  },
  PriorityOfFood: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  ProductStock: {
    type: String,
    required: true,
  },
  StatusAvailable: {
    type: String,
    required: true,
  },
  DiscountActive: {
    type: String,
    required: true,
  },
  DiscountPercentage: {
    type: String,
    required: false,
  },
  ProductAdmin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const ProductModel = db.model("Product", productSchema);
module.exports = ProductModel;
