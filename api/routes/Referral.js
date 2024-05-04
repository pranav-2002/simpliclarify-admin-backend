"use strict";

import Express from "express";
import { expressUtils } from "../helpers";
import Referral from "../controllers/Referral";

const ReferralRouter = new Express.Router();
const { addReferralCode, getAllReferrals, enableDisableReferral } = Referral;
const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

ReferralRouter.use(extractHeaders);
ReferralRouter.post(
  "/add-referral",
  routeSanity,
  asyncWrapper(addReferralCode)
);
ReferralRouter.get("/active", routeSanity, asyncWrapper(getAllReferrals));
ReferralRouter.post(
  "/enable-disable-promo",
  routeSanity,
  asyncWrapper(enableDisableReferral)
);
ReferralRouter.use(setHeaders);

export default ReferralRouter;
