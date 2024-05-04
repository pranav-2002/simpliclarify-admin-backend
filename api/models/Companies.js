"use strict";
import { CustomError } from "../helpers";

import _CompanyList from "../schemas/_CompanyList";

const CompaniesModal = {
  allCompanies,
};

export default CompaniesModal;

async function allCompanies() {
  try {
    const response = await _CompanyList.find({});
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}
