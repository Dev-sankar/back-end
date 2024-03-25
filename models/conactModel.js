import mongoose from "mongoose";

const  ConsactSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
   email:{
    type: String,
    required: true
   },
   Subject:{
    type:String,
    required:true
   },
   Message:{
    type:String,
    required: true
   }
 
},{
    timestamps: true,
    type: Date,
    default: Date.now
})

const Conact = mongoose.model('Conact', ConsactSchema );
export {Conact};