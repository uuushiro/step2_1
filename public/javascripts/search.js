var $button = $('#search');
//検索ボタンをクリックした時
$button.click(function () {
    var $li = $('li');
    $li.remove();
    　　$.get('/goSearch/' + $('#textArea').val()).done(function (data) {
        　　var node = document.getElementById('fuga');
          　if(data.length == 0){
              //対象のTODOが存在しない時
               var elementError = document.createElement('li');
               elementError.setAttribute('id', 'searchError');
               elementError.innerHTML = "対象のTodoは見つかりません";
               node.appendChild(elementError);
                } else {
                    //対象のTODOが存在する時
                    data.forEach(function (d) {
                        var elementText = document.createElement('li');
                        elementText.innerHTML = "<a href=/getTodoHtmlPage/" + d.listname + ">" + d.text + "</a>"
                        var elementListname = document.createElement('li');
                        elementListname.innerHTML = "リスト:" + d.listname;
                        var elementLimit = document.createElement('li');
                        elementLimit.innerHTML = "期限:" + d.limitDate;
                        var elementCreate = document.createElement('li');
                        elementCreate.innerHTML = "作成日時" + d.createdDate;
                        //子要素として追加
                        node.appendChild(elementText);
                        node.appendChild(elementListname);
                        node.appendChild(elementLimit);
                        node.appendChild(elementCreate);
                    });
                    $li.fadeIn();
                        }
        });
});


// var button = document.getElementById("search");
// button.addEventListener('click',function () {
//     var text = document.getElementById("textArea");
//     window.location.href = '/goSearch/'+text.value;
//     // $.ajax({
//     //     url: '/goSearch/'+text.value,
//     //     type: 'GET',
//     //     contentType: 'application/json'
//     // }).done(function (msg) {
//     //    console.log(msg);
// });
//