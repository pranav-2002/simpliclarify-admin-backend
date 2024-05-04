"use strict";
import bcrypt from "bcryptjs";

const AdminAuthentication = {
  apiSecretKeyGenerator,
};

export default AdminAuthentication;

export async function apiSecretKeyGenerator(
  adminName,
  contactNumber,
  email,
  password
) {
  // Creating API Secret on - Admin Name, Contact Number, Email

  const minifiedAdminName =
    adminName[parseInt(adminName.length / 2)] + adminName[adminName.length % 2];
  const minifiedContactNumber = parseInt(contactNumber / 999);
  const minifiedEmail = email.replace("@", "!@#$%^&*()");
  const stringToHash =
    minifiedAdminName + minifiedContactNumber + minifiedEmail + password;

  const salt = await bcrypt.genSalt(10);
  const finalApiSecret = await bcrypt.hash(stringToHash, salt);

  return finalApiSecret;
}
