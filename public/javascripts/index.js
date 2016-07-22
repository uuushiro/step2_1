// ページが表示されたときToDoリストを表示する
$(function(){
  getList();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  return false;
});

//ToDoのタイトルを取得する



// ToDoリスト一覧を取得して表示する
function getList(){
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todoにGETアクセスする
    $.get('/list', function(lists){
      // 取得したToDoを追加していく
      $.each(lists, function(index, list) {
        $list.append('<p class="todoList"><a href="/getTodoHtmlPage/' + list.listname +'">'  + list.listname + '</a></p>');
      });
      // $.each($list.children(),function (index,list) {
      //   $(list).on('click',function(){
      //     var listname = $(list).text();
      //     $.get('/getTodoHtmlPage/'+listname,{},
      //     function (err,docs) {
      //       console.log(err);
      //       console.log(docs);
      //     })
    });
  });
      // 一覧を表示する
      $list.fadeIn();
}



// フォームに入力されたToDoリストを追加する
function postList(){
  // フォームに入力された値を取得
  var title = $('#listText').val();

  //入力項目を空にする。フォームの中の値をからにする。valはフォームの中の
  $('#listText').val('');
  console.log(title);

  // /listにPOSTアクセスする
  $.post('/list', {title: title}, function(res){
    //console.log(res);
    //再度表示する
    getList();
  });
}
