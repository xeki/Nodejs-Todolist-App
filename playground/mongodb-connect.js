const {MongoClient,ObjectId} = require("mongodb");
var obj = new ObjectId();
console.log("ObjectId: ",obj);
let url="mongodb://localhost:27017/TodoApp";
MongoClient.connect(url,(err,db)=>{
  if(err){
     return  console.log("Unable to connect to the database");
  }
  console.log("Connected to mongodb server");

  // db.collection("Todo").insertOne({text:"Something to do", completed:false},(err,res)=>{
  //   if(err){
  //     return console.log("Unable to insert to do",err);
  //   }
  //   console.log("Successfully inserted; ",JSON.stringify(res.ops,undefined,2));
  // });

  db.collection("Users").insertOne({name:'Andrew',age:25},(err,result)=>{
    if(err){
      return console.log("Unable to insert a record to the mongo server ",err);
    }
    console.log("File inserted successfully: ",JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
  });
  db.close();
});
