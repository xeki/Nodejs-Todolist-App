const{ObjectId}=require("mongodb");
const{mongoose}=require("./../server/db/mongoose");
const{Todo} = require("./../server/models/todo");
const{user} =require("./../server/models/users");


var id= "59d4c4748ba2b933807548d3dfd";

user.findOne().then((result)=>{
  console.log("------------- Find one ---------------");
  console.log(JSON.stringify(result,undefined,2));
}).catch((e)=>{
  console.log("------------- Find one ---------------");
  console.log(e);
});

user.find({_id:id}).then((result)=>{
  console.log("------------- just find ---------------");
  console.log(JSON.stringify(result,undefined,2));
}).catch((e)=>{
  console.log("------------- just find---------------");
  console.log(e);
});

user.findById(id).then((result)=>{
  console.log("------------- By Id ---------------");
  if(!result){
    return console.log("No record was returned");
  }
  console.log(JSON.stringify(result,undefined,2));
}).catch((e)=>{
    console.log("------------- By Id ---------------");
  console.log(e);
});
//var id ="59d5ea920984fe1384a81e1b9";

// if(!ObjectId.isValid(id)){
//   console.log("Id is not valid");
// }
// // Todo.find({
// //   _id:id
// // }).then((todos)=>{
// //   console.log("Todos",todos);
// // });
// //
// // Todo.findOne({
// // }).then((todo)=>{
// //   console.log("Todo ",todo);
// // });
//
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log("Record not found");
//   }
//   console.log("Todo: ",todo);
// }).catch((e)=>{
//   console.log(e);
// })
