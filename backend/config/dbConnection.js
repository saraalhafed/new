"use strict";

// MongoDB Connection:
const mongoose = require("mongoose");

const dbConnection = function () {
  // Connect:
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("* DB Connected * ".yellow.underline))
    .catch((err) => console.log("* DB Not Connected * ".red, err));
};

module.exports = {
  mongoose,
  dbConnection,
};
