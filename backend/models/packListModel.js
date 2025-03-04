const { mongoose } = require("../config/dbConnection");


const PackListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  
    items: [],
    
  },
  { timestamps: true, collection: "packList" }
);

module.exports = mongoose.model("PackList", PackListSchema );

