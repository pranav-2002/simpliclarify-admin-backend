"use strict";
import { CustomError } from "../helpers";

import _DigitalTwin from "../schemas/_DigitalTwin";

const DigitalTwinModel = {
  allRequests,
};

export default DigitalTwinModel;

async function allRequests() {
  try {
    const response = await _DigitalTwin.find({});
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}
