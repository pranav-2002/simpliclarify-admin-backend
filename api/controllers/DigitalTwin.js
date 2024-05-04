"use strict";

import { ResponseBody } from "../helpers";
import DigitalTwinModal from "../models/DigitalTwin";

const DigitalTwinController = {
  allRequests,
};

export default DigitalTwinController;

async function allRequests(request, response, next) {
  const data = await DigitalTwinModal.allRequests();
  const responseBody = new ResponseBody(200, "Fetched all DT Requests", data);
  response.body = responseBody;
  next();
}
