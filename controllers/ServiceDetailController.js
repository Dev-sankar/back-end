import asyncHandler from 'express-async-handler';
import {Servicedetail} from '../models/ServicesDetailModel.js'
import cloudinary from '../utils/cloudinary.js';

import dotenv from 'dotenv';

dotenv.config();





/// @desc  POST Serives
// // route     POST/api/Servicedetail/
// // @access isadmin


const Createservice = asyncHandler(async (req,res) => {
    const {name,category, description,Price,Services} = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'service-details',
    });
    
    const data = await Servicedetail.create ({
        name,category, description,Price,Services,image:{
          public_id: result.public_id,
          url: result.secure_url,
      },
        
 
    });
    if(data){
        res.status(201).json(data);

    }else{
        res.status(400)
        throw new Error (" Service Invaild data")
    }
   
});




/// @desc Get all Services
// // route GET /api/users/Servicedetail
// // @access isadmin
const getservicesdetail= asyncHandler(async (req, res) => {
    const serviceDetail= await Servicedetail.find({});
    res.json(serviceDetail);
    // console.log(serviceDetail);
  });
  

  // @desc Get a single Servies by ID
// route GET /api/users/ Servicedetail/id
// @access isadmin
const getservicedetailId = asyncHandler(async (req, res) => {
  
    const serviceID = await Servicedetail.findById(req.params.id);
    if (serviceID) {
      res.json(serviceID);
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  });


    // @desc Get a single Servies by ID
// route GET /api/users/ Servicedetail/id
// @access isadmin
const getservicedetailName= asyncHandler(async (req, res) => {
try{
  const name = req.params.name;

if(!name){
  return res.status(400).json({error:"name require"});

}
const serviceName = await Servicedetail.find({name:name});

      res.json(serviceName);
} catch(error) {
  console.error('Error fetching users', error);
  res.status(500).json({error: 'Internal server Error'})
}

 
});







   // @desc Delete Servicedetail by ID
// route DELETE /api/users/Servicedetail:id
// @access isadmin
const deleteserviesdetailId = asyncHandler(async (req, res) => {
    const {id} =req.params;
    console.log(req.params);
     try  {
       const deleteserviesdetail= await Servicedetail.findByIdAndDelete(id)
       res.json({ message: 'Servicedetail removed',deleteserviesdetail });
     } catch {
       res.status(404);
       throw new Error('Servicedetail not found');
     }
   });
  



  





// @desc Update a design by ID
// route Patch /api/design/:id
// @access Private
const updateserviesdetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, description,Price,Services} = req.body;

  console.log(req.body);

  // Find the service by ID
  try {
    const servicedetail = await Servicedetail.findById(id);
  
    if (servicedetail) {
      // If a new image is uploaded, delete the old image from 
      
      if (servicedetail.image && req.file) {
        await cloudinary.uploader.destroy(req.file.path);
      }
  
      // Upload the new image to Cloudinary
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "service-details",
        });
  
        // Update the service with the new image
        servicedetail.name = name || servicedetail.name;
        servicedetail.category = category || servicedetail.category;
        servicedetail.Price = Price || servicedetail.Price;
        servicedetail.Services = Services || servicedetail.Services;
        servicedetail.description = description || servicedetail.description;
        servicedetail.image = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      } else {
        // Update the service without a new image
        servicedetail.name = name || servicedetail.name;
        servicedetail.category = category || servicedetail.category;
        servicedetail.Price = Price || servicedetail.Price;
        servicedetail.Services = Services || servicedetail.Services;
        servicedetail.description = description || servicedetail.description;
        servicedetail.image = servicedetail.image
      }
  
      // Save the updated service to the database
      const updatedService = await servicedetail.save();
    
      res.json(updatedService);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Service not found");
  }
    
   
  
});






export {  Createservice, getservicesdetail, getservicedetailId, deleteserviesdetailId,updateserviesdetail,getservicedetailName};