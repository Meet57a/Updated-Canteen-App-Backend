const UserModel = require("../model/user");
const ProductModel = require("../model/product_model");
const jwt = require("jsonwebtoken");
const S3 = require("../config/s3-config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const OrderProductModel = require('../model/order_product_model');

class ProductServices {

  static async addProduct(
    body, res, admin
  ) {
    try {
      const addIngProduct = ProductModel({
        
        ProductName: body.product_name,
        ProductPrice: body.product_price,
        ProductQuantity: body.product_quantity,
        ProductCategory: body.product_category,
        ProductSubCategory: body.sub_category,
        PriorityOfFood: body.priority_of_food,
        ProductDescription: body.product_description,
        ProductStock: body.product_stock,
        ProductMenu: body.product_menu,
        StatusAvailable: body.status_available,
        DiscountActive: body.discount_active,
        DiscountPercentage: body.discount_percentage,
        ProductAdmin: admin.Fullname,
      }); 
 
      const product = await addIngProduct.save();
      const productID = product.ProductId.toString();

      const command = new PutObjectCommand({
        Bucket: "mu-canteen",
        Body: body.product_image,
        ContentType: body.mimeType,
        ContentLength: body.product_image.length,
        Key: productID,
      });

      try {
        await S3.send(command);
      } catch (err) {
        ProductModel.findByIdAndDelete({ _id: productID });
        res.status(401).send({ status: false, message: "Image Not Upload." })
        console.log("Error", err);
      }
      res.status(200).send({ status: true, message: "Product Successfully Added." });

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
