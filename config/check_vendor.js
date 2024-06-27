const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");
require('dotenv').config();


exports.checkVendor = async (token) => {
  try {
    const check = jwt.verify(token, process.env.JWT_SECRET);
    const decodedToken = jwt.decode(token);
    if (check) {
      const id = decodedToken['_id'];


      return await UserModel.findOne({ userId: id });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkUser = async (token) => {
  try {
    const check = jwt.verify(token, process.env.JWT_SECRET);
    const decodedToken = jwt.decode(token);
    if (check) {
      const id = decodedToken['_id'];

      return await UserModel.findOne({ userId :id });
    }
  } catch (error) {
    console.log(error);
  }
};