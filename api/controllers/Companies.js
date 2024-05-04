"use strict";

import { ResponseBody } from "../helpers";
import CompaniesModel from "../models/Companies";

const CompaniesController = {
  allCompanies,
};

export default CompaniesController;

async function allCompanies(request, response, next) {
  const data = await CompaniesModel.allCompanies();
  const responseBody = new ResponseBody(200, "Fetched all Companies", data);
  response.body = responseBody;
  next();
}
