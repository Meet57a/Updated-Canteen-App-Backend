const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const categorySchema = new Schema({
    Id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    CategoryName: {
        type: String,
        required: true,
    },
    CategoryAdmin: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

const CategorySubCategoryModel = db.model("category", categorySchema);
module.exports = CategorySubCategoryModel;