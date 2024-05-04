"use strict";
import { CustomError } from "../helpers";

import Admin from "../schemas/Admin";

const AdminModel = {
  allAdmins,
  editAdmin,
};

export default AdminModel;

async function allAdmins() {
  try {
    const response = await Admin.find({});
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function editAdmin(body) {
  try {
    const { _id, accessRoutes } = body;
    const admin = await Admin.findOne({ _id: _id });
    if (!admin) {
      throw new CustomError("Admin does not exist");
    }
    admin.accessRoutes = accessRoutes;
    admin.save();
    return admin;
  } catch (error) {
    throw new CustomError(error);
  }
}
