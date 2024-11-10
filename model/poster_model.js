const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const posterSchema = new Schema({
    PosterId: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    PosterTitle: {
        type: String,
        required: true,
    },
    PosterDescription: {
        type: String,
        required: false,
    },
    PosterAdmin: {
        type: String,
        required: true,
    },
    PosterStatus: {
        type: Boolean,
        required: true,
    },
    PosterPriority: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true
    });

const   PosterModel = db.model("Poster", posterSchema);
module.exports = PosterModel;

