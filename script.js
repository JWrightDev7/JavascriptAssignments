/*
    Assignment 4
    James Wright
*/

$(document).ready(function(){
    // your code here

    navigator.geolocation.getCurrentPosition((position) =>{
        $long = position.coords.longitude;
        $lat = position.coords.latitude;

        $("div#youarehere").append("<p> Your current longitude is: " + $long + "<br/>Your current latitude is: " + $lat);

        if(localStorage != null){
            $savedLong = localStorage.getItem("longitude");
            $savedLat = localStorage.getItem("latitude");
            
            if($savedLat && $savedLong){
                $("div#youarehere").append("<p>Your saved longitude is: "+ $savedLong + "<br/>Your saved latitude is: "+ $savedLat);
                $moved = calcDistance($lat, $long, $savedLat, $savedLong);
                $("div#youarehere").append("<p>You have moved: " + $moved +" meters.");
            }else{
                localStorage.setItem("longitude", $long);
                localStorage.setItem("latitude", $lat);
                $("div#youarehere").append("<p>Welcome to Vecta Corp.</p>");
            }

        }else{
            console.log("local storage is unavailable");
            $("div#youarehere").append("<p>Welcome to Vecta Corp.</p>");
            $("div#youarehere").append("<p>Local storage is not available to save your current location. Permission Denied.");
        }
        
    }, function(){
        console.log("Cannot access geolocation, permission denied.");
        $("div#youarehere").append("Geolocation is not available, permission denied.");
    },{
        enableHighAccuracy: true
    });




    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistance(lat1, lon1, lat2, lon2){
        var toRadians = function(num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2-lat1);
        var Δλ = toRadians(lon2-lon1);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ( R * c );
    }
});


