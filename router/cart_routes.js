const router = require('express').Router();
const CartController = require("../controller/cart_controller");

router.post('/cart/addProduct/:id', CartController.addProductToCartController);
router.delete('/cart/deleteProduct/:id', CartController.deleteFromCartController);
router.post('/cart/getAllCartProduct',CartController.getCartProductAllController);
module.exports = router;
    