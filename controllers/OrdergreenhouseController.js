import asyncHandler from 'express-async-handler';
import cloudinary from '../utils/cloudinary.js';
import {Green} from "../models/OrdergreenHouseModel.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();


/// @desc  POST greenhouse
// // route     POST/api/greenhouse/Ordergreenhouse
// // @access Public
const green = asyncHandler(async (req,res) => {
  const {Service, Category, Width,Hight,Maintainace,Location,name,address,number,WhatsAppnumber,Date,email} = req.body;
 


  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'Greenhouse-details',
});

  
  const data = await Green.create ({
    Service, Category, Width,Hight,Maintainace,Location,name,address,number,WhatsAppnumber,Date,email,image:{
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
        to : email,
        subject : 'Message From ULAVI New Order',
        html : `
        <h5>
        "Congratulations on successfully placing your order with us! 🌱 Your commitment to nurturing your garden is truly commendable. We're thrilled to be part of your gardening journey and can't wait for you to receive your selected items. Our team is now working diligently to process your order and ensure its swift delivery to your doorstep. Should you have any questions or need assistance, feel free to reach out to us anytime. Thank you for choosing our homegardening and greenhouse services. Happy gardening!"<h5/>
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
 
  
})



/// @desc Get all Ordergreenhouse
// // route GET /api/greenhouse/getgreen
// // @access Public
const getgreen = asyncHandler(async (req, res) => {
  const ordergreen = await Green.find({});
  res.json(ordergreen);
});


// @desc Get a single Ordergreenhouse by ID
// route GET /api/greenhouse/ id
// @access Public
const getgreenId = asyncHandler(async (req, res) => {
  const ordergreen = await Green.findById(req.params.id);
  if (ordergreen) {
    res.json(ordergreen);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});


// @desc Delete Ordergreenhouse by ID
// route DELETE /api/greenhouse/:id
// @access Private
const deletegreenId = asyncHandler(async (req, res) => {
    const {id} =req.params;
    console.log(id);
     try  {
       const ordergreen= await Green.findByIdAndDelete(id)
       res.json({ message: 'order removed',ordergreen });
     } catch {
       res.status(404);
       throw new Error('order not found');
     }
   });
  
  
  
  
  
  
  
  



export { green,getgreen,getgreenId,deletegreenId };