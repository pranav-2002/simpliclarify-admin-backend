"use strict";

import { ResponseBody } from "../helpers";
import TransactionModel from "../models/Transaction";

const TransactionController = { getAllTransactions };

export default TransactionController;

async function getAllTransactions(request, response, next) {
  const data = await TransactionModel.getAllTransaction(request.params);
  const responseBody = new ResponseBody(201, "Got All Transactions", data);
  response.body = responseBody;
  next();
}
