$(function(){
    function getJSONResult(){
        $.getJSON("team.json").done(function(data){
            $.each(data.teammembers, function(index, value){
                $('div#team').append("<h3>" + value.name + "</h3>");
                $('div#team').append("<h4>" + value.title + "</h4>");
                $('div#team').append("<p>" + value.bio + "</p>");
            });
        });
    }
    
    function ajaxResult(){
        $.ajax({
            type: "GET",
            url: "team.json",
            beforeSend: function(){
                $('div#team').text("Loading...");
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(errorThrown);
            },
            success: function(data){
                setTimeout(function(){
                    $('div#team').text("");
                    $.each(data.teammembers, function(index, value){
                        $('div#team').append("<h3>" + value.name + "</h3>");
                        $('div#team').append("<h4>" + value.title + "</h4>");
                        $('div#team').append("<p>" + value.bio + "</p>");
                    });
                }, 5000);
            }
        });
    }
    
    ajaxResult();
});

