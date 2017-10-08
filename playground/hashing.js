const{SHA256} = require('crypto-js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc!";

// bcrypt.genSalt(10, (err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//   })
// });

var hashedPw = "$2a$10$MLXdTj5bce/q7s.1CPENAeKV5l/PpKU7ly6W53eFZ6yHUktDCvP4q";

bcrypt.compare(password,hashedPw,(err,res)=>{
  console.log(res);
});
// var data ={id:10};
//
// var token = jwt.sign(data,"somesecret");
// var resultData = "";
// console.log(token);
// var decoded = jwt.verify(token,"somesecret");
// console.log(decoded);

// var message="Someone was user number 3";
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);
//
// var data ={id:4};
// var token ={data,hash:SHA256(JSON.stringify(data) +"somesecret").toString()}
//
// token.id=14;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// var resultHash = SHA256(JSON.stringify(token.data)+"somesecret").toString();
//
// if(resultHash===token.hash){
//   console.log("Data is intact");
// }else {
//   console.log("Data was corrupted");
// }
