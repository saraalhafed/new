const { mongoose } = require("../config/dbConnection");

// Country Schema:
const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    images: [],
    language: {
      type: String,
      trim: true,
      required: true,
    },
    capital_city: {
      type: String,
      trim: true,
      required: true,
    },
    religion: {
      type: String,
      trim: true,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
      required: true,
    },
    cultural_info: {
      type: String,
      trim: true,
      required: true,
    },
    food_specialties: {
      type: String,
      trim: true,
      required: true,
    },
    emergency_contacts: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, collection: "country" }
);

module.exports = mongoose.model("Country", CountrySchema);

