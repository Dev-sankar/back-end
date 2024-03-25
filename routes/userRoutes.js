import express from 'express';
import multer from 'multer';
const router = express.Router();
import { authUser,
     registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserId,
    deleteUserId
     } from '../controllers/userController.js';
import { protect,isAdmin } from '../middleware/authMiddleware.js';
import { deletegreenId, getgreen, getgreenId, green } from '../controllers/OrdergreenhouseController.js'
import {orderLandScapes,getorderLandScapes, getorderLandScapeId, deleteorderLandScapeId}  from '../controllers/OrderLandScapeController.js'
import { service ,getservices,getserviceId,deleteserviesId,UpdateService} from '../controllers/ServicesControllers.js';
// import fromidable from 'express-formidable';
import {Createservice,getservicesdetail,getservicedetailId,deleteserviesdetailId,updateserviesdetail,getservicedetailName } from '../controllers/ServiceDetailController.js'
import {ConactPost,GetConact,deleteConactId} from '../controllers/ConactController.js'


// Multer configuration for handling file uploads
const storage = multer.diskStorage({
     filename: (req, file, cb) => {
       cb(null, file.originalname);
     },
   });
   const imageUpload = multer({ storage: storage });
   


router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(isAdmin,getAllUsers).put(isAdmin, updateUserProfile);
router.delete('/userdeleted/:id',isAdmin,deleteUserId)


router.post('/greenhouse',imageUpload.single('image') ,green);
router.get('/greenhouse',isAdmin, getgreen);
router.get('/greenhouse/:id',isAdmin, getgreenId);
router.delete('/greenhouse/:id',isAdmin,deletegreenId);

router.post('/orderLandScape' ,imageUpload.single('image'),orderLandScapes);
router.get('/orderLandScape',isAdmin,getorderLandScapes);
router.get('/orderLandScape/:id', isAdmin,getorderLandScapeId );
router.delete('/orderLandScape/:id',isAdmin,deleteorderLandScapeId);



router.post('/Services',imageUpload.single('image'),service);
router.get('/Services',getservices);
router.get('/Services/:id',getserviceId);
router.delete('/Services/:id',isAdmin,deleteserviesId);
router.put('/Services/update/:id',isAdmin,imageUpload.single('image'),UpdateService);

router.post('/ServicesDetails',imageUpload.single('image'),Createservice);
router.get('/ServicesDetails',isAdmin,getservicesdetail);
router.get('/ServicesDetails/:id',isAdmin, getservicedetailId);
router.get('/ServicesDetails/name/:name', getservicedetailName);
router.delete('/ServicesDetails/:id',isAdmin,deleteserviesdetailId);
router.put('/ServicesDetails/update/:id',isAdmin,imageUpload.single('image'),updateserviesdetail);

router.post('/Conactpost',ConactPost);
router.get('/Conactget',isAdmin,GetConact);
router.delete('/deleteConact',isAdmin,deleteConactId);




export default router;