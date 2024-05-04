"use strict";

import Express from "express";

import AdminController from "../controllers/Admin";

import { expressUtils } from "../helpers";

const AdminRouter = new Express.Router();
const { allAdmins, editAdmin } = AdminController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

AdminRouter.use(extractHeaders);
AdminRouter.post("/all", routeSanity, asyncWrapper(allAdmins));
AdminRouter.post("/edit", routeSanity, asyncWrapper(editAdmin));
AdminRouter.use(setHeaders);

export default AdminRouter;
