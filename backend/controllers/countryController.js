"use strict";
const Country = require("../models/countryModel");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await res.getModelList(Country);
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Country),
        data,
      });
    } catch (error) {
      console.error("Authorization Error:", error);
      res.status(401).send({
        error: true,
        message: "Unauthorized: " + error.message,
      });
    }
  },

  create: async (req, res) => {
    const imageNames = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        imageNames.push("/uploads/" + file.filename);
      }
    }
    const data = await Country.create({
      ...req.body,
      images: imageNames,
    });
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res, next) => {
    try {
      const data = await Country.findOne({ _id: req.params.id });
      if (!data) {
        return res.status(404).send({
          error: true,
          message: "Country not found",
        });
      }
      res.status(200).send({
        error: false,
        data,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    const data = await Country.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ); 
    res.status(202).send({
      error: false,
      data,
    });
  },

  delete: async (req, res) => {
    const data = await Country.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
