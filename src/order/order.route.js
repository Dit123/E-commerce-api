import { Router } from "express";

import { createOrderController, getOrderByIdController, updateOrderStatusController, deleteOrderByIdController } from './order.controller.js';
import { auth } from "../middleware/auth.js";

export const orderRouter = Router();

orderRouter.post('/create', auth,  createOrderController);
orderRouter.get('/get/:orderId', auth, getOrderByIdController);
orderRouter.put('/update/:orderId/status', auth, updateOrderStatusController);
orderRouter.delete('/delete/:orderId', auth, deleteOrderByIdController);