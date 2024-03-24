const router = require('express').Router();
const ProductController = require("../controller/product_controller");

router.post('/product/addproduct',ProductController.addProductController);



module.exports = router;
