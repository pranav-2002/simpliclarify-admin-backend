"use strict";

import { ResponseBody } from "../helpers";
import AuthModel from "../models/Auth";

const ContactController = {
  signUp,
  login,
};

export default ContactController;

async function signUp(request, response, next) {
  const { body } = request;
  const data = await AuthModel.signUp(body);
  const responseBody = new ResponseBody(200, "Created a new Admin!", data);
  response.body = responseBody;
  next();
}

async function login(request, response, next) {
  const { body } = request;
  const data = await AuthModel.login(body);
  const responseBody = new ResponseBody(200, "Logged in Successfully!", data);
  response.body = responseBody;
  next();
}
