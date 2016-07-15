
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app = express();
var post = require('./routes/post');
var path = require('path');


//ToDoリストスキーマを定義する
  var Schema = mongoose.Schema;


      // ToDoスキーマを定義する
      var todoSchema = new Schema({
        isCheck: {type: Boolean, default: false},
        text: String,
        createdDate: {type: Date, default: Date.now},
        limitDate: Date
      });


      var listSchema = new Schema({
        title: String,
        todos: [todoSchema],
        todoValues: []
      });
      mongoose.model('List', listSchema);




    var List = mongoose.model('List');
    List.findOne({_id: '5787e598061ffc168c34c10d'}, function (err, list) {
      if (!err) {
      var todoValues = [];
      list.forEach(function (list) {
        var todoCount = 0;
        var todoLength = list.todos.length;
        list.todos.forEach(function (todo) {
          if (todo.isCheck) {
            todoCount++;
          }
          todoValues.push({
            todoCount: todoCount,
            todoLength: todoLength
          });
        });
      });
      }
      else {
        console.log('あ');
      }
});



      //
      // Todo.findOne({ _id: post_id }, function(err, post) {
      //   if (!err) {
      //     var todos = {};
      //     todos.isCheck = false;
      //     todos.text  = '内容';
      //     todos.createdDate  = Date.now();
      //     todos.todos.push(todos);  // 追加
      //     post.save(function(err) {
      //       // ...
      //     });
      //   } else {
      //     console.log('error findOne: ' + err);
      //   }
      // });


      app.set('views', __dirname + '/views');
      app.set('view engine', 'ejs');


//middleware

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(methodOverride(function (req, res) {
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

// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
      app.get('/todo', function (req, res) {
        var List = mongoose.model('List');
        // すべてのToDoを取得して送る
        List.find({}, function (err, todos) {
          res.send(todos);
        });
      });

// /todoにPOSTアクセスしたとき、ToDoを追加するAPI
      app.post('/todo', function (req, res) {
        var name = req.body.name;
        var limit = req.body.limit;
        // ToDoの名前と期限のパラーメタがあればMongoDBに保存
        if (name && limit) {
          var List = mongoose.model('List');
          List.findOne({_id: '5787e598061ffc168c34c10d'}, function (err, list) {
            if (!err) {
              var todo = {};
              todo.text = name;
              todo.limitDate = limit;
              list.todos.push(todo);  // 追加
              list.save(function (err) {
                //
              });
            } else {
              console.log('あ');
            }
          });
        }
      });

// listにGETアクセスしたとき、ToDo一覧を取得するAPI
      app.get('/list', function (req, res) {
        var List = mongoose.model('List');
        // すべてのlistを取得して送る
        List.find({}, function (err, lists) {
          res.send(lists);

        });
      });

// /listにPOSTアクセスしたとき、Listを追加するAPI
      app.post('/list', function (req, res) {
        var title = req.body.title;
        // ToDoの名前と期限のパラーメタがあればMongoDBに保存
        if (title) {
          var List = mongoose.model('List');
          var list = new List();
          list.title = title;
          list.save();

          res.send(true);
        } else {
          res.send(false);
        }
      });

      app.get('/list/:id', function (req, res) {
        var List = mongoose.model('List');
        // すべてのlistを取得して送る
        List.findById(req.params.id, function (err, lists) {
          res.send(lists);
        });
      });


      app.listen(3000);
      console.log('server listening...');
