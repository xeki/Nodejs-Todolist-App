const{ObjectId}=require("mongodb");
const{mongoose}=require("./../server/db/mongoose");
const{Todo} = require("./../server/models/todo");
const{user} =require("./../server/models/users");

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove({}).then((doc)=>{
//   console.log(doc);
// });
//
Todo.findByIdAndRemove("59d642468377e961ed11954a").then((doc)=>{
  console.log(doc);
});
