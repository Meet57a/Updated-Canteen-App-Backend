const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  static async userCheck(Email, MobileNo) {
    try {
      console.log(MobileNo);
      const user = await UserModel.findOne({ Email: Email });
      const userNumber = await UserModel.findOne({ MobileNo: MobileNo });

      if (user) {
        return user;
      } else if (userNumber) {
        return userNumber;
      }

    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(Fullname, MobileNo, Email, Password, Role, res) {
    try {
      const mobileNo = "+91" + MobileNo;
      const createUser = new UserModel({
        Fullname,
        MobileNo: mobileNo,
        Email,
        Password,
        Role,
      });
      const createdUser = await createUser.save();
      if (createdUser) {
        res
          .status(200)
          .json({ status: true, message: "User created successfully." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(Password, user, res) {
    try {
      const isCompare = await bcrypt.compare(Password, user.Password);

      if (!isCompare) {
        res
          .status(401)
          .json({ status: false, message: "Password is incorrect." });
      }
      if (isCompare && (user.Role == "isUser" || user.Role == "isVendor")) {
        const tokenData = {
          _id: user._id,
          Email: user.Email,
          Fullname: user.Fullname,
          MobileNo: user.MobileNo,
          Role: user.Role,
        };
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign(
          tokenData,
          process.env.JWT_SECRET || "adfafafaf",
          {
            expiresIn: "1h",
          }
        );
        return res
          .status(200)
          .json({ status: true, message: "Login successfully.", token: token });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthService;
