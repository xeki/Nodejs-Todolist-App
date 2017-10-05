const expect = require("expect");
const request=require("supertest");

const{app}=require("./../server");
const{Todo} = require("./../models/todo");
const{user}=require("./../models/users");

const{ObjectId} = require("mongodb");

const todoList = [{_id:new ObjectId(),text:"First to do"},{_id:new ObjectId(),text:"Second to do"}];


beforeEach((done)=>{
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

  });
