"use strict";
import { CustomError } from "../helpers";
import { apiSecretKeyGenerator } from "../helpers/apiSecret";
import Methods from "../helpers/Methods";
import Admin from "../schemas/Admin";

const AuthModel = {
  signUp,
  login,
};

export default AuthModel;

async function signUp(body) {
  const { email, adminName, contactNumber } = body;
  const foundUserByMailId = await Admin.findOne({ email });

  if (foundUserByMailId && foundUserByMailId.email === email) {
    if (foundUserByMailId.adminName === adminName) {
      throw new CustomError({
        statusCode: 403,
        message: "Account already registered with this Admin Name",
        code: "SIMPLICLARIFY_AUTH_04",
      });
    } else {
      throw new CustomError({
        statusCode: 403,
        message: "Account already registered with this email address",
        code: "SIMPLICLARIFY_AUTH_04",
      });
    }
  }
  const foundUserByAdminName = await Admin.findOne({ adminName });

  if (foundUserByAdminName && foundUserByAdminName.adminName === adminName) {
    throw new CustomError({
      statusCode: 403,
      message: "Account already registered with this Admin Name",
      code: "SIMPLICLARIFY_AUTH_04",
    });
  }

  const newUser = new Admin(body);
  const createdUser = await newUser.save();

  const apiSecretKey = await apiSecretKeyGenerator(
    adminName,
    contactNumber,
    email,
    createdUser.password
  );

  const userWithApiSecretKeyUpdate = await Admin.findOne({ email });
  userWithApiSecretKeyUpdate.apiSecretKey = apiSecretKey;
  await userWithApiSecretKeyUpdate.save();

  return createdUser;
}

async function login(body) {
  console.log("Adminn coming in,s");
  try {
    const { email, password } = body;
    const admin = await Admin.findOne({ email });

    console.log("Adminn", admin);
    if (!admin) {
      throw new CustomError("Admin does not exist");
    }
    if (!(await Methods.comparePasswords(password, admin.password))) {
      throw new CustomError("Looks like you have entered wrong password");
    }

    const updatedAdmin = admin.toJSON();
    delete updatedAdmin.password;

    return updatedAdmin;
  } catch (error) {
    throw new CustomError({ error });
  }
}
