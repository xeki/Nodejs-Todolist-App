const express = require("express");
const bodyParser = require("body-parser");


var{mongoose}=require("./db/mongoose");
var{Todo}=require("./models/todo");
var{user}=require("./models/users");

var app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/todos",(req,res)=>{

  Todo.find().then((todos)=>{
    res.send({todos});
  }).catch((e)=>{
    res.status(400).send(e);
  });

});



app.post("/todos",(req,res)=>{
console.log(req.body);
//res.send({status:`Delivered at: ${new Date()}` });

//let newTodo = new Todo(req.body);
let newTodo = new Todo({text:req.body.text});

newTodo.save().then((doc)=>{
  res.send(doc);
  console.log("Saved!");
}).catch((err)=>{
res.status(400).send(err);
console.log("Error");
});

});

app.listen(port,()=>{
  console.log("Express is up and running at server: ", port ," Time: ",new Date());
});

module.exports ={app};

// var newTodo = new Todo({text:"Cook dinner"});
//
// newTodo.save().then((res)=>{
// console.log(res);
// }).catch((err)=>{
//   console.log(err);
// });

// var newTodo = new Todo({text:'Going to sauna',completed:false,CompletedAt:10});
// var newTodo = new Todo({text:'Finnish this lesson   ',completed:false,CompletedAt:10});
//
// newTodo.save().then((result)=>{
//   console.log(result);
// }).catch((error)=>{
//   console.log(error);
// });
