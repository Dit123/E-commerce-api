//use to connect the codes in product to the server
import { Router } from "express";
import { adminRoutes, getProductsById, getsAllProducts } from "./product.controller.js";
import { isAdmin, auth } from "../middleware/auth.js";

export const productRouter = Router();
 

productRouter.post('/create',auth, isAdmin, adminRoutes.createproduct);
productRouter.put('/update', auth, isAdmin, adminRoutes.updateProductById);
productRouter.delete('/delete',auth, isAdmin, adminRoutes.deleteProductById);


productRouter.get('/get', auth, getsAllProducts);
productRouter.get('/get/:id', auth, getProductsById);