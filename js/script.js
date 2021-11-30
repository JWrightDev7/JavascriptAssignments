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
                    <td class="date">${value.date}</td>
                </tr>
            `);
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
            $('th').removeClass('ascending descending');
        });

        var compare = {
            name: function (a, b) {
                if (a < b) {
                    return -1;
                } else {
                    return a > b ? 1 : 0;
                }
            },
            job: function (a, b) {
                if (a < b) {
                    return -1;
                } else {
                    return a > b ? 1 : 0;
                }
            },
            episodes: function (a, b) {
                return a-b;
            },
            aName: function (a, b) {
                if (a < b) {
                    return -1;
                } else {
                    return a > b ? 1 : 0;
                }
            },
            aBirth: function (a, b) {
                a = new Date(a);
                b = new Date(b);

                return a - b;
            }
        }

        $('table').each(function(){
            var $table = $(this);
            var $tbody = $table.find('tbody');
            var $controls = $table.find('th');
            
            var rows = $tbody.find('tr').toArray();
            var originalOrder = $tbody.find('tr').toArray();

            $controls.on('click', function(){
                var $header = $(this);
                var order = $header.data('sort');
                var column;
                var $arrow = $header.find('a');
                var $arrowDiv = $header.find('div');
                console.log($arrowDiv);

                if($header.hasClass('descending')){
                    $header.removeClass('descending');
                    $arrow.removeClass('descending');
                    $tbody.append(originalOrder);
                    $arrowDiv.html('');
                    return;
                }

                if($header.is('.ascending') || $header.is('.descending')){
                    $header.toggleClass('ascending descending');
                    $arrow.toggleClass('ascending descending');
                    $arrowDiv.html('&#x25BC;');
                    $tbody.append(rows.reverse());
                }else{
                    $header.addClass('ascending');
                    $arrow.addClass('ascending');
                    $arrowDiv.html('&#x25B2;');
                    $header.siblings().removeClass('ascending descending');

                    if(compare.hasOwnProperty(order)){
                        column = $controls.index(this);

                        rows.sort(function(a, b){
                            a = $(a).find('td').eq(column).text();
                            b = $(b).find('td').eq(column).text();
                            return compare[order](a, b);
                        });

                        $tbody.append(rows);
                    }
                }
            });
        });

        /* $('a').on('click', function(){
            var $arrow = $(this).find('div');
            
            if($(this).hasClass('descending')){
                $arrow.html('&#x25BC;');
            }else{
                $arrow.html('&#x25B2;');
            }
        }); */

    });
});