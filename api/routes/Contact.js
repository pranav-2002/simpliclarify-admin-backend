"use strict";

import Express from "express";

import ContactController from "../controllers/Contact";

import { expressUtils } from "../helpers";

const ContactRouter = new Express.Router();
const { getAllQueriesAdmin } = ContactController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

ContactRouter.use(extractHeaders);
ContactRouter.get(
  "/get-all-queries",
  routeSanity,
  asyncWrapper(getAllQueriesAdmin)
);
ContactRouter.use(setHeaders);

export default ContactRouter;
