const ProductServices = require("../services/product_services");
const CheckVendor = require("../config/check_vendor");
const ProductModel = require("../model/product_model");

exports.addProductController = async (req, res) => {
  try {
    const token = req.headers.authorization;

    console.log(req.body);
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }

    const vendor = await CheckVendor.checkVendor(token);
    if (vendor && vendor.Role === "isVendor") {
      let passProduct = await ProductServices.addProduct(req.body, res, vendor);
    } else {
      console.log("Unauthorized");
    }

  } catch (error) {
    console.log(error);
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
console.log("fesdsdsd");
    return res.status(200).json({ status: true, message: "Successfull.", data: products })
  } catch (error) {
    console.log(error);
  }
} 

exports.updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;
    const vendor = await CheckVendor.checkVendor(token);
 
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }


    if (vendor && vendor.Role == "isVendor") {
      const updatingProduct = await ProductServices.updateProduct(id, req.body, vendor.Fullname);
      if (updatingProduct) {
        return res.status(200).json({ status: true, message: "Product updated successfully" })
      } else {
        return res.status(400).json({ status: false, message: "Product not updated" })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

exports.deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;
    const vendor = await CheckVendor.checkVendor(token);

    if (vendor && vendor.Role == "isVendor") {
      const deletingProduct = await ProductServices.removeProduct(id);
      if (deletingProduct) {
        return res.status(200).json({ status: true, message: "Product deleted successfully" })
      } else {
        return res.status(400).json({ status: false, message: "Product not deleted" })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

exports.orderProductController = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const productId = req.params.productId;
    const user = await CheckVendor.checkUser(token);


    if (!user && user.Role != "isUser") {
      return res.status(401).json({ status: false, message: "Unauthorized" })
    }
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }



    if (user && user.Role == "isUser") {
      const order = await ProductServices.orderProduct(req.body, user, productId);
      if (order) {
        return res.status(200).json({ status: true, message: "Order placed successfully" })
      } else {
        return res.status(400).json({ status: false, message: "Order not placed" })
      }
    }
  } catch (error) {
    console.log(error);
  }
}