import { Router } from "express";

import { getPaymentsByEmailController, updatePaymentDetails, removePayment, createPaymentController, updatePaymentController, getPaymentByIdController } from "./payment.controller.js";
import { auth } from "../middleware/auth.js";


export const paymentRouter = Router();

paymentRouter.post('/create', auth, createPaymentController);
paymentRouter.get('/email/:email', auth, getPaymentsByEmailController);
paymentRouter.get('/get/:paymentID', auth, getPaymentByIdController);
paymentRouter.put('/updatedetails/:paymentID', auth, updatePaymentDetails);
paymentRouter.put('/update/:paymentID', auth, updatePaymentController);
paymentRouter.delete('/delete', auth, removePayment);