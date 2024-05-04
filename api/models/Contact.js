"use strict";
import { CustomError } from "../helpers";
import Contact from "../schemas/_Contact";

const ContactModel = {
  getAllQueriesAdmin,
};

export default ContactModel;

async function getAllQueriesAdmin() {
  try {
    const queries = await Contact.find({}).select();
    return queries;
  } catch (error) {
    throw new CustomError(error);
  }
}
