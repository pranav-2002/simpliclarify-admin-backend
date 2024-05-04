"use strict";

import { ResponseBody } from "../helpers";
import MentorModel from "../models/Mentor";

const MentorController = {
  getAllMentorsAdmin,
  getIndividualMentorAdmin,
  updateDetails,
  getAllRequests,
  getMentorBasedOnStatus,
  getAcceptedMentors,
  getRejectedMentors,
  getScheduleMentors,
  getPendingMentors,
  getRequestedPersonasList,
  changeStatus,
  changePricing,
};

export default MentorController;

async function getAllMentorsAdmin(request, response, next) {
  const data = await MentorModel.getAllMentorsAdmin();
  const responseBody = new ResponseBody(
    201,
    "Fetched all mentors' information",
    data
  );
  response.body = responseBody;
  next();
}

async function changePricing(request, response, next) {
  const { body } = request;
  const data = await MentorModel.changePricing(body);
  const responseBody = new ResponseBody(200, "Pricing has been updated", data);
  response.body = responseBody;
  next();
}

async function getIndividualMentorAdmin(request, response, next) {
  const { body } = request;
  const data = await MentorModel.getIndividualMentorAdmin(body);
  const responseBody = new ResponseBody(
    201,
    "Fetched individual mentor for mentor",
    data
  );
  response.body = responseBody;
  next();
}

async function updateDetails(request, response, next) {
  const { body } = request;
  const data = await MentorModel.updateDetails(body);
  const responseBody = new ResponseBody(
    200,
    "Successfully updated mentor details.",
    data
  );
  response.body = responseBody;
  next();
}

async function getAllRequests(request, response, next) {
  const { body } = request;
  const data = await MentorModel.getAllProfileRequest(body);
  const responseBody = new ResponseBody(200, "Got all profile requests.", data);
  response.body = responseBody;
  next();
}

async function getMentorBasedOnStatus(body, response, next) {
  const data = await MentorModel.getMentorBasedOnStatus(body);
  const responseBody = new ResponseBody(
    200,
    "Fetched mentors based on status",
    data
  );
  response.body = responseBody;
  next();
}

async function getRequestedPersonasList(request, response, next) {
  const data = await MentorModel.getRequestedPersonasList();
  const responseBody = new ResponseBody(
    200,
    "Fetched persona list successfully",
    data
  );
  response.body = responseBody;
  next();
}

async function changeStatus(request, response, next) {
  const { body } = request;
  const data = await MentorModel.changeStatus(body);
  const responseBody = new ResponseBody(
    201,
    "Changed mentor status successfully",
    data
  );
  response.body = responseBody;
  next();
}

async function getAcceptedMentors(request, response, next) {
  getMentorBasedOnStatus({ status: "ACCEPTED" }, response, next);
}

async function getRejectedMentors(request, response, next) {
  getMentorBasedOnStatus({ status: "REJECTED" }, response, next);
}

async function getScheduleMentors(request, response, next) {
  getMentorBasedOnStatus({ status: "SCHEDULE" }, response, next);
}

async function getPendingMentors(request, response, next) {
  getMentorBasedOnStatus({ status: "PENDING" }, response, next);
}
