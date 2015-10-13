$(document).ready(function(){

    $(".CodeMirror").keyup(function(){
        realizaProcesoAppCpp($('.CodeMirror').text());
        realizaProcesoMain($('.CodeMirror').text());
        realizaProcesoAppH($('.CodeMirror').text());

        return false;
    });

    function realizaProcesoAppCpp(p5){
    var txt = {
        "valP5" : p5
    };
    $.ajax({
            data:  txt,
            url:   'ofAppcpp.php',
            type:  'POST',
            beforeSend: function () {
                    
            },
            success:  function (response) {
                $("#of").html(response);
            }
    	});
	}

	function realizaProcesoMain(p5){
    var txt = {
        "valP5" : p5
    };
    $.ajax({
            data:  txt,
            url:   'main.php',
            type:  'POST',
            beforeSend: function () {
                    
            },
            success:  function (response) {
                $("#of2").html(response);
            }
    	});
	}

    function realizaProcesoAppH(p5){
    var txt = {
        "valP5" : p5
    };
    $.ajax({
            data:  txt,
            url:   'ofApph.php',
            type:  'POST',
            beforeSend: function () {
                    
            },
            success:  function (response) {
                $("#of3").html(response);
            }
        });
    }

});