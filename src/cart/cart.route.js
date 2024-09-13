import { Router } from "express";
import { getCart, addProductToCart, removeProductFromCart, clearUserCart,  } from "./cart.controller.js";
import { auth } from "../middleware/auth.js";

export const cartRouter = Router();


cartRouter.get('/', auth, getCart);
cartRouter.post('/add', auth, addProductToCart);
cartRouter.delete('/remove', auth, removeProductFromCart);
cartRouter.delete('/clear', auth, clearUserCart);  