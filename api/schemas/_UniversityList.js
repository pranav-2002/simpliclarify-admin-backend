import mongoose from "mongoose";

const universityListSchema = mongoose.Schema({
  webPages: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  alphaTwoCode: {
    type: String,
    required: true,
  },
  stateProvince: {
    type: String,
    default: null,
  },
  domains: {
    type: Array,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const _UniversityList = new mongoose.model(
  "UniversityList",
  universityListSchema
);

export default _UniversityList;
