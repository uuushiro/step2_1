// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  location.reload();
  return false;
});


// フォームに入力されたToDoリストを追加する
function postList(){
  // フォームに入力された値を取得
  var title = $('#listText').val();
  //入力項目を空にする。
  $('#listText').val('');
  // /listにPOSTアクセスする
  $.post('/list', {title: title}, function(res){
  });
}



// ページが表示されたときToDoリストを表示する
// $(function(){
//   getList();
// });


//ToDoのタイトルを取得する

// ToDoリスト一覧を取得して表示する
// function getList(){
//   // すでに表示されている一覧を非表示にして削除する
//   var $list = $('.list');
//   $list.fadeOut(function(){
//     $list.children().remove();
//     // /todoにGETアクセスする
//     $.get('/list', function(lists){
//
//       // 取得したToDoを追加していく
//       $.each(lists, function(index, list) {
//         $list.prepend('<p class="todoList"><a href="/getTodoHtmlPage/' + list.listname +'">'  + list.listname + '</a></p>');
//       });
//
//    var $checks = $('.checks');
//     $.get('/todo',function(checks){
//       $.each(checks,function (index, check) {
//         $checks.prepend();
//       })
//     });
//
//   });
//       // 一覧を表示する
//       $list.fadeIn();
// });
//
