"use strict";

import { ResponseBody } from "../helpers";
import ContactModel from "../models/Contact";

const ContactController = {
  getAllQueriesAdmin,
};

export default ContactController;

async function getAllQueriesAdmin(request, response, next) {
  const { body } = request;
  const data = await ContactModel.getAllQueriesAdmin(body);
  const responseBody = new ResponseBody(200, "Fetched all queries", data);
  response.body = responseBody;
  next();
}
