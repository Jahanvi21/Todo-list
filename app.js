var express = require('express');
var todocontrol = require('./controller/todocontrol');
var app = express();

//set template engine that is veiw
app.set('view engine','ejs');
//static files
app.use(express.static('./public'));
todocontrol(app);
//listen
app.listen(3000);
console.log('you are listening to port number 3000');
