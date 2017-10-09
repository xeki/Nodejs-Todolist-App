const expect = require("expect");
const request=require("supertest");

const{app}=require("./../server");
const{Todo} = require("./../models/todo");
const{User}=require("./../models/users");

const{ObjectId} = require("mongodb");
const{todoList,populateTodos,userList,populateUsers}=require("./seed/seed");

const jwt = require("jsonwebtoken");


beforeEach(populateTodos);
beforeEach(populateUsers)

describe("POST /todos", ()=>{
  it("should create a new todo", (done)=>{
    let text = "Test todo text";

    request(app)
    .post("/todos")
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBeTruthy();
      expect(res.body.text).toBe(text);
      }).end((err,res)=>{
      if(err){
        return done();
        //return console.log(err);

      }
      Todo.find({text}).then((result)=>{
        expect(result.length).toBe(1);
        expect(result[0].text).toBe(text);

        done();
      }).catch((e)=>done(e));
    });
  });

  it("should not create todo with invalid body data",(done)=>{
    request(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
      return done(err);
    }
    Todo.find().then((result)=>{
      expect(result.length).toBe(2);
      done();
    }).catch((e)=>done(e));
  });
  });

  describe("GET /todos",()=>{
     it("should get all the todos",(done)=>{
       request(app)
       .get("/todos")
       .expect(200)
       .expect((result)=>{
         expect(result.body.todos.length).toBe(2);
         expect(result.body).toBeTruthy();
       }).end(done);

       });

     });

     describe("/GET:/id",()=>{

     it("should return a record",(done)=>{
       let id = todoList[0]._id.toHexString();

       request(app)
       .get(`/todos/${id}`)
       .expect(200)
       .expect((res)=>{
         expect(res.body.todo.text).toBe(todoList[0].text);
       }).end(done);
     });

     it("should return 404 if todo id not found",(done)=>{
       let tempId = new ObjectId();
       tempId = tempId.toHexString();
       request(app)
       .get(`/todos/${tempId}`)
       .expect(404)
       .end(done);
     });

     it("should return 404 for non valid id",(done)=>{
       request(app)
       .get("/todos/what")
       .expect(404)
       .end(done);
     });
 });

 describe("DELETE /todos/:id",()=>{
   it("It should delet a todo by Id",(done)=>{

      let idToDelete = todoList[0]._id.toHexString();

      request(app)
      .delete(`/todos/${idToDelete}`)
      .expect(200)
      .expect((result)=>{
        expect(result.body.todo._id).toBe(idToDelete);

        Todo.findById(idToDelete).then((todo)=>{
          expect(todo).toBeFalsy();
        }).catch((err)=>{
          done(err);
        });
      }).end((err)=>{
        return done(err);
      });

   });

  it("should return 404 when todo id is not found",(done)=>{
    let idToDelete = new ObjectId();

    request(app)
    .delete(`/todos/${idToDelete.toHexString()}`)
    .expect(404)
    .end(done);

  });

  it("it should return 404 for invalid id",(done)=>{

    request(app)
    .delete("/todos/wrongId")
    .expect(404)
    .end(done);
  });

 });

 describe("PATCH /todos/:id",()=>{

 it("it should update a todo",(done)=>{

   let hexId = todoList[0]._id.toHexString();
   let body ={completed:true};

   request(app)
   .patch(`/todos/${hexId}`)
   .send(body)
   .expect(200)
   .expect((result)=>{
     expect(result.body.todo.completed).toBeTruthy();
     expect(result.body.todo.CompletedAt).toBeTruthy();
   }).end((e)=>done(e));
 });

 it("it should return 404 for a wrong id",(done)=>{
   let hexId = new ObjectId().toHexString();
   request(app)
   .patch(`/todos/${hexId}`)
   .expect(404)
   .end((e)=>done(e));
 });

 it("It should return 404 fo invalid id",(done)=>{
   request(app)
   .patch("/todos/abc123")
   .expect(404)
   .end((e)=>done(e));
 });

 });
 describe("GET /users/me",()=>{
   it("should return user if user is authenticated",(done)=>{
     request(app)
     .get("/users/me")
     .set({"x-auth":userList[0].tokens[0].token})
     .expect(200)
     .expect((result)=>{
       expect(result.body.user.email).toBe(userList[0].email);
       expect(result.body.user._id).toBe(userList[0]._id.toHexString());
     }).end(()=>done());
   });

   it("should return 401 if user is not authenticated",(done)=>{
     request(app)
     .get("/users/me")
     .expect(401)
     .expect((result)=>{
       expect(result.body).toBeFalsy();
     })
     .end(()=>done());
   });
 });
 describe("POST /users",()=>{
  it("should create a user",(done)=>{
    const newUserId = new ObjectId();
    let newUser = {"_id":newUserId,"email":"mail@server.com","password":"pass123","tokens":{"access":"auth","token":jwt.sign({_id:newUserId,acess:"auth"},"abc123").toString()}};
    request(app)
    .post("/users")
    .send(newUser)
    .expect(200)
    .expect((result)=>{
      expect(result.headers["x-auth"]).toBeTruthy();
      expect(result.body.user.email).toBe(newUser.email);
      expect(result.body.user.password).toBeFalsy();
    }).end((e)=>{
      if(e){
        done(e);
      }else{
        User.findOne({email:newUser.email}).then((user)=>{
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(newUser.password);
          done();
        });

      }
    });

  });
    it("shouldn't create a user when email and password are invalid",(done)=>{
      let newUser = {"_id":new ObjectId(),"email":"mail.server.com","password":"pass"};

      request(app)
      .post("/users")
      .send(newUser)
      .expect(400)
      .end((e)=>done(e));


    });
  it("shouldn't create a user when email is already in use",(done)=>{
    const newUserId = new ObjectId();
    let newUser = {"_id":newUserId,"email":userList[0].email,"password":"pass123","tokens":{"access":"auth","token":jwt.sign({_id:newUserId,acess:"auth"},"abc123").toString()}};
    request(app)
    .post("/users")
    .send(newUser)
    .expect(400)
    .end((e)=>done(e));
  });

 });
 describe("POST /users/login",()=>{
   it("should login valid user and return authentication token",(done)=>{
     request(app)
     .post("/users/login")
     .send({email:userList[0].email,password:userList[0].password})
     .expect(200)
     .expect((result)=>{
       expect(result.headers["x-auth"]).toBeTruthy();
       expect(result.body.user.email).toBe(userList[0].email);
     }).end((err,res)=>{
       if(err){
         done();
       }else{
         User.findById({_id:userList[0]._id}).then((user)=>{
           expect(user.tokens[user.tokens.length-1].token).toBe(res.headers["x-auth"]);
           done();
         }).catch((e)=>done(e));
       }
     });
   });

   it("should reject invalid login",(done)=>{
     request(app)
     .post("/users/login")
     .send({email:userList[0].email,password:"Pass123!"})
     .expect(400)
     .end(done);
   });
 });

 describe("DELETE /users/me/token",()=>{
   it("should remove auth token on logout ",(done)=>{
     request(app)
     .delete("/users/me/token")
     .set({"x-auth":userList[0].tokens[0].token})
     .send(userList[0])
     .expect(200)
     .end((err,res)=>{
       if(err){
        return done(err);
       }else{
         User.findById({_id:userList[0]._id.toHexString()}).then((user)=>{
           expect(user.tokens.length).toBe(0);
           done();
         }).catch(()=>done());
       }
     });
   });
 });
  });
