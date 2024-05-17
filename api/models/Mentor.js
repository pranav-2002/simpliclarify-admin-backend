"use strict";

import { CustomError } from "../helpers";
import _Mentor from "../schemas/_Mentor";
import _RejectMentor from "../schemas/_RejectMentor";
import _MailTemplate from "../schemas/_MailTemplate";
import MailTemplateModel from "../models/MailTemplateModel";
import unescapeJs from "unescape-js";
import { sendMail } from "../helpers/sendEmailTemplate";
import _MentorRequestProfile from "../schemas/_MentorUpdateProfile";
import { getCompanyLogo, getUniversityLogo } from "../helpers/mentorExtraInfo";
import fetch from "node-fetch";

const ML_MODEL_URL = process.env.ML_MODEL_URL || "";

const MentorModel = {
  getAllMentorsAdmin,
  getIndividualMentorAdmin,
  getAllProfileRequest,
  updateDetails,
  getMentorBasedOnStatus,
  getRequestedPersonasList,
  changeStatus,
  changePricing,
};

export default MentorModel;

async function changePricing(body) {
  try {
    const { allowedMentors, newMentorPrice, personaType } = body;
    const updateMentors = [];

    const mentors = await _Mentor.find({ _id: { $in: allowedMentors } });

    const updatePriceFailure = mentors.filter((mentor) => {
      if (
        parseInt(newMentorPrice) <=
        parseInt(mentor[personaType.toLowerCase()].mentorCut)
      ) {
        return mentor;
      } else {
        updateMentors.push(mentor);
      }
    });
    const updatePriceSuccess = updateMentors.filter(async (mentor) => {
      mentor[personaType.toLowerCase()].mentorPrice = newMentorPrice;
      await mentor.save();
    });
    return { updatePriceSuccess, updatePriceFailure };
  } catch (err) {
    throw new CustomError(err);
  }
}

async function getAllMentorsAdmin() {
  try {
    const response = await _Mentor.find({}).select();
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function getIndividualMentorAdmin(body) {
  try {
    const { mentorId } = body;
    const response = await _Mentor.find({ _id: mentorId }).select();
    return response;
  } catch (error) {
    throw new CustomError(error);
  }
}

async function sendMentorToDigitalTwin(mentor, operation) {
  if (!(operation === "add" || operation === "update")) {
    console.log(
      `Invalid operation ${operation} for send mentor to digital twin provided`
    );
    return;
  }
  let undergraduation =
    mentor.educationInformation.length > 0
      ? mentor.educationInformation[mentor.educationInformation.length - 1]
      : null;

  if (undergraduation == null) {
    console.log(
      "Invalid mentor undergraduation details: printing mentor details below"
    );
    console.log(mentor);
    return;
  }

  if (ML_MODEL_URL === "") {
    console.log("ML microservice is not reachable at the moment");
    return;
  }

  let request = {
    id: mentor._id,
    tenthscore: (mentor.tenthPercentage
      ? mentor.tenthPercentage
      : 0
    ).toString(),
    twelfthscore: (mentor.twelfthPercentage
      ? mentor.twelfthPercentage
      : 0
    ).toString(),
    interests:
      mentor.interests && mentor.interests.length > 0
        ? mentor.interests.join(",")
        : "None",
    university: undergraduation.universityName,
    degree: undergraduation.degreeType,
    course: undergraduation.course,
    CGPA: (undergraduation.cgpa ? undergraduation.cgpa : 0).toString(),
    GRE: (mentor.certifications.GRE ? mentor.certifications.GRE : 0).toString(),
    GMAT: (mentor.certifications.GMAT
      ? mentor.certifications.GMAT
      : 0
    ).toString(),
    TOEFL: (mentor.certifications.TOEFL
      ? mentor.certifications.TOEFL
      : 0
    ).toString(),
    IELTS: (mentor.certifications.IELTS
      ? mentor.certifications.IELTS
      : 0
    ).toString(),
    CAT: (mentor.certifications.CAT ? mentor.certifications.CAT : 0).toString(),
    GATE: (mentor.certifications.GATE
      ? mentor.certifications.GATE
      : 0
    ).toString(),
    papersPublished: (mentor.papersPublished
      ? mentor.papersPublished
      : 0
    ).toString(),
    patentsPublished: (mentor.patentsPublished
      ? mentor.patentsPublished
      : 0
    ).toString(),
    country: undergraduation.country,
    city: undergraduation.city,
  };

  let URL;
  if (operation === "add") {
    URL = ML_MODEL_URL + "/addmentor";
  } else {
    URL = ML_MODEL_URL + "/updatementor";
  }

  try {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    });

    response = await response.json();
    console.log("Successfully added/updated the mentor");
  } catch (e) {
    console.log(e);
  }
}

