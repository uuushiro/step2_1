


$('#search ').click(function(){
    $.ajax({
    url: "/todo",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {
        param: $('#textArea').val()
    },
    success: function(data){
        console.log(data);
    },
    error: function(data){
        alert('Error');
    }
});
});

