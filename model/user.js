const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  Fullname: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
});

const UserModel = db.model("User", userSchema);

module.exports = UserModel;
