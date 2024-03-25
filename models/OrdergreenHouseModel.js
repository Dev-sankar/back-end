import mongoose from "mongoose";


const greenhouseSchema = mongoose.Schema({
    Service:{
        type: String,
        enum:['HomeGraden','LandScape','Greenhouse'],
        required: true
    },
 
    Category:{
        type: String,
        required: true
    },
    Width:{
        type: String,
        required: true
    },

    Hight:{
        type: String,
        required: true
    },
    Maintainace:{
        type: String,
        enum:['need','notneed'],
        required: true
    },
    Location:{
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    number : {
        type: String,
        required: true
    },
    WhatsAppnumber:{
        type:String,
        required:true
    },
    Date : {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
    },
    image:{
        public_id: { type:String },
        url: { type:String}
     },
},{
    timestamps: true,
    type: Date,
    default: Date.now
});


const Green = mongoose.model('greenhouseorder', greenhouseSchema);

export {Green};
                 