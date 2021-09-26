// WEB303 Assignment 2
// James Wright

$(function(){    
    $('#content a#vprospect').on('click', function(){
        $('#solution').hide();
        $('#solution').load('./prospect.html');
        $('#solution').fadeIn(1000);
    });

    $('#content a#vconvert').on('click', function(){
        $('#solution').hide();
        $('#solution').load('./convert.html');
        $('#solution').fadeIn(1000);
    });

    $('#content a#vretain').on('click', function(){
        $('#solution').hide();
        $('#solution').load('./retain.html');
        $('#solution').fadeIn(1000);
    });
});