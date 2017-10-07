let config = ()=>{
    var env = process.env.NODE_ENV||'development';
    if(env==='development'){
      process.env.PORT=3000;
      process.env.MONGODB_URI="mongodb://localhost:27017/TodoApp";
      process.env.NODE_ENV='development';
    }else if(env==='test'){
      process.env.PORT=3000;
      process.env.MONGODB_URI="mongodb://localhost:27017/TestTodoApp";
    }else{
      process.env.MONGODB_URI="mongodb://dev:Dev123Pass@ds111885.mlab.com:11885/todoapp";
    }
};

module.exports ={config};
