


$('#search').click(function() {
    $.ajax({
            url: '/gogogo',
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({flag: $('#textArea').val()})
            });
    });