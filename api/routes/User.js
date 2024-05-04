"use strict";

import Express from "express";

import UserController from "../controllers/User";

import { expressUtils } from "../helpers";

const UserRouter = new Express.Router();
const { getAllUsersAdmin, getIndividualUserAdmin, creditCoinsInWallet } =
  UserController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

UserRouter.use(extractHeaders);
UserRouter.get("/get-all-users", routeSanity, asyncWrapper(getAllUsersAdmin));
UserRouter.get(
  "/get-individual-user",
  routeSanity,
  asyncWrapper(getIndividualUserAdmin)
);
UserRouter.post(
  "/credit-coins",
  routeSanity,
  asyncWrapper(creditCoinsInWallet)
);
UserRouter.use(setHeaders);

export default UserRouter;
