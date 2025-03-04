"use strict";
const Profile= require("../models/profileModel");

module.exports = {

  list: async (req, res) => {
    
      const data = await res.getModelList(Profile);
      
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Profile),
        data,
      
      });
  },

  create: async (req, res) => {
       const data = await Profile.create(req.body);
       res.status(201).send({
         error: false,
         data,
       });
     },

  read: async (req, res) => {
         const data = await Profile.findOne({ _id: req.params.id });
         res.status(200).send({
           error: false,
           data,
         });
       },

  update: async (req, res) => {
      const data = await Profile.findByIdAndUpdate(
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
       const data = await Profile.deleteOne({ _id: req.params.id });
   
       res.status(data.deletedCount ? 204 : 404).send({
         error: !data.deletedCount,
         data,
       });
     }, 
     
}