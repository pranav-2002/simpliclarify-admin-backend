"use strict";

import { CustomError } from "../helpers";
import User from "../schemas/_User";
import Transaction from "../schemas/_Transaction";

const UserModel = {
  getAllUsersAdmin,
  getIndividualUserAdmin,
  creditCoinsInWallet,
};

export default UserModel;

async function getAllUsersAdmin() {
  try {
    const response = await User.find({}).select();
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function getIndividualUserAdmin(body) {
  try {
    const { userId } = body;
    const response = await User.find({ _id: userId }).select();
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function creditCoinsInWallet(body) {
  try {
    const { userId, coinsToCredit } = body;
    const userInfo = await User.findOne({ _id: userId });

    const transactionBody = {
      userId: userId,
      amount: coinsToCredit,
      type: "Deposit",
      purpose: "Gift",
    };
    const transaction = new Transaction(transactionBody);

    await transaction.save();

    userInfo.wallet += coinsToCredit;
    await userInfo.save();
  } catch (error) {
    throw new CustomError(error);
  }
}
