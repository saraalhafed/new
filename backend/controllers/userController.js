"use strict";
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
module.exports = {

  list: async (req, res) => {
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },


  createWithfirebase:async (req, res) => {
    try {
        // 1. Log incoming data for debugging
        console.log('Firebase signup request:', req.body);

        const { email, username, provider, password } = req.body;

        // 2. Check for existing user
        let user = await User.findOne({ email });
        
        if (user) {
            // 3. If user exists, update provider if needed
            if (provider !== 'firebase') {
                user.provider = 'firebase';
                user.password = password; // Firebase UID
                await user.save();
            }
        } else {
            // 4. Create new user
            user = new User({
                email,
                username,
                provider: 'firebase',
                password, // Firebase UID
            });
            await user.save();
        }

        // 5. Generate JWT token
        const token = jwt.sign(
              user.toJSON(),
            process.env.ACCESS_KEY,
            { expiresIn: "120m" }
        );

        // 6. Send success response
        res.status(201).json({
            error: false,
            user: user,
            message: "User created successfully",
            token :token
        });

    } catch (error) {
        // 7. Error handling
        console.error('Firebase user creation error:', error);
        res.status(500).json({
            error: true,
            message: error.message || 'Error creating user'
        });
    }
},

  read: async (req, res, next) => {
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ); //blog
    res.status(202).send({
      error: false,
      data,
    });
  },
  
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

//userpackList funcs
updateUserPackList : async (req, res) => {
  console.log("Received UPDATE request:", req.params, req.body);
  try{
    const { userId, userPackListId } = req.params;
    const updateData = req.body;

    console.log('Attempting to update packList', { userId, userPackListId, updateData });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found' });
    }
    const packList = user.userPackLists.id(userPackListId);
    if (!packList) {
      return res.status(404).send({ error: true, message: 'userPackList not found' });
    }
    console.log( "befor updating",packList);
    Object.assign(packList, updateData);
    console.log(packList);
    const updatedUser = await user.save();

    res.status(200).send({
      error: false,
      data: {
        user: updatedUser,
        updatedPackList: packList, // Updated pack list
        userPackLists: updatedUser.userPackLists // Entire updated pack lists array
      },
      message: 'PackList updated successfully'
    });

  }catch (error) {
    console.error('Error in updatePackList:', error);
    res.status(500).send({
      error: true,
      message: error.message || "Server error"
    });
  }
},


   deletePackList : async (req, res) => {
    console.log(req.path)
    console.log("Received DELETE request:", req.params);
   
    try {

      const userId = req.params.userId;
      const userPackListId = req.params.userPackListId;
      console.log('Attempting to delete packList', { userId, userPackListId  });

     // Debug: First check what the document structure looks like
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found' });
    }
    
    console.log('User pack lists before deletion:', JSON.stringify(user.userPackLists, null, 2));
    
    // Check if we need to convert the ID to ObjectId
    const mongoose = require('mongoose');
    let searchCriteria;
    
    // Try to determine if we're dealing with MongoDB ObjectIDs or string IDs
    if (mongoose.Types.ObjectId.isValid(userPackListId )) {
      searchCriteria = { $pull: { userPackLists: { _id: new  mongoose.Types.ObjectId(userPackListId ) } } };
      console.log('Using ObjectId for deletion');
    } else {
      // Try both _id and id field names as we don't know which your schema uses
      searchCriteria = { 
        $pull: { 
          userPackLists: { 
           
               _id:userPackListId  
             
          } 
        } 
      };
      console.log('Using string ID for deletion');
    }
    
    // Attempt the update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      searchCriteria,
      { new: true, runValidators: true }
    );
    
    res.status(200).send({
      error: false,
      data: updatedUser,
      message: 'PackList removed successfully'
    });
  } catch (error) {
    console.error('Error in deletePackList:', error);
    res.status(500).send({
      error: true,
      message: error.message || "Server error"
    });
  }
  } 

};
