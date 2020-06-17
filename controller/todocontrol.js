var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connecting to database
mongoose.connect('mongodb+srv://test:test@cluster0-ww36i.mongodb.net/<dbname>?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch(error => handleError(error));
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
  });
//create a schema  that is a blue print or somrthing
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo',todoSchema);
/*var itemOne = Todo({item: 'Buy books'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});*/

//var data = [{item:'Morning walk'},{item:'Breakfast'},{item:'Take Bath'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports=function(app){
app.get('/todo',function(req,res){
  //get data from mongodb and pass it to view
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{todos:data});
  })
});
app.post('/todo',urlencodedParser,function(req,res){
  //get the data from view and add it to our mongodb
  var newTodo = Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
app.delete('/todo/:item',function(req,res){
  // delete the requested item from our mongodb
  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
}
