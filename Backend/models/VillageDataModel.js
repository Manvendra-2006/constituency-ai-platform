import mongoose from "mongoose";

const villageDataSchema = new mongoose.Schema(
  {
    districtName: {
      type: String,
      required: true,
    },

    subDistrictName: {
      type: String,
      required: true,
    },

    villageName: {
      type: String,
      required: true,
      unique: true,
    },

    totalPopulation: {
      type: Number,
      default: 0,
    },

    govtPrimarySchool: {
      type: Number,
      default: 0,
    },

    govtMiddleSchool: {
      type: Number,
      default: 0,
    },

    govtSecondarySchool: {
      type: Number,
      default: 0,
    },

    primaryHealthCentre: {
      type: Number,
      default: 0,
    },

    communityHealthCentre: {
      type: Number,
      default: 0,
    },

    anganwadiCentre: {
      type: Number,
      default: 0,
    },

    allWeatherRoad: {
      type: Number,
      default: 0,
    },

    powerSupplyDomestic: {
      type: Number,
      default: 0,
    },

    latitude: {
      type: Number,

    },

    longitude: {
      type: Number,
    
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("VillageData", villageDataSchema);