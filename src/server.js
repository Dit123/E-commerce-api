import express from 'express';
import { config } from './config.js/env.js';
import { createUserTable } from './user/user.model.js';
import { userRouter } from './user/user.route.js';
import { productRouter } from './product/product.route.js';
import { cartRouter } from './cart/cart.route.js';
import { createProductTable } from './product/product.model.js';
import { createCartTable } from './cart/cart.model.js';
import { createTokenTable } from './token/token.model.js';
import { tokenRouter } from './token/token.route.js';
import { createOrderTable } from './order/order.model.js';
import { orderRouter } from './order/order.route.js';
import { paymentRouter } from './payment/payment.route.js';
import { createPaymentTable } from './payment/payment.model.js';

const app = express(); //used to initialize express of the application

app.use(express.json()); //used to initialize the bodyparser middleware or app.use(express.json())


app.get('/', (req,res) =>{
    res.status(200).json({
        message: 'Welcome to my first E-commerce page',
        user: req.user
    })
});//used to create a route


app.use ('/user', userRouter);
app.use ('/product', productRouter);
app.use ('/cart', cartRouter);
app.use('/token', tokenRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);

app.listen(config.port, async () => {
    await createUserTable();
    await createProductTable();
    await createCartTable();
    await createTokenTable();
    await createOrderTable();
    await createPaymentTable();
    console.log (`server running on port`, config.port)
}); //used to make the application listen for incoming request