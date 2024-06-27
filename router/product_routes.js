const router = require('express').Router();
const ProductController = require("../controller/product_controller");

router.post('/product/addproduct',ProductController.addProductController);
router.get('/product/getproducts',ProductController.getProducts);
router.post('/product/updateProducts/:id',ProductController.updateProductController);
router.get('/product/deleteProducts/:id',ProductController.deleteProductController);
router.post('/product/orderProduct/:productId',ProductController.orderProductController);
router.delete('/product/deleteProductFromOrders/:orderId',ProductController.deleteProductFromOrdersController);
router.get('/product/getOrderdProducts',ProductController.getOrderProductsController);
router.post("/product/addCategory",ProductController.addCategorysController);
router.post("/product/addSubCategory",ProductController.addSubCategory);





module.exports = router;
 