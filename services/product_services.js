const UserModel = require("../model/user");
const ProductModel = require("../model/product_model");
const CategoryModel = require("../model/category_model");
const SubCategoryModel = require("../model/sub_category_model");


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

  static async addCategorys(body, admin, res) {
    try {

      const addCategory = CategoryModel({
        CategoryName: body.category_name,
        CategoryAdmin: admin.Fullname,
      });

      const category = await addCategory.save();
      const categoryId = category.Id.toString();

      const command = new PutObjectCommand({
        Bucket: "mu-canteen",
        Body: body.category_image,
        ContentType: body.mimeType,
        ContentLength: body.category_image.length,
        Key: categoryId,
      });

      try {
        await S3.send(command);
      } catch (err) {
        CategoryModel.findOneAndDelete({ CategoryId: categoryId });
        res.status(401).send({ status: false, message: "Image Not Upload." })
        console.log("Error", err);
      }
      res.status(200).send({ status: true, message: "Category Successfully Added." });




    } catch (error) {
      console.log(error);
    }
  }

  static async addSubCategorys(body, admin, res) {
    try {

      const addSubCategory = SubCategoryModel({
        CategoryName: body.category_name,
        SubCategoryName: body.sub_category_name,
        SubCategoryAdmin: admin.Fullname,
      });

      const subCategory = await addSubCategory.save();
      const subCategoryId = subCategory.Id.toString();

      const command = new PutObjectCommand({
        Bucket: "mu-canteen",
        Body: body.category_image,
        ContentType: body.mimeType,
        ContentLength: body.category_image.length,
        Key: subCategoryId,
      });

      try {
        await S3.send(command);
      } catch (err) {
        CategoryModel.findOneAndDelete({ CategoryId: subCategoryId });
        res.status(401).send({ status: false, message: "Image Not Upload." })
        console.log("Error", err);
      }
      res.status(200).send({ status: true, message: "Sub Category Successfully Added." });

    } catch (error) {
      console.log(error);
    }
  }


  static async updateProduct(id, body, admin) {
    try {
      const updatedProduct = await ProductModel.findOneAndUpdate({ ProductId: id }, {
        $set: {
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
        }
      }, { new: true });

      return updatedProduct;

    } catch (error) {
      console.log(error);
    }
  }

  static async removeProduct(id) {
    try {
      const deletedProduct = await ProductModel.findOneAndDelete({ ProductId: id });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  static async orderProduct(body, user, productId) {

    const product = await ProductModel.findOne({ ProductId: productId });
    try {
      const orderProduct = OrderProductModel({
        ProductId: product.ProductId,
        UserId: user.userId,
        ProductName: product.ProductName,
        ProductPrice: product.ProductPrice,
        OrderQuantity: body.order_quantity,
        UserFullName: user.Fullname,
        UserAddress: user.Address,
        UserEmail: user.Email,
        UserPhone: user.MobileNo,
        OrderDiliveryCharge: body.order_dilivery_charge,
        OrderTax: body.order_tax,
        OrderDiscount: body.order_discount,
        OrderStatus: body.order_status,
        OrderPayment: body.order_payment,
        OrderTotal: body.order_total,
      });

      const order = await orderProduct.save();
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOrderdProducts(user){
    try {
      const orderProduct = await OrderProductModel.find({ UserId: user.userId });
      return orderProduct;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProductFromOrders(orderId){
    try {
      const deletedProduct = await OrderProductModel.findOneAndDelete({ OrderId : orderId });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ProductServices;
