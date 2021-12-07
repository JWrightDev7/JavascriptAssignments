$(function(){
    var username = document.getElementById('username');
    var pass = document.getElementById('password');
    var passConfirm = document.getElementById('passConfirm');
    var tos = document.getElementById('tos');
    var country = document.getElementById('country');
    var submit = document.getElementById('submit');
    var submitted = false;
    username.value = "";
    submit.disabled = true;
    submit.className = 'disabled';
    tos.checked = false;

    username.required = true;
    password.required = true;
    passConfirm.required = true;
    tos.required = true;

    var userValid = false;
    var passValid = false;
    var tosValid = false;
    var countryValid = false;

    $.getJSON("countries.json").done(function(data){
        $.each(data.countries, function(index, value){
            $("#country").append(`<option value="${value.code}">${value.name}</option>`);
        });
    })

    function addEvent(el, event, callback){
        if('addEventListener' in el){
            el.addEventListener(event, callback, false);
        }else{
            el['e' + event + callback] = callback;
            el[event + callback] = function(){
                el['e' + event + callback] (window.event);
            };
            el.attachEvent('on', event, el[event + callback]);
        }
    }
    
    addEvent(form, 'submit', function(e){
        e.preventDefault();
        var elements = this.elements;
        var username = elements.username.value;
        var country = elements.country.value;

        var msg = `Welcome ${username}! The country code you selected is: ${country}`;
        
        document.getElementById('welcome').textContent = msg;
    });

    addEvent(username, 'input', function(e){
        var target = e.target || e.srcElement;
        if(target.value != null){
            userValid = true;
        }

        if(userValid && passValid && tosValid && countryValid){
            submit.disabled = false;
            submit.className = 'enabled';
        }
    });

    addEvent(passConfirm, 'input', function(e){
        var target = e.target || e.srcElement;
        if(target.value.length >= 10){
            if(target.value == pass.value){
                passValid = true;
            }
        }

        if (userValid && passValid && tosValid && countryValid) {
            submit.disabled = false;
            submit.className = 'enabled';
        }
    });
    
    addEvent(tos, 'change', function(e){
        var target = e.target || e.srcElement;
        if(target.checked){
            tosValid = true;
        }else{
            tosValid = false;
        }

        if (userValid && passValid && tosValid && countryValid) {
            submit.disabled = false;
            submit.className = 'enabled';
        }
    });

    addEvent(country, 'change', function(e){
        var target = e.target || e.srcElement;
        if(target.selectOptions != 'none'){
            countryValid = true;
        }

        if (userValid && passValid && tosValid && countryValid) {
            submit.disabled = false;
            submit.className = 'enabled';
        }
    });

});