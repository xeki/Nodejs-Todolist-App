const express = require("express");
const bodyParser = require("body-parser");

const{ObjectId} = require("mongodb");


var{mongoose}=require("./db/mongoose");
var{Todo}=require("./models/todo");
var{user}=require("./models/users");

var app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.status(200).send("<h1> Welcome to Todo App Home </h1>");
});

app.get("/todos",(req,res)=>{

  Todo.find().then((todos)=>{
    res.send({todos});
  }).catch((e)=>{

    res.status(400).send("<h1> Resource not found </h1>");
  });

});


app.get("/todos/:id",(req,res)=>{

console.log("GET Todos/:id request ",new Date());

  let id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(404).send({error:"Invalid Id"});
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send("<h1> Resource not found </h1>");
    }
    return res.status(200).send({todo});
  }).catch((e)=>{
    return res.status(400).send("<h1> Resource not found </h1>");
  });

});


app.post("/todos",(req,res)=>{
console.log(req.body);
//res.send({status:`Delivered at: ${new Date()}` });

//let newTodo = new Todo(req.body);
let newTodo = new Todo({text:req.body.text});

newTodo.save().then((doc)=>{
  return res.send(doc);
  }).catch((err)=>{
return res.status(400).send("<h1> Resource not found </h1>");

});

});

app.delete("/todos/:id",(req,res)=>{

  let id = req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    return res.send(todo);
  }).catch((e)=>{
    return res.status(404).send();
  })
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
