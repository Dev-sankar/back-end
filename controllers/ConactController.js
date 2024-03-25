import asyncHandler from "express-async-handler";
 import nodemailer from 'nodemailer';
 import dotenv from 'dotenv';
 import {Conact} from '../models/conactModel.js'

 dotenv.config();


 /// @desc  POST orderLandScape
// // route     POST/api/orderlandScape/ landScape
// // @access Public
const ConactPost = asyncHandler(async (req,res) => {
    const { name,Subject,Message,email,} = req.body;
    const data = await Conact.create({
      name,Subject,Message,email
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




//GET method
const GetConact = asyncHandler(async (req, res) => {
  const getConact = await Conact.find({});
  res.json(getConact);
});





//DELETE Method

const deleteConactId = asyncHandler(async (req, res) => {
  const {id} =req.params;
   try  {
     const deletedConactID= await Conact.findByIdAndDelete(id)
     res.json({ message: ' Conact removed',deletedConactID });
   } catch {
     res.status(404);
     throw new Error(' Conact not found');
   }
 });



 export {ConactPost,GetConact,deleteConactId};