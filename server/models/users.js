const _ = require("lodash");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema(  {
  email:
      {type:String,
      required:true,
      minlength:1,
      trim:true,
      unique:true,
      validate:{
        isAsync:true,
        validator:validator.isEmail,
        message: '{VALUE} is not a valid email'
            }},
    password:{
            type:String,required:true,
            minlength:6
              },
      tokens:[{
        access:{type:String,require:true},
        token:{type:String, require:true}
      }]

  });

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,["_id","email"]);

}
UserSchema.methods.generateAutToken= function () {
  var user = this;
  var access = "auth";
  var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

  user.tokens.push({access,token});

  return  user.save().then(()=>{
    return token;
  });
  // return new Promise((resolve,reject)=>{resolve(token)});
};

UserSchema.statics.findUserByToken = function (token) {
  var User = this;
  var decoded;
  try{
      decoded = jwt.verify(token,"abc123");
  }catch(e){
    return new Promise((resolve,reject)=>reject(e));
  }

    return User.findOne({
      "_id":decoded._id,
      "tokens.token":token,
      "tokens.access":"auth"
    }).then((user)=>{
        return user;
    }).catch((e)=>{
      return Promise.reject(e)
    });
};
var User = mongoose.model("Users",UserSchema);

module.exports={User};
