const {MongoClient,ObjectId} = require("mongodb");
var obj = new ObjectId();
console.log("ObjectId: ",obj);
let url="mongodb://localhost:27017/TodoApp";
MongoClient.connect(url,(err,db)=>{
  if(err){
     return  console.log("Unable to connect to the database");
  }
  console.log("Connected to mongodb server");

 //  db.collection("Todos").find({
 //    _id:new ObjectId("59d38143c7740e695a240c30")
 //  }).toArray().then((docs)=>{
 //    console.log("Todos: ",JSON.stringify(docs,undefined,2));
 //  },
 //    (err)=>{
 //    if(err){
 //     return  console.log("Error: ",err);
 //   }
 //   console.log("Result: ",result.ops);
 // });

//  db.collection("Todos").count({
//    _id:new ObjectId("59d38143c7740e695a240c30")
//  }).then((count)=>{
//    console.log("Todos count: ",count);
//  }).catch(
//    (err)=>{
//    if(err){
//     return  console.log("Error: ",err);
//   }
//   console.log("Result: ",result.ops);
// });

 db.collection('Users').count({name:'Andrew'}).then((count)=>{
   console.log("Andrew occured: ", count , " Times");
 }).catch((err)=>{
   console.log("Sorry an error has occured: ", err);
 });

  db.collection("Users").find({name:"Andrew"}).toArray().then((doc)=>{
    console.log(JSON.stringify(doc,null,3));
  }).catch((err)=>{
    console.log("Error: ",err);
  });
  db.close();
});
