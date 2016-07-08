
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var mongoose = require('mongoose');
  app = express();
  post = require('./routes/post');
var path = require('path');

  // ToDoスキーマを定義する
  var Schema = mongoose.Schema;
  var todoSchema = new Schema({
    isCheck     : {type: Boolean, default: false},
    text        : String,
    createdDate : {type: Date, default: Date.now},
    limitDate   : Date
  });
  mongoose.model('Todo', todoSchema);



  app.set('views',__dirname + '/views');
  app.set('view engine', 'ejs');


//middleware

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
  app.use(express.static(path.join(__dirname, 'public')));

  mongoose.connect('mongodb://localhost/local');

//routing

// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
app.get('/todo', function(req, res) {
  var Todo = mongoose.model('Todo');
  // すべてのToDoを取得して送る
  Todo.find({}, function(err, todos) {
    res.send(todos);
  });
});

// /todoにPOSTアクセスしたとき、ToDoを追加するAPI
app.post('/todo', function(req, res) {
  var name = req.body.name;
  var limit = req.body.limit;
  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(name && limit) {
    var Todo = mongoose.model('Todo');
    var todo = new Todo();
    todo.text = name;
    todo.limitDate = limit;
    todo.save();

    res.send(true);
  } else {
    res.send(false);
  }
});








  app.listen(3000);
  console.log('server listening...');
