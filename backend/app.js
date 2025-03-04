"use strict";

// Create express app
const express = require("express");
const app = express();

// Import packages
require("colors");
require("express-async-errors");
require("dotenv").config();

// Environment variables
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1";
const MODE = process.env.MODE || "development";

// Connect to DB
const { dbConnection } = require("./config/dbConnection.js");
dbConnection();

// Middlewares
// Parse JSON
app.use(express.json());
// parse form data:
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// Enable CORS
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods you need
  credentials: true, // Allow cookies/credentials
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//cookie-parser middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Cookies:", req.cookies);
  next();
});

// Find/Pagination/Search/Sort:
app.use(require("./middlewares/findSearchSortPage.js"));

// App Routes

// HomePath: Welcome page
app.all("/", (req, res) => {
  res.send("Welcome to the API...");
});

// API Routes
app.use("/api", require("./routes"));

// Middleware to send an email

// Express error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Run the server
app.listen(
  PORT,
  console.log(
    `Server running in ${MODE} mode on ${HOST}:${PORT}`.blue.underline
  )
);
