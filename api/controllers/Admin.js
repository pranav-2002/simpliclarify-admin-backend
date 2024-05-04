"use strict";

import { ResponseBody } from "../helpers";
import AdminModel from "../models/Admin";

const AdminController = {
  allAdmins,
  editAdmin,
};

export default AdminController;

async function allAdmins(request, response, next) {
  const data = await AdminModel.allAdmins();
  const responseBody = new ResponseBody(200, "Fetched all Admins", data);
  response.body = responseBody;
  next();
}

async function editAdmin(request, response, next) {
  const { body } = request;
  const data = await AdminModel.editAdmin(body);
  const responseBody = new ResponseBody(200, "Edited the Admin data", data);
  response.body = responseBody;
  next();
}
