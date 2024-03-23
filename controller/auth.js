const UserModel = require("../model/user");
const AuthService = require("../services/auth");
const bcrypt = require("bcrypt");

exports.registerDetail = async (req, res) => {
  try {
    const { Fullname, MobileNo, Email, Password, Role } = req.body;
    console.log(req.body);
    const user = await AuthService.userCheck(Email);
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(Password, salt);
    if (user) {
      res.status(409).json({ status: false, message: "Email already exists." });

    } else {
      return AuthService.registerUser(
        Fullname,
        MobileNo,
        Email,
        hashpass,
        Role,
        res
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginDetail = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(req.body);
    const user = await AuthService.userCheck(Email);
    if (user) {
      console.log(req.body);
      return AuthService.loginUser(Password, user, res);
    } else {
      res.status(404).json({ status: false, message: "User not found." });
    }
  } catch (error) {
    console.log(error);
  }
};