async function updateDetails(body) {
  try {
    const { requestId, mentorId, data, profileStatus } = body;

    const mentor = await _Mentor.findOne({ _id: mentorId });
    const mentorToUpdate = await _MentorRequestProfile.findOne({
      _id: requestId,
    });
    if (!mentor && !mentorToUpdate) {
      throw new CustomError("Mentor does not exist");
    }

    switch (profileStatus) {
      case "ACCEPTED":
        for (const key in data) {
          if (key === "educationInformation") {
            for (let i = 0; i < data.educationInformation.length; i++) {
              const edu = data.educationInformation[i];
              edu.universityLogo = await getUniversityLogo(edu.universityName);
            }
            mentor.educationInformation = data.educationInformation;
          } else if (key === "workExperience") {
            for (let i = 0; i < data.workExperience.length; i++) {
              const companyDetails = data.workExperience[i];
              const returnResult = await getCompanyLogo(
                companyDetails.companyName
              );
              companyDetails.companyLogo = returnResult;
            }

            mentor.workExperience = data.workExperience;
          } else if (key === "masters") {
            for (const eachMasterKey in data.masters) {
              mentor.masters[eachMasterKey] = data.masters[eachMasterKey];
            }
          } else if (key === "job") {
            for (const eachJobKey in data.job) {
              mentor.job[eachJobKey] = data.job[eachJobKey];
            }
          } else if (key === "entrepreneurship") {
            for (const eachEntrepreneurshipKey in data.entrepreneurship) {
              mentor.entrepreneurship[eachEntrepreneurshipKey] =
                data.entrepreneurship[eachEntrepreneurshipKey];
            }
          } else if (key === "k12") {
            for (const eachK12Key in data.k12) {
              mentor.k12[eachK12Key] = data.k12[eachK12Key];
            }
          } else {
            mentor[key] = data[key];
          }
        }
        mentorToUpdate.profileStatus = profileStatus;
        await mentor.save();
        await sendMentorToDigitalTwin(mentor, "update");
        await mentorToUpdate.save();
        return { mentor };

      case "REJECTED":
        mentorToUpdate.profileStatus = profileStatus;
        await mentorToUpdate.save();
        return;

      default:
        break;
    }
  } catch (error) {
    throw new CustomError({ error });
  }
}

