const{ObjectId}=require("mongodb");
const{Todo} = require("./../../models/todo");
const{User} = require("./../../models/users");
const jwt =require("jsonwebtoken");

const userOneId =new ObjectId();
const userTwoId =new ObjectId();
const todoList = [{_id:new ObjectId(),text:"First test to do"},{_id:new ObjectId(),text:"Second test to do"}];
const userList = [{"_id":userOneId,"email":"123@server.com","password":"userpass1","tokens":[{"access":"auth","token":jwt.sign({_id:userOneId,acess:"auth"},"abc123").toString()}]},{_id:userTwoId,email:"jen@exam.org",password:"userpass2"}];

const populateTodos = (done)=>{
 Todo.remove({})
     .then(()=>{ return Todo.insertMany(todoList); })
     .then(()=>done());
};

const populateUsers = (done)=>{
  User.remove().then(()=>{
      var userOne = new User(userList[0]).save();
      var userTwo= new User(userList[1]).save();
      return Promise.all([userOne,userTwo]);
  }
  ).then(()=>done());
}

module.exports={todoList,populateTodos,userList,populateUsers};
