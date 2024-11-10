const ProductServices = require("../services/product_services");
const CheckVendor = require("../config/check_vendor");
const ProductModel = require("../model/product_model");
const CategoryModel = require("../model/category_model");
const PosterModel = require("../model/poster_model");
const CouponModel = require("../model/coupon");


const SubCategoryModel = require("../model/sub_category_model");


exports.addProductController = async (req, res) => {
  try {
    const token = req.headers.authorization;

    console.log(req.body);
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }

    const vendor = await CheckVendor.checkVendor(token);

    console.log(vendor);
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
    const category = await CategoryModel.find({});
    const subCategory = await SubCategoryModel.find({});
    const posters = await PosterModel.find({});
    const coupons = await CouponModel.find({});

    const data = {
      products,
      category,
      subCategory,
      posters,
      coupons
    }

    return res.status(200).json({ status: true, message: "Successfull.", data: data })
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
    const body = req.body;


    if (!user && user.Role != "isUser") {
      return res.status(401).json({ status: false, message: "Unauthorized" })
    }
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }

    if (body.order_quantity == null) {
      return res.status(400).json({ status: false, message: "Quantity is required" })
    } else if (body.order_dilivery_charge == null) {
      return res.status(400).json({ status: false, message: "Dilivery Charge is required" })
    } else if (body.order_tax == null) {
      return res.status(400).json({ status: false, message: "Order Tax is required" })
    } else if (body.order_discount == null) {
      return res.status(400).json({ status: false, message: "Order discount is required" })
    } else if (body.order_status == null) {
      return res.status(400).json({ status: false, message: "order Status is required" })
    } else if (body.order_payment == null) {
      return res.status(400).json({ status: false, message: "Order payment is required" })
    } else if (body.order_total == null) {
      return res.status(400).json({ status: false, message: "Order Total is required" })
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

exports.addCategorysController = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }
    const vendor = await CheckVendor.checkVendor(token);
    if (vendor && vendor.Role === "isVendor") {
      let passCate = await ProductServices.addCategorys(req.body, vendor, res);
    } else {
      return res.status(401).json({ status: false, message: "Unauthorized" })

    }

  } catch (error) {

  }
}

exports.editCategoryController = async (req,res) => {
  try {
    const token = req.headers.authorization;
    const id = req.params.id;
    const vendor = await CheckVendor.checkVendor(token);
    if (vendor && vendor.Role === "isVendor") {
      let passCate = await ProductServices.editCategory(id, req.body, vendor, res);
    } else {
      return res.status(401).json({ status: false, message: "Unauthorized" })
    }
  } catch (error) {
    console.log(error);
  }

}

exports.addSubCategory = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (req.body == null) {
      return res.status(400).json({ message: "Invalid body" })
    }
    const vendor = await CheckVendor.checkVendor(token);
    if (vendor && vendor.Role === "isVendor") {
      let passSubCate = await ProductServices.addSubCategorys(req.body, vendor, res);
    } else {
      return res.status(401).json({ status: false, message: "Unauthorized" })
    }

  } catch (error) {
    console.log(error);
  }
}

exports.getOrderProductsController = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const user = await CheckVendor.checkUser(token);
    if (user && (user.Role === "isUser" || user.Role === "isVendor")) {
      const order = await ProductServices.getOrderdProducts(user);
      if (order) {
        return res.status(200).json({ status: true, message: "Successfull.", data: order })
      } else {
        return res.status(400).json({ status: false, message: "Order not found" })
      }
    }

  } catch (error) {
    console.log(error);
  }
}

exports.deleteProductFromOrdersController = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = req.params.orderId;
    const user = await CheckVendor.checkUser(token);

    if (user && user.Role === "isUser") {
      const deleteOrder = await ProductServices.deleteProductFromOrders(id);
      if (deleteOrder) {
        return res.status(200).json({ status: true, message: "Order Successfully Canceled." })
      } else {
        return res.status(400).json({ status: false, message: "Order not found" })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const token = await req.headers.authorization;
    const orderId = await req.params.orderId;
    const admin = await CheckVendor.checkVendor(token);

    if (admin && admin.Role == "isVendor") {
      const orderUpdate = await ProductServices.updateOrder(admin, req.body, orderId);
      if (orderUpdate) {
        return res.status(200).json({ status: true, message: "Order Updated." });
      } else {
        return res.status(400).json({ status: false, message: "Order not updated." });
      }
    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {
    console.log(error);
  }
}

exports.addPostersController = async (req, res) => {
  try {
    const token = await req.headers.authorization;
    const admin = await CheckVendor.checkVendor(token);

    if (admin && admin.Role == "isVendor") {
      const poster = await ProductServices.addPosters(req.body, admin, res);
      if (poster) {
        return res.status(200).json({ status: true, message: "Poster added." });
      } else {
        return res.status(400).json({ status: false, message: "Poster not added." });
      }

    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {
    console.log(error);
  }
}

exports.updatePostersController = async (req, res) => {
  try {
    const token = await req.headers.authorization;
    const admin = await CheckVendor.checkVendor(token);
    const posterId = await req.params.posterId;

    if (admin && admin.Role == "isVendor") {
      const poster = await ProductServices.updatePosters(req.body, admin, posterId);
      if (poster) {
        return res.status(200).json({ status: true, message: "Poster updated." });
      } else {
        return res.status(400).json({ status: false, message: "Poster not updated." });
      }
    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {
    console.log(error);
  }
}


exports.deletePostersController = async (req, res) => { 
  try {
    const token = await req.headers.authorization;
    const admin = await CheckVendor.checkVendor(token);
    const posterId = await req.params.posterId;

    if (admin && admin.Role == "isVendor") {
      const poster = await ProductServices.deletePoster( posterId);
      if (poster) {
        return res.status(200).json({ status: true, message: "Poster deleted." });
      } else {
        return res.status(400).json({ status: false, message: "Poster not deleted." });
      }
    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {
    console.log(error);
  }
}

exports.addCouponController = async (req, res) => {
  try {
    const token = await req.headers.authorization;
    const admin = await CheckVendor.checkVendor(token);

    if (admin && admin.Role == "isVendor") {
      const poster = await ProductServices.addCoupon(req.body, admin);
      if (poster) {
        return res.status(200).json({ status: true, message: "Coupon added." });
      } else {
        return res.status(400).json({ status: false, message: "Coupon not added." });
      }
    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {
    console.log(error);
  }
}

exports.updateCouponController = async (req, res) => {
  try {
    const token = await req.headers.authorization;
    const admin = await CheckVendor.checkVendor(token);
    const couponId = await req.params.couponId;

    if (admin && admin.Role == "isVendor") {
      const poster = await ProductServices.updateCoupon(req.body, admin, couponId);
      if (poster) {
        return res.status(200).json({ status: true, message: "Coupon updated." });
      } else {
        return res.status(400).json({ status: false, message: "Coupon not updated." });
      }
    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {

  }
}

exports.deleteCouponController = async (req, res) => {
  try {
    const token = await req.headers.authorization;
    const admin = await CheckVendor.checkVendor(token);
    const couponId = await req.params.couponId;

    if (admin && admin.Role == "isVendor") {
      const poster = await ProductServices.deleteCoupon(couponId);
      if (poster) {
        return res.status(200).json({ status: true, message: "Coupon deleted." });
      } else {
        return res.status(400).json({ status: false, message: "Coupon not deleted." });
      }
    } else {
      return res.status(400).json({ status: false, message: "You are not admin." });
    }
  } catch (error) {
    console.log(error);
  }
}

