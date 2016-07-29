
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
app = express();
post = require('./routes/post');
var path = require('path');


//リストスキーマを定義する
var Schema = mongoose.Schema;


// ToDoスキーマを定義する
var todoSchema = new Schema({
  isCheck     : {type: Boolean, default: false},
  text        : String,
  createdDate : {type: Date, default: Date.now},
  limitDate   : Date,
  listname    : String
});
Todo = mongoose.model('Todo', todoSchema);


var listSchema = new Schema({
  listname :String
});
mongoose.model('List', listSchema);


app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');


//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/local');

//routing

app.get('/',function (req,res) {
  var List = mongoose.model('List');
  List.find({},function (err,lists) {
    var Todo = mongoose.model('Todo');
    Todo.find({},function (err,todos) {
    res.render('index',{lists: lists, todos: todos});
  });
  });
});

// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
app.get('/todo', function(req, res) {
  var Todo = mongoose.model('Todo');
  // すべてのToDoを取得して送る
  Todo.find({}, function(err, todos) {
    res.send(todos);
  });
});


app.get('/search',function (req,res) {
  res.render('search');
});

//検索機能 paramsを元に検索する
app.get('/goSearch/:text',function (req,res) {
  console.log(req.params);
  if(req.params.text) {
    var Todo = mongoose.model('Todo');
    re = new RegExp(req.params.text, "g");
    Todo.find({text: re}, function (err, search) {
      console.log(err);
      console.log(search);
      if (!err) {
        res.send(search);
      }
    });
  }
});

//checkの更新機能
app.post('/todo',function(req,res){
  console.log(req.body);
  var Todo = mongoose.model('Todo');
  var todo = new Todo();
  Todo.update({_id:req.body._id}, {isCheck:req.body.flag}, {upsert: true}, function(err) {
  });
  todo.text = req.body.text;
  todo.limitDate = req.body.limitDate;
  todo.listname = req.body.listname;
  todo.save(function(err) {
    if (!err) { res.send(true); }
    else{res.send(false);}
  });
});

//リストの詳細画面に移動する時
app.get('/getTodoHtmlPage/:listname',function(req,res) {
  if (req.params.listname) {
    var Todo = mongoose.model('Todo');
    var listname = req.params.listname;
    Todo.find({listname: listname}, function (err, todos) {
      if(!err) {
        // for (var i = 0; i < docs.length; i++) {
        res.render('todo', {todos: todos, listname: listname});
      }
    });
  }
});

// listにGETアクセスしたとき、ToDo一覧を取得するAPI
app.get('/list', function(req, res) {
  var List = mongoose.model('List');
  // すべてのlistを取得して送る
  List.find({}, function(err, lists) {
    res.send(lists);
  });
});

// /listにPOSTアクセスしたとき、Listを追加するAPI
app.post('/list', function(req, res) {
  var listname = req.body.title;
  console.log(listname);
  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(listname) {
    var List = mongoose.model('List');
    var list = new List();
    list.listname = listname;
    list.save();

    res.send(true);
  } else {
    res.send(false);
  }
});


app.listen(3000);
console.log('server listening...');
