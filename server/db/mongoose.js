const mongoose = require("mongoose");
const bluebird = require("bluebird");

//mongoose.Promise = global.Promise;
mongoose.Promise = bluebird;
var options={promiseLibrary:bluebird,useMongoClient:true};
//mongoose.connect("mongodb://localhost:27017/TodoApp",options);

mongoose.connect("mongodb://developer:<Dev123Pass>@ds111885.mlab.com:11885/todoapp",options);


module.exports ={mongoose};
