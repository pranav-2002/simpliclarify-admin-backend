"use strict";

const {
  RAZORPAYX_KEYID = "",
  RAZORPAYX_KEYSECRET = "",
  ALLOW_PAYOUTS = "",
  RAZORPAYX_ACCOUNT_NUMBER = "",
} = process.env;

const REQUIRED_CONFIG = [
  "RAZORPAYX_KEYID",
  "RAZORPAYX_KEYSECRET",
  "ALLOW_PAYOUTS",
  "RAZORPAYX_ACCOUNT_NUMBER",
];
REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    console.error("[Error] Missing RazorpayX APIs: " + key);
    return process.exit(1);
  }
});

const RAZORPAYX = {
  RAZORPAYX_KEYID,
  RAZORPAYX_KEYSECRET,
  RAZORPAYX_ACCOUNT_NUMBER,
};

const RAZORPAYX_CONFIG = {
  RAZORPAYX,
  ALLOW_PAYOUTS,
};

export default RAZORPAYX_CONFIG;
