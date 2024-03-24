const ProductServices = require("../services/product_services");
const CheckVendor = require("../config/check_vendor");

exports.addProductController = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const {
      ProductName,
      ProductPrice,
      ProductDescription,
      ProductQuantity,
      ProductCategory,
      ProductImage,
      mimeType,
    } = req.body;

    const vendor = await CheckVendor.checkVendor(token);

  

    if (vendor && vendor.Role === "isVendor") {
      let passProduct = await ProductServices.addProduct(
        ProductName,
        ProductPrice,
        ProductDescription,
        ProductQuantity,
        ProductCategory,
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
