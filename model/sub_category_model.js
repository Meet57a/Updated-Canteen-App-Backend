const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const subCategorySchema = new Schema({
    Id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    SubCategoryName: {
        type: String,
        required: true,
    },
    CategoryName: {
        type: String,
        required: true,
    },
    SubCategoryAdmin: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

const SubCategoryModel = db.model("sub_category", subCategorySchema);
module.exports = SubCategoryModel;