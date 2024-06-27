const ProductModel = require("../model/product_model");
const CartModel = require("../model/cart_model");


class CartServices {

    static async addProductToCart(productId, user, body) {
        try {
            const product = await ProductModel.findOne({ ProductId: productId });
            console.log(product);
            const cart = CartModel({
                UserId: user.userId,
                ProductId: product.ProductId,
                qty: body.qty
            });
            const cartSave = await cart.save();
            return cartSave;
        } catch (error) {
            console.log(error);
        }
    }


    static async deleteFromCart(productId, user) {
        try {
            console.log(productId);
            console.log(user.userId);
            const deleteProduct = await CartModel.findOneAndDelete({ ProductId: productId, UserId: user.userId });
            return deleteProduct;
        } catch (error) {
            console.log(error);
        }
    }

    static async getCartProductAll(user) {
        try {
            const cartProducts = await CartModel.find({ UserId: user.userId });
            return cartProducts;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartServices;