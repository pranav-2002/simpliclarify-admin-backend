"use strict";

import Express from "express";
import TransactionController from "../controllers/Transaction";
import { expressUtils } from "../helpers";

const TransactionRouter = new Express.Router();
const { getAllTransactions } = TransactionController;

const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

TransactionRouter.use(extractHeaders);

TransactionRouter.post(
  "/get-all",
  routeSanity,
  asyncWrapper(getAllTransactions)
);
TransactionRouter.use(setHeaders);

export default TransactionRouter;
