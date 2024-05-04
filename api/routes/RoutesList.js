"use strict";

import Express from "express";

import RoutesListController from "../controllers/RoutesList";

import { expressUtils } from "../helpers";

const RoutesListRouter = new Express.Router();
const { createRoute, allRoutes, insertAll } = RoutesListController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

RoutesListRouter.use(extractHeaders);
RoutesListRouter.post("/create", routeSanity, asyncWrapper(createRoute));
RoutesListRouter.post("/insert-all", routeSanity, asyncWrapper(insertAll));
RoutesListRouter.post("/all", routeSanity, asyncWrapper(allRoutes));
RoutesListRouter.use(setHeaders);

export default RoutesListRouter;
