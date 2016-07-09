// ページが表示されたときToDoリストを表示する
$(function(){
  getTodo();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postTodo();
  return false;
});

//ToDoのタイトルを取得する



// ToDo一覧を取得して表示する
function getTodo(){
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todoにGETアクセスする
    $.get('/todo', function(todos){
      // 取得したToDoを追加していく
      $.each(todos, function(index, todo){
        var limit = new Date(todo.limitDate);
        $list.append('<p id="todoDetail"><a href="todo.html"><input type="checkbox" ' + (todo.isCheck ? 'checked' : '') + '>' + todo.text + ' (~' + limit.toLocaleString() + ')</a></p>');
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });


}

// フォームに入力されたToDoを追加する
function postTodo(){
  // フォームに入力された値を取得
  var name = $('#text').val();
  var limitDate = new Date($('#limit').val());

  //入力項目を空にする。フォームの中の値をからにする。valはフォームの中の
  $('#text').val('');
  $('#limit').val('');

  // /todoにPOSTアクセスする
  $.post('/todo', {name: name, limit: limitDate}, function(res){
    console.log(res);
    //再度表示する
    getTodo();
  });
}