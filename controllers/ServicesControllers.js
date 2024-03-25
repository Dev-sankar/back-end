import asyncHandler from 'express-async-handler';
import { Service } from '../models/ServicesModel.js';
import cloudinary from '../utils/cloudinary.js';


/// @desc  POST Serives
// // route     POST/api/Serivces/
// // @access Public

const service = asyncHandler(async (req,res) => {
    const {name, description} = req.body;
    
     try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Services',
    });
   
      const data = await Service.create ({
          name, description,image:{
            public_id: result.public_id,
            url: result.secure_url,
          },
  
      });
     
  
      if(data){
        
          res.status(201).json(data);
          
          
      }
      
     } catch (error) {
      console.log(error);
      res.status(400)
      throw new Error (" Service Invaild data")
     }
   
    
   
});




/// @desc Get all Services
// // route GET /api/users/Services
// // @access Public
const getservices= asyncHandler(async (req, res) => {
    const service= await Service.find({});
    res.json(service);
  });
  

  

// @desc Get a single Servies by ID
// route GET /api/servies/ id
// @access Public

const getserviceId = asyncHandler(async (req, res) => {
    const serviceID = await Service.findById(req.params.id);
    if (serviceID) {
      res.json(serviceID);
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  });



  // @desc Delete Servies by ID
// route DELETE /api/Servies/:id
// @access Private
const deleteserviesId = asyncHandler(async (req, res) => {
    const {id} =req.params;
    console.log(id);
     try  {
       const deleteservies= await Service.findByIdAndDelete(id)
       res.json({ message: 'Service removed',deleteservies });
     } catch {
       res.status(404);
       throw new Error('Service not found');
     }
   });
  




// @desc Update a design by ID
// route Patch /api/design/:id
// @access Private
const UpdateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name,  description,  } = req.body;
   
  // Find the service by ID
  try {
    const service = await Service.findById(id);
  
    if (service) {
      // If a new image is uploaded, delete the old image from 
      
      if (service.image && req.file) {
        await cloudinary.uploader.destroy(req.file.path);
      }
  
      // Upload the new image to Cloudinary
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "Services",
        });
  
        // Update the service with the new image
        service.name = name || service.name;
        service.description = description || service.description;
        service.image = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      } else {
        // Update the service without a new image
        service.name = name || service.name;
        service.description = description || service.description;
        service.image = service.image
      }
  
      // Save the updated service to the database
      const updatedService = await service.save();
    
      res.json(updatedService);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Service not found");
  }
    
   
  
});













export {service,getservices,getserviceId,deleteserviesId ,UpdateService};