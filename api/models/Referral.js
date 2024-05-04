"use strict";

import { CustomError } from "../helpers";

import User from "../schemas/_User";
import Referral from "../schemas/_Referral";

const ReferralModel = { addReferralCode, get, enableDisableReferral };

export default ReferralModel;

async function addReferralCode(body) {
  const { active, code, value, limit, createdFor } = body;

  const referralExists = await Referral.findOne({ code });

  if (referralExists) {
    throw new CustomError("Referral code already exists. Try a new code");
  }

  const userReferralExists = await User.findOne({
    userReferralCode: code,
  });
  if (userReferralExists) {
    throw new CustomError(
      "Referral code already exists for user. Try a new code"
    );
  }

  const referral = new Referral({
    active,
    code,
    value,
    limit,
    createdFor,
  });

  await referral.save();
  return "Succesfully saved the referral code";
}

async function get() {
  try {
    const referrals = await Referral.find({});
    return referrals;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function enableDisableReferral(body) {
  try {
    const referral = await Referral.findOne({ code: body.code });
    referral.active = !referral.active;
    referral.save();
    return referral;
  } catch (error) {
    throw new CustomError(error);
  }
}
