"use strict";

import Express from "express";

import MentorController from "../controllers/Mentor";

import { expressUtils } from "../helpers";

const MentorRouter = new Express.Router();

const {
  getAllMentorsAdmin,
  getIndividualMentorAdmin,
  updateDetails,
  getAllRequests,
  getAcceptedMentors,
  getRejectedMentors,
  getScheduleMentors,
  getPendingMentors,
  getRequestedPersonasList,
  changeStatus,
  requestForUpdateDetails,
  changePricing,
} = MentorController;

const { reqHandler, resHandler } = expressUtils;
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler;
const { setHeaders } = resHandler;

MentorRouter.use(extractHeaders);
MentorRouter.get(
  "/get-all-mentors",
  routeSanity,
  asyncWrapper(getAllMentorsAdmin)
);
MentorRouter.get(
  "/get-accepted-mentors",
  routeSanity,
  asyncWrapper(getAcceptedMentors)
);
MentorRouter.get(
  "/get-rejected-mentors",
  routeSanity,
  asyncWrapper(getRejectedMentors)
);
MentorRouter.get(
  "/get-pending-mentors",
  routeSanity,
  asyncWrapper(getPendingMentors)
);
MentorRouter.get(
  "/get-schedule-mentors",
  routeSanity,
  asyncWrapper(getScheduleMentors)
);
MentorRouter.get(
  "/get-individual-mentor",
  routeSanity,
  asyncWrapper(getIndividualMentorAdmin)
);
MentorRouter.post("/update/details", routeSanity, asyncWrapper(updateDetails));
MentorRouter.post(
  "/get/profile/requests",
  routeSanity,
  asyncWrapper(getAllRequests)
);
MentorRouter.get(
  "/get/personas/list",
  routeSanity,
  asyncWrapper(getRequestedPersonasList)
);
MentorRouter.post("/update/status", routeSanity, asyncWrapper(changeStatus));

MentorRouter.post("/update/pricing", routeSanity, asyncWrapper(changePricing));

MentorRouter.use(setHeaders);

export default MentorRouter;
