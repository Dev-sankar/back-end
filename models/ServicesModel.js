import mongoose from "mongoose";

const ServicesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
   description : {
    type: String,
    required: true
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

const Service = mongoose.model('Services', ServicesSchema );
export {Service};