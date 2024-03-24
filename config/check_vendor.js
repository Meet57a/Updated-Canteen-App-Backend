const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

exports.checkVendor = async (token) => {
  try {
    const check = jwt.verify(token, process.env.JWT_SECRET || "adfafafaf");
    const decodedToken = jwt.decode(token);
    if (check) {
      const email = decodedToken["Email"];
      const role = decodedToken["Role"];

      return await UserModel.findOne({ Email: email});
    }
  } catch (error) {
    console.log(error);
  }
};
