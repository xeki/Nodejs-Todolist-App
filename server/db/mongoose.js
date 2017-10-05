const mongoose = require("mongoose");
const bluebird = require("bluebird");

//mongoose.Promise = global.Promise;
mongoose.Promise = bluebird;
var options={promiseLibrary:bluebird,useMongoClient:true};
//mongoose.connect("mongodb://localhost:27017/TodoApp",options);
const localConn = "mongodb://localhost:27017/TodoApp";
const remoteConn = "mongodb://dev:Dev123Pass@ds111885.mlab.com:11885/todoapp";

let conn = process.env.PORT?remoteConn:localConn;
mongoose.connect(conn,options);


module.exports ={mongoose};
