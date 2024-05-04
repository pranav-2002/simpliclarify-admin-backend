"use strict";
import { CustomError } from "../helpers";

import _UniversityList from "../schemas/_UniversityList";

const UniversitiesModel = {
  allUniversities,
  saveAllUniversities,
};

export default UniversitiesModel;

async function allUniversities() {
  try {
    const response = await _UniversityList.find({});
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function saveAllUniversities(body) {
  try {
    const res = await _UniversityList.create(body);
    return res;
  } catch (e) {
    throw new CustomError(e);
  }
}
