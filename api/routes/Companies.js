"use strict";

import Express from "express";
import CompaniesController from "../controllers/Companies";
import { expressUtils } from "../helpers";

const CompaniesRouter = new Express.Router();

const { allCompanies } = CompaniesController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

CompaniesRouter.use(extractHeaders);
CompaniesRouter.get("/all", routeSanity, asyncWrapper(allCompanies));
CompaniesRouter.use(setHeaders);

export default CompaniesRouter;
