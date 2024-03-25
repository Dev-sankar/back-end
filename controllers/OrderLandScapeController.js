import asyncHandler from "express-async-handler";
 import {orderLandScape} from "../models/OrderLandScapemodel.js"
 import nodemailer from 'nodemailer';
 import cloudinary from "../utils/cloudinary.js";
 import dotenv from 'dotenv';

 dotenv.config();


 /// @desc  POST orderLandScape
// // route     POST/api/orderlandScape/ landScape
// // @access Public
const orderLandScapes = asyncHandler(async (req,res) => {
    const { name,address,number,WhatsAppnumber,Date,email,} = req.body;
   

  
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'LandScape-details',
  });
    
    const data = await orderLandScape.create ({
      
        name,address,number,WhatsAppnumber,Date,email,image:{
            public_id: result.public_id,
            url: result.secure_url,
          }
      

    });
   
    if(data){
        res.status(201).json(data);

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL,
            pass: process.env.PASS
          }
        });
        var mailOptions = {
          from : 'sivasankarshiva008@gmail.com',
          to : email ,
          subject : 'Message From ULAVI New Registration',
          html : `
          <h5>Hello you successfully send the landscapeorder <h5/>
          `
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('id sent: ' + info.response);
          }
        });
    }else{
        res.status(400)
        throw new Error ("Invaild data")
    }
   
});


/// @desc Get all orderlandscape
// // route GET /api/users/orderlandscapes
// // @access Public
const getorderLandScapes = asyncHandler(async (req, res) => {
    const orderlandscapes = await orderLandScape.find({});
    res.json(orderlandscapes);
  });
  


  // @desc Get a single orderLandScape by ID
// route GET /api/users/ id
// @access Public
const getorderLandScapeId = asyncHandler(async (req, res) => {
    const orderlandScapeID = await orderLandScape.findById(req.params.id);
    if (orderlandScapeID) {
      res.json(orderlandScapeID);
    } else {
      res.status(404);
      throw new Error('LandScape order not found');
    }
  });
  


// @desc Delete OrderLandScape by ID
// route DELETE /api/orderLandScape/:id
// @access Private
const deleteorderLandScapeId = asyncHandler(async (req, res) => {
    const {id} =req.params;
    console.log("land",id);
     try  {
       const deletedlandScapeID= await orderLandScape.findByIdAndDelete(id)
       res.json({ message: ' LandScape order removed',deletedlandScapeID });
     } catch {
       res.status(404);
       throw new Error(' LandScape order not found');
     }
   });




   export {orderLandScapes,getorderLandScapes, getorderLandScapeId, deleteorderLandScapeId};