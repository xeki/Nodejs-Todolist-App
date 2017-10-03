const {MongoClient,ObjectId} = require("mongodb");
var obj = new ObjectId();
console.log("ObjectId: ",obj);
let url="mongodb://localhost:27017/TodoApp";
MongoClient.connect(url,(err,db)=>{
  if(err){
     return  console.log("Unable to connect to the database");
  }
  console.log("Connected to mongodb server");

  // db.collection("Todos").findOneAndUpdate({_id:new ObjectId("59d3a302c7740e695a240c35")},{$set:{completed:true,location:"Philadelphia"}},{returnOriginal:false}).then((result)=>{
  //   console.log(result);
  // }).catch((err)=>{
  //   console.log(err);
  // });

  db.collection("Users").findOneAndUpdate({name:"Mike"},{$set:{name:"Moges"},$inc:{age:-4}},{returnOriginal:false}).then((result)=>{
    console.log(result);
  }).catch((error)=>{
    console.log(error);
  })


  db.close();
});