async function changeStatus(body) {
  try {
    const { mentorId, status, mentorPrice, ranking, personaType, mentorCut } =
      body;

    const mentorUpdate = await _Mentor.findOne({ _id: mentorId });
    if (!mentorUpdate) {
      throw new CustomError("This mentor does not exist");
    }
    switch (status) {
      case "REJECTED": {
        mentorUpdate.status = status;
        const updatedMentor = await mentorUpdate.save();
        const {
          name = "",
          imageUrl = "",
          email = "",
          password = "",
          dateOfBirth = "",
          languages = [],
          countryCode = "",
          contactNumber = "",
          linkedInUrl = "",
          tenthPercentage = "",
          twelfthPercentage = "",
          certifications = {},
          papersPublished = "",
          patentsPublished = "",
          educationInformation = [],
          schoolEducationInformation = [],
          meetLink = "",
          workExperience = [],
          masters = {},
          job = {},
          entrepreneurship = {},
          k12 = {},
          suggestions = "",
          personas = [],
          interests = [],
        } = updatedMentor;

        const obj = {
          name,
          imageUrl,
          email,
          password,
          dateOfBirth,
          languages,
          countryCode,
          contactNumber,
          linkedInUrl,
          tenthPercentage,
          twelfthPercentage,
          certifications,
          papersPublished,
          patentsPublished,
          educationInformation,
          schoolEducationInformation,
          meetLink,
          workExperience,
          masters,
          job,
          entrepreneurship,
          k12,
          status,
          suggestions,
          personas,
          interests,
        };

        const rejectedMentor = new _RejectMentor(obj);
        await rejectedMentor.save();
        const mailTemplate = await _MailTemplate.findOne({
          templateId: "TEMPLATE_MENTOR_REJECT",
        });

        const { sourceMail, subject } = mailTemplate;
        const locals = { name };
        const renderTemplateObject = {
          templateBody: { templateId: "TEMPLATE_MENTOR_REJECT" },
          locals,
        };

        const body = await MailTemplateModel.renderTemplate(
          renderTemplateObject
        );
        const unescapedBody = _unescapeString(body);
        await sendMail(sourceMail, email, subject, unescapedBody);
        await _Mentor.deleteOne({ _id: mentorId });
        break;
      }
      case "SCHEDULE": {
        const { name, email } = mentorUpdate;

        if (!_checkType(personaType)) {
          throw new CustomError("Invalid personaType");
        }
        const type = personaType.toLowerCase();
        mentorUpdate.status = status;
        mentorUpdate[type].ranking = ranking;
        mentorUpdate[type].mentorPrice = mentorPrice;
        mentorUpdate[type].accepted = true;
        mentorUpdate[type].mentorCut = mentorCut;

        if (personaType != null) {
          mentorUpdate.personas.push(personaType);
        }
        await _addLogosToUniversityAndCompany(mentorUpdate);
        await mentorUpdate.save();

        await sendMentorToDigitalTwin(mentorUpdate, "add");

        const mailTemplate = await _MailTemplate.findOne({
          templateId: "TEMPLATE_MENTOR_ACCEPT",
        });

        const { sourceMail, subject } = mailTemplate;
        const renderTemplateObject = {
          templateBody: { templateId: "TEMPLATE_MENTOR_ACCEPT" },
          locals: {
            mentorName: name,
            mentorType: _getPersonaString(personaType),
            mentorPrice: mentorCut,
          },
        };

        const body = await MailTemplateModel.renderTemplate(
          renderTemplateObject
        );
        const unescapedBody = _unescapeString(body);
        await sendMail(sourceMail, email, subject, unescapedBody);
        break;
      }
      default: {
        throw new CustomError("Invalid statusType");
      }
    }
    return;
  } catch (error) {
    console.log(error);
    throw new CustomError({ error });
  }
}

async function getAllProfileRequest(body) {
  try {
    const results = [];
    const requests = await _MentorRequestProfile.find({}).populate("mentorId");
    requests.map((item) => {
      if (item.profileStatus === "PENDING") {
        results.push(item);
      }
    });
    return results;
    // console.log(requests);
  } catch (error) {
    throw new CustomError({ error });
  }
}

async function getMentorBasedOnStatus(body) {
  try {
    const { status } = body;
    if (status === "REJECTED") {
      const rejectedMentors = await _RejectMentor.find(body);
      return rejectedMentors;
    }
    const mentors = await _Mentor.find(body);
    return mentors;
  } catch (error) {
    throw new CustomError({ error });
  }
}

async function getRequestedPersonasList() {
  try {
    const job = await _Mentor.find({
      "job.requested": true,
      "job.accepted": false,
      "personas.0": { $exists: true },
    });

    const entrepreneurship = await _Mentor.find({
      "entrepreneurship.requested": true,
      "entrepreneurship.accepted": false,
      "personas.0": { $exists: true },
    });

    const masters = await _Mentor.find({
      "masters.requested": true,
      "masters.accepted": false,
      "personas.0": { $exists: true },
    });

    return { job, entrepreneurship, masters };
  } catch (error) {
    throw new CustomError(error);
  }
}

function _checkType(personaType) {
  const personaTypes = ["MASTERS", "JOB", "ENTREPRENEURSHIP", "K12"];
  return personaTypes.includes(personaType);
}

async function _addLogosToUniversityAndCompany(mentor) {
  for (let i = 0; i < mentor.educationInformation.length; i++) {
    const edu = mentor.educationInformation[i];
    edu.universityLogo = await getUniversityLogo(edu.universityName);
  }

  for (let i = 0; i < mentor.workExperience.length; i++) {
    const companyDetails = mentor.workExperience[i];
    const returnResult = await getCompanyLogo(companyDetails.companyName);
    companyDetails.companyLogo = returnResult;
  }
}

function _unescapeString(body) {
  return unescapeJs(body);
}

function _getPersonaString(personaType) {
  return personaType.substr(0, 1) + personaType.substr(1).toLowerCase();
}
