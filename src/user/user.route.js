import {Router} from "express";
import { forgotPassword, resetPassword, signin, signup, updateUsersPassword } from "./user.controller.js";

export const userRouter = Router();

userRouter.post('/signup', signup );
userRouter.put('/update', updateUsersPassword);
userRouter.post('/forgot', forgotPassword);
userRouter.post('/reset', resetPassword);
userRouter.post('/signin', signin);