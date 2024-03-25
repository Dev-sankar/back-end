import mongoose from "mongoose";

const SerivcesdetailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Services:{
        type:String,
        required:true
    },
    image:{
        public_id: { type:String },
        url: { type:String}
     },
},{
    timestamps: true,
    type: Date,
    default: Date.now
})

const Servicedetail = mongoose.model('ServiceDetail', SerivcesdetailSchema );
export {Servicedetail};