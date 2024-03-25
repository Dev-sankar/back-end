import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


// @desc Auth user/set token
// route POST/api/users/auth
//@access public
const authUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
          token:user.token,
          success:true,
            message: 'User login done',
          
        });
        
        
    }else{
        res.status(401).json({ message: 'login failed'})
        
    }
});



// @desc Register a new user
// route POST/api/users
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email })

    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email
        });
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
            <h5>
            "Welcome to our homegardening and greenhouse services ULAVI We're delighted to have you join our community of green-thumbed enthusiasts. By registering with us, you're taking the first step towards creating your own thriving garden oasis. Get ready to explore a world of gardening tips, expert advice, and high-quality products tailored to your needs. Let's embark on this green journey together and watch your garden flourish! Happy gardening!" <h5/>
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
        res.status(400);
        throw new Error('Invalid user data');
    }

});



// @desc Logout User
// route POST/api/users/logout
//@access public
const logoutUser = asyncHandler(async (req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0),
    });


    res.status(200).json({ message: 'User Logged out'})
});



// @desc get user profile
// route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req,res) => {
    const user = {
        _id: req.user._id,
        name:req.user.name,
        email: req.user.email,
    }

    res.status(200).json(user)
});

/// @desc Get all Services
// // route GET /api/users/Servicedetail
// // @access isadmin
const getAllUsers= asyncHandler(async (req, res) => {
    const UserDetails= await User.find({});
    res.json(UserDetails);
  });


  // @desc Get a single User by ID
// route GET /api/User/ id
// @access isadmin
const getUserId = asyncHandler(async (req, res) => {
    const UserID = await User.findById(req.params.id);
    if (UserID) {
      res.json(UserID);
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  });

  


// @desc update user profile
// route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);


    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

           const updatedUser  = await user.save();
           res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
           });
    }else {
        res.status(404);
        throw new Error('Serivce not found')
    }
});





   // @desc Delete Servicedetail by ID
// route DELETE /api/users/Servicedetail:id
// @access isadmin
const deleteUserId = asyncHandler(async (req, res) => {
  const {id} =req.params;

   try  {
     const deleteUser= await  User.findByIdAndDelete(id)
     res.json({ message: 'User removed',deleteUser });
   } catch {
     res.status(404);
     throw new Error('User not found');
   }
 });


export{
     authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserId,
    deleteUserId
 };