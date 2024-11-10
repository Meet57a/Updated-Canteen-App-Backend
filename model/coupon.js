const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const couponSchema = new Schema({
    CouponId: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    AppliedToWhich : {
        type: String,
        required: true,
    },
    CouponTitle: {
        type: String,
        required: false,
    },
    CouponCode: {
        type: String,
        required: true,
    },
    DiscountPercentage: {
        type: Number,
        required: true,
    },
    CouponDesc: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        required: true,
    },
    Admin: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const CouponModel = db.model("Coupon", couponSchema);
module.exports = CouponModel;