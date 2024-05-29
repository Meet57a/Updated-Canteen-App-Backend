const UserModel = require("../model/user");
const ProductModel = require("../model/product_model");
const jwt = require("jsonwebtoken");
const S3 = require("../config/s3-config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const OrderProductModel = require('../model/order_product_model'); 

class ProductServices {

  static async addProduct(
    ProductName,
    ProductPrice,
    ProductDescription,
    ProductQuantity,
    ProductCategory,
    TypeOfFood,
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
        TypeOfFood,
        ProductAdmin,
        updatedAt: null,
      });

      const product = await addIngProduct.save();
      const productID = product._id.toString();

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
        ProductModel.findByIdAndDelete({ _id: productID });
        res.status(401).send({ status: false, message: "Image Not Upload" })
        console.log("Error", err);
      }
      res.status(200).send({ status: true, message: "Success." });
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(id, body, updateProductAdmin) {
    try {
      const updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, {
        $set: {
          ProductName: body.ProductName,
          ProductPrice: body.ProductPrice,
          ProductDescription: body.ProductDescription,
          ProductQuantity: body.ProductQuantity,
          ProductCategory: body.ProductCategory,
          TypeOfFood: body.TypeOfFood,
          ProductAdmin: updateProductAdmin,
          updatedAt: Date.now(),
        }
      }, { new: true });

      return updatedProduct;

    } catch (error) {
      console.log(error);
    }
  }

  static async removeProduct(id) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  static async orderProduct(body, user, productId) {

    const product = await ProductModel.findById({ _id: productId });
    
    const dateTime = body.DateTime.split(" ");
    const date = dateTime[0];
    const time = dateTime[1];

    
    try {
      const orderProduct = OrderProductModel({
        ProductName: product.ProductName,
        ProductPrice: product.ProductPrice,
        ProductDescription: product.ProductDescription,
        OrderQuantity: body.OrderQuantity,
        ProductCategory: product.ProductCategory,
        TypeOfFood: product.TypeOfFood,
        UserFullName: user.Fullname,
        UserAddress: body.Address,
        UserEmail: user.Email,
        UserPhone: user.MobileNo,
        OrderStatus: "Pending", 
        OrderPayment: body.Payment,
        OrderDate: date,
        OrderTime: time,
        OrderTotal: body.OrderTotal,
      });

      const order = await orderProduct.save();
      return order;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ProductServices;
