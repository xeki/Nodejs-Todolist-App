const mongoose = require("mongoose");
const bluebird = require("bluebird");

//mongoose.Promise = global.Promise;
mongoose.Promise = bluebird;
var options={promiseLibrary:bluebird,useMongoClient:true};
//mongoose.connect("mongodb://localhost:27017/TodoApp",options);

console.log("Connection  from mongoose: ",process.env.MONGODB_URI);
console.log("Type of port, ",typeof process.env.PORT);

mongoose.connect(process.env.MONGODB_URI,options);


module.exports ={mongoose};
