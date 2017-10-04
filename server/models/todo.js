const mongoose = require("mongoose");
var Todo = mongoose.model('Todo',{text:{
    type:String, required:true, minlength:1,
    trim:true
  },completed:{type:Boolean,default:false},
  CompletedAt:{
    default:null,
    type:Number,
    min:-10,
    max:10
  }});
module.exports={Todo};
