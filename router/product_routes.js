const router = require('express').Router();
const ProductController = require("../controller/product_controller");

router.post('/product/addproduct',ProductController.addProductController);
router.get('/product/getproducts',ProductController.getProducts);


module.exports = router;
