/*
	WEB 303
	Starting file for Assignment 1 
	James Wright
*/

$(document).ready(function(){
	$('input').on('keyup', function(){
		var $salary = $('input#salary').val();
		var $percent = $('input#percent').val();
		var $total = $salary * $percent / 100;

		$('span#spend').text('$' + $total.toFixed(2));
	});
});
