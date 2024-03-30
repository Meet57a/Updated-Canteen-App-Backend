const ProductServices = require("../services/product_services");
const CheckVendor = require("../config/check_vendor");
const ProductModel = require("../model/product_model");

exports.addProductController = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const {
      ProductName,
      ProductPrice,
      ProductDescription,
      ProductQuantity,
      ProductCategory,
      TypeOfFood,
      ProductImage,
      mimeType,
    } = req.body;


    console.log(req.body);
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }


    const vendor = await CheckVendor.checkVendor(token);



    if (vendor && vendor.Role === "isVendor") {
      let passProduct = await ProductServices.addProduct(
        ProductName,
        ProductPrice,
        ProductDescription,
        ProductQuantity,
        ProductCategory,
        TypeOfFood,
        vendor.Fullname,
        res,
        ProductImage,
        mimeType
      );
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
    return res.status(200).json({ status: true, data: products })
  } catch (error) {
    console.log(error);
  }
}