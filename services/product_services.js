const UserModel = require("../model/user");
const ProductModel = require("../model/product_model");
const jwt = require("jsonwebtoken");
const S3 = require("../config/s3-config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

class ProductServices {
  // static async checkVendor(token) {
  //   try {
  //     const check = jwt.verify(token, process.env.JWT_SECRET || "adfafafaf");
  //     const decodedToken = jwt.decode(token);
  //     const email = decodedToken["Email"];
  //     const role = decodedToken["Role"];
  //     if (check) {
  //       console.log(email);
  //       console.log(role);
  //     }
  //     return await UserModel.findOne({ Email: email });
  //   } catch (error) {
  //     if (error) {
  //       res.send(false);
  //     }
  //   }
  // }

  static async addProduct(
    ProductName,
    ProductPrice,
    ProductDescription,
    ProductQuantity,
    ProductCategory,
    ProductAdmin,
    res,
    image,
    mimeType
  ) {
    try {
      
      const addIngProduct = ProductModel({
        ProductName,
        ProductPrice,
        ProductDescription,
        ProductQuantity,
        ProductCategory,
        ProductAdmin,
      });

      const product = await addIngProduct.save();
      const productID = product._id.toString();
      console.log(productID);
      const command = new PutObjectCommand({
        Bucket: "mu-canteen",
        Body: image,
        ContentType: mimeType,
        ContentLength: image.length,
        Key: productID,
      });
      try {
        await S3.send(command);
      } catch (err) {
        console.log("Error", err);
      }
      res.status(200).send({ status: true, message: "Success." });
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductServices;
