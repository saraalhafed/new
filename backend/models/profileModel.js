const { mongoose } = require("../config/dbConnection");

const ProfileSchema = new mongoose.Schema(
    {
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
      packLists:{
                 packList:{
                      name: {
                        type: String,
                        trim: true,
                        required: true,
                      },
                      items: [],
                 }
                 
                }
    },
    { timestamps: true, collection: "profile" }
  );
  
  module.exports = mongoose.model("Profile", ProfileSchema  );
  