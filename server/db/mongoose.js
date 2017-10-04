const mongoose = require("mongoose");
const bluebird = require("bluebird");

//mongoose.Promise = global.Promise;
mongoose.Promise = bluebird;
var options={promiseLibrary:bluebird,useMongoClient:true};
mongoose.connect("mongodb://localhost:27017/TodoApp",options);

module.exports ={mongoose};
