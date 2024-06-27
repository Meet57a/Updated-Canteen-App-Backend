const CheckAuth = require("../config/check_vendor");
const CartServices = require("../services/cart_seervice");
const CartModel = require("../model/cart_model");

exports.addProductToCartController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const productId = req.params.id;
        const user = await CheckAuth.checkUser(token);

        if (!user && user.Role != "isUser") {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }
        if (req.body == null) {
            return res.status(400).json({ message: "Invalid body" })
        }

        const exist = await CartModel.findOne({ ProductId: productId });

        if (exist) {
            return res.status(400).json({ message: "Product already exist in cart" })
        } else {
            if (user && user.Role == "isUser") {
                const cart = await CartServices.addProductToCart(productId, user, req.body);
                if (cart) {
                    return res.status(200).json({ status: true, message: "Product added to cart successfully" })
                } else {
                    return res.status(400).json({ status: false, message: "Product not added to cart" })
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteFromCartController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const productId = req.params.id;
        const user = await CheckAuth.checkUser(token);

        if (!user && user.Role != "isUser") {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }

        if (user && user.Role == "isUser") {
            const cart = await CartServices.deleteFromCart(productId, user);
            if (cart) {
                return res.status(200).json({ status: true, message: "Product deleted from cart successfully" })
            } else {
                return res.status(400).json({ status: false, message: "Product not deleted from cart" })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getCartProductAllController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = await CheckAuth.checkUser(token);

        if (!user && user.Role != "isUser") {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }

        if (user && user.Role == "isUser") {
            const cart = await CartServices.getCartProductAll(user);
            if (cart) {
                return res.status(200).json({ status: true, message: "Cart Product fetched successfully", data: cart })
            } else {
                return res.status(400).json({ status: false, message: "Cart Product not fetched" })
            }
        }
    } catch (error) {
        console.log(error);
    }
}