"use strict";

import { CustomError } from "../helpers";
import fetch from "node-fetch";
import { RAZORPAYX_CONFIG } from "../../config";

const Payouts = {
  fetchPayouts,
};

export default Payouts;

async function fetchPayouts() {
  try {
    const { RAZORPAYX = {} } = RAZORPAYX_CONFIG;
    const { RAZORPAYX_KEYID, RAZORPAYX_KEYSECRET, RAZORPAYX_ACCOUNT_NUMBER } =
      RAZORPAYX;
    const URL = `https://${RAZORPAYX_KEYID}:${RAZORPAYX_KEYSECRET}@api.razorpay.com/v1/payouts?account_number=${RAZORPAYX_ACCOUNT_NUMBER}`;

    const response = await (
      await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}
