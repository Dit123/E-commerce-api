import { Router} from "express";
import { savetokens,logouts,gettokens } from "./token.controller.js";


export const tokenRouter = Router();

tokenRouter.post('/token', savetokens);
tokenRouter.delete('/token', logouts);
tokenRouter.post('/token', gettokens);