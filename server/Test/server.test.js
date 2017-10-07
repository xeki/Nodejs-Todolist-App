const expect = require("expect");
const request=require("supertest");

const{app}=require("./../server");
const{Todo} = require("./../models/todo");
const{User}=require("./../models/users");

const{ObjectId} = require("mongodb");

const todoList = [{_id:new ObjectId(),text:"First test to do"},{_id:new ObjectId(),text:"Second test to do"}];


beforeEach((done)=>{
  User.remove().then((res)=>{
    console.log("beforeEach user removed");
  }).catch((e)=>{console.log(e);});
  Todo.remove({})
     .then(()=>{ return Todo.insertMany(todoList); })
     .then(()=>done());

});

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
        done();
        return console.log(err);

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

 describe("POST /users",()=>{
  it("should post a user",(done)=>{
    let newUser = {"email":"123@server.com","password":"123abc","tokens":{"access":"access1","token":"token1"}};
    request(app)
    .post("/users")
    .send(newUser)
    .expect(200)
    .expect((result)=>{
      expect(result.body.user.email).toBe(newUser.email);
      expect(result.body.user.password).toBeFalsy();
    }).end((e)=>done(e));

  });

 });

  });
