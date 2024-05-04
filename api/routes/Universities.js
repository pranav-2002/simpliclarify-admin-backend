"use strict";

import Express from "express";
import UniversitiesController from "../controllers/Universities";
import { expressUtils } from "../helpers";

const UniversitiesRouter = new Express.Router();

const { allUniversities, saveAllUniversities } = UniversitiesController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

UniversitiesRouter.use(extractHeaders);
UniversitiesRouter.post("/all", routeSanity, asyncWrapper(allUniversities));
UniversitiesRouter.post("/add", routeSanity, asyncWrapper(saveAllUniversities));
UniversitiesRouter.use(setHeaders);

export default UniversitiesRouter;
