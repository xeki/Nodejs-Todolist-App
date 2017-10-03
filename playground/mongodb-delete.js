const {MongoClient,ObjectId} = require("mongodb");
var obj = new ObjectId();
console.log("ObjectId: ",obj);
let url="mongodb://localhost:27017/TodoApp";
MongoClient.connect(url,(err,db)=>{
  if(err){
     return  console.log("Unable to connect to the database");
  }
  console.log("Connected to mongodb server");

//Delete Many
 // db.collection("Todos").deleteMany({text:"Eat Lunch"}).then((result)=>{
 //   console.log(result);
 // })
 // .catch((err)=>{
 //   console.log(err);
 // });


//Delete One
 // db.collection("Todos").deleteOne({text:"Eat lunch"})
 // .then(
 //   (result)=>{
 //     console.log(result);
 //   }
 // ).catch((err)=>{
 //   console.log(err);
 // })


//Find one and delete
 // db.collection('Todos').findOneAndDelete({completed:false})
 // .then((result)=>{
 //   console.log(result);
 // }).catch((err)=>{
 //   console.log(err);
 // });

  // db.collection("Users").deleteMany({name:"Andrew"}).
  // then((result)=>{console.log(result);})
  // .catch((err)=>{console.log(err);});
  //

  db.collection("Users").findOneAndDelete({_id:new ObjectId("59d37f93059e2c04581e7116")}).then((result)=>{
    console.log(result);
  }).then((err)=>{
    console.log(err);
  });
  db.close();
});
