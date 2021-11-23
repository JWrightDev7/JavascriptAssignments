$(function(){
    $('#nameSearch').val("");
    $.getJSON("characters.json").done(function(data){
        var names = [];
        var sortedNamesAM = [];
        var sortedNamesNZ = [];
        $.each(data.characters, function(index, value){
            $("table tbody").append(`
                <tr class="${value.name}">
                    <td class="name">${value.name}</td>
                    <td class="job">${value.job}</td>
                    <td class="episodes">${value.episodes}</td>
                    <td class="actor">${value.actor}</td>
                </tr>
            `);
            names.push(value.name);
        });
        function sortNamesAM(names){
            var re = /^[a-mA-M]/;
            return names.match(re);
        }

        function sortNamesNZ(names){
            var re = /^[n-zN-Z]/;
            return names.match(re);
        }
        sortedNamesAM = names.filter(sortNamesAM);
        sortedNamesNZ = names.filter(sortNamesNZ);

        $("#namesAM").append(`A - M (${sortedNamesAM.length})`);
        $("#namesNZ").append(`N - Z (${sortedNamesNZ.length})`);

        $("#nameSearch").on('keyup', function(){
            $nameSearch = $('#nameSearch').val();
            names.forEach(name => {
                var fname = name.split(' ');
                fname = fname[0];
                if(!$nameSearch){
                    $(`.${fname}`).removeClass('found');
                }else if(name.toLowerCase().includes($nameSearch)){
                    $(`.${fname}`).addClass('found');
                }else{
                    $(`.${fname}`).removeClass('found');
                }
            });
        });

        $("#namesAM").on('click', function(){
            $('tr').removeClass('found');
            sortedNamesAM.forEach(name =>{
                var fname = name.split(' ');
                var fname = fname[0];
                $(`.${fname}`).addClass("found");
            });
        });

        $('#namesNZ').on('click', function(){
            $('tr').removeClass('found');
            sortedNamesNZ.forEach(name =>{
                var fname = name.split(' ');
                var fname = fname[0];
                $(`.${fname}`).addClass("found");
            });
        });

        $('#clear').on('click', function(){
            $('tr').removeClass('found');
        });

    });
});