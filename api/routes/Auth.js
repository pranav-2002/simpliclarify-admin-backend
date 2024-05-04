"use strict";

import Express from "express";

import AuthController from "../controllers/Auth";

import { expressUtils } from "../helpers";

const AuthRouter = new Express.Router();
const { signUp, login } = AuthController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

AuthRouter.use(extractHeaders);
AuthRouter.post("/sign-up", routeSanity, asyncWrapper(signUp));
AuthRouter.post("/login", routeSanity, asyncWrapper(login));
AuthRouter.use(setHeaders);

export default AuthRouter;
 