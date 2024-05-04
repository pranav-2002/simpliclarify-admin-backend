"use strict";

import { ResponseBody } from "../helpers";
import UniversitiesModel from "../models/Universities";

const UniversitiesController = {
  allUniversities,
  saveAllUniversities,
};

export default UniversitiesController;

async function allUniversities(request, response, next) {
  const data = await UniversitiesModel.allUniversities();
  const responseBody = new ResponseBody(200, "Fetched all Universities", data);
  response.body = responseBody;
  next();
}

async function saveAllUniversities(request, response, next) {
  const { body } = request;
  const data = await UniversitiesModel.saveAllUniversities(body);
  const responseBody = new ResponseBody(200, "Saved the universities", data);
  response.body = responseBody;
  next();
}
