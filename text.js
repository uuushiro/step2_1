$(function(){
  getList();
});

$('#form').submit(function(){
  postList();
  return false;
});

//ToDo一覧を取得して表示する
function getList(){
  //すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    //todoにGETアクセスする
    $.get('todo',function(){
      $.each(todos,funtion)
    })
  })
}
