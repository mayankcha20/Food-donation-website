import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role:{
    type:String,
     required:true,
  },
  aitem:{
    type:String,
    required:true,
  },
  oitem:{
    type:String,
    required:true,
  },
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  special:{
     type:String,
     required:true,
 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", schema);

