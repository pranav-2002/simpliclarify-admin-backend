"use strict";

import { CustomError } from "../helpers";
import Transaction from "../schemas/_Transaction";

const TransactionModel = {
  getAllTransaction,
};

export default TransactionModel;

async function getAllTransaction() {
  try {
    const transactionData = await Transaction.find({})
      .populate("userId", "userName")
      .lean();
    return transactionData;
  } catch (error) {
    throw new CustomError(error);
  }
}
