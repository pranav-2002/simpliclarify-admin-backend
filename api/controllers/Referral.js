"use strict";

import { ResponseBody } from "../helpers";
import ReferralModel from "../models/Referral";

const ReferralController = {
  addReferralCode,
  getAllReferrals,
  enableDisableReferral,
};

export default ReferralController;

async function addReferralCode(request, response, next) {
  const { body } = request;
  const data = await ReferralModel.addReferralCode(body);
  const responseBody = new ResponseBody(
    201,
    "Referral code has been created by the admin",
    data
  );
  response.body = responseBody;
  next();
}

async function getAllReferrals(request, response, next) {
  const data = await ReferralModel.get();
  const responseBody = new ResponseBody(
    200,
    "Fetched all active referrals",
    data
  );
  response.body = responseBody;
  next();
}

async function enableDisableReferral(request, response, next) {
  const { body } = request;
  const data = await ReferralModel.enableDisableReferral(body);
  const responseBody = new ResponseBody(
    201,
    "Referral Enabled / Disabled",
    data
  );
  response.body = responseBody;
  next();
}
