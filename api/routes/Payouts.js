"use strict";

import Express from "express";
import { expressUtils } from "../helpers";
import PayoutsController from "../controllers/Payouts";

const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

const PayoutsRouter = new Express.Router();

const { fetchPayouts } = PayoutsController;

PayoutsRouter.use(extractHeaders);
PayoutsRouter.post("/get-all-payouts", routeSanity, asyncWrapper(fetchPayouts));

PayoutsRouter.use(setHeaders);

export default PayoutsRouter;
