const UserModel = require("../model/user");
const AuthService = require("../services/auth");
const bcrypt = require("bcrypt");

exports.registerDetail = async (req, res) => {
  try {
    const { Fullname, MobileNo, Email, Password, Role } = req.body;

    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    } else if ((Email == null || Email == "") || (Password == null || Password == "") || (Fullname == null || Fullname == "") || (MobileNo == null || MobileNo == "") || (Role == null || Role == "")) {
      return res.status(400).json({ message: "Invalid body" })
    } else if (Role != "isUser" && Role != "isAdmin") {
      return res.status(400).json({ message: "Invalid Role" })
    } else if (MobileNo.length != 10) {
      return res.status(400).json({ message: "Invalid Mobile Number" })
    } else if (Password.length < 8) {
      return res.status(400).json({ message: "Password length should be greater than 8" })
    } else if (Email.includes("@") == false || Email.includes(".") == false) {
      return res.status(400).json({ message: "Invalid Email" })
    }


    const user = await AuthService.userCheck(Email, MobileNo);

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(Password, salt);


    if (user) {
      res.status(409).json({ status: false, message: "User already exists." });

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


    if (Email == null || Password == null || Email == "" || Password == "") {
      return res.status(400).json({ message: "Invalid body" })
    }
    else if (Email.includes("@") == false || Email.includes(".") == false) {
      return res.status(400).json({ message: "Invalid Email" })
    }
    else if (Password.length < 8) {
      return res.status(400).json({ message: "Password length should be greater than 8" })
    }




      const user = await AuthService.userCheck(Email);
      if (user) {
        
        return AuthService.loginUser(Password, user, res);
      } else {
        res.status(404).json({ status: false, message: "User not found." });
      }
    } catch (error) {
      console.log(error);
    }
  };
