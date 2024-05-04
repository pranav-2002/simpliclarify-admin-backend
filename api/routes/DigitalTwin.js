"use strict";

import Express from "express";
import DigitalTwinController from "../controllers/DigitalTwin";
import { expressUtils } from "../helpers";

const DigitalTwinRouter = new Express.Router();

const { allRequests } = DigitalTwinController;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

DigitalTwinRouter.use(extractHeaders);
DigitalTwinRouter.get("/requests", routeSanity, asyncWrapper(allRequests));
DigitalTwinRouter.use(setHeaders);

export default DigitalTwinRouter;
