import e from "express";
import { getProductToCartSchema } from "../validator/auth.js";
import { createNewCart, getCartByUserId, addItemToCart, getCartItems, removeItemFromCart, clearCart} from "./cart.service.js"

export const getCart = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        let cart = await getCartByUserId(user.id);
        if (!cart) {
            cart = await createNewCart(user.id);
        }

        const items = await getCartItems(cart.cartID);
        res.status(200).json({ cart, items });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        const { error, value } = getProductToCartSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { items } = value;

        let cart = await getCartByUserId(user.id);
        if (!cart) {
            cart = await createNewCart(user.id);
        }

        for (const item of items) {
            await addItemToCart(cart.cartID, item.productId, item.quantity);
        }

        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const removeProductFromCart = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        let cart = await getCartByUserId(user.id);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        await removeItemFromCart(cart.cartID, productId);
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const clearUserCart = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        let cart = await getCartByUserId(user.id);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        await clearCart(cart.cartID);
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
