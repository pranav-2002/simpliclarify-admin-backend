"use strict";

import { ResponseBody } from "../helpers";
import UserModel from "../models/User";

const UserController = {
  getAllUsersAdmin,
  getIndividualUserAdmin,
  creditCoinsInWallet,
};

export default UserController;

async function getAllUsersAdmin(request, response, next) {
  const data = await UserModel.getAllUsersAdmin();
  const responseBody = new ResponseBody(200, "Fetched all Users", data);
  response.body = responseBody;
  next();
}

async function getIndividualUserAdmin(request, response, next) {
  const { body = {} } = request
  const data = await UserModel.getIndividualUserAdmin(body)
  const responseBody = new ResponseBody(200, "Fetched Individual User", data);
  response.body = responseBody;
  next();
}

async function creditCoinsInWallet(request, response, next) {
  const { body } = request;

  const data = await UserModel.creditCoinsInWallet(body);
  const responseBody = new ResponseBody(
    200,
    "Successfully Creditted CC to the User"
  );
  response.body = responseBody;
  next();
}
