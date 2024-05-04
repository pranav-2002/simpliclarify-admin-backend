"use strict";

import Payouts from "../models/Payouts";
import { ResponseBody } from "../helpers";

const PayoutsController = {
  fetchPayouts,
};
export default PayoutsController;

async function fetchPayouts(request, response, next) {
  const data = await Payouts.fetchPayouts();
  const responseBody = new ResponseBody(200, "Fetched payouts", data);
  response.body = responseBody;
  next();
}
