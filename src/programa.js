$(document).ready(function(){
	$("#boton1").css("background", "#ee3987");
	$("#boton1").css("color", "#ddd");

	$("#con").css("height", window.innerHeight - 40);

	$("#boton1").click(function() {
		$("#of").fadeIn(100);
		$("#of2").fadeOut(100);
		$("#of3").fadeOut(100);
		$(this).css("background", "#ee3987");
		$(this).css("color", "#ddd");
		$("#boton2").css("background", "#fff");
		$("#boton2").css("color", "#222");
		$("#boton3").css("background", "#fff");
		$("#boton3").css("color", "#222");
	});
	$("#boton2").click(function() {
			$("#of").fadeOut(100);
		$("#of2").fadeIn(100);
		$("#of3").fadeOut(100);
		$(this).css("background", "#ee3987");
		$(this).css("color", "#ddd");
		$("#boton1").css("background", "#fff");
		$("#boton1").css("color", "#222");
		$("#boton3").css("background", "#fff");
		$("#boton3").css("color", "#222");
	});
	$("#boton3").click(function() {
			$("#of").fadeOut(100);
		$("#of2").fadeOut(100);
		$("#of3").fadeIn(100);
		$(this).css("background", "#ee3987");
		$(this).css("color", "#ddd");
		$("#boton1").css("background", "#fff");
		$("#boton1").css("color", "#222");
		$("#boton2").css("background", "#fff");
		$("#boton2").css("color", "#222");
	});

	$("header").mouseenter(function() {
    	$(this).animate({opacity: 0.95},800);
  	}).mouseleave(function() {
    	$(this).animate({opacity: 0.8},800);
  	});

  	$(".CodeMirror").mouseenter(function() {
    	$("#p5txt").fadeOut(500);
  	}).mouseleave(function() {
    	$("#p5txt").fadeIn(500);
  	});
  	$("#of").mouseenter(function() {
		$("#oftxt").fadeOut(500);
		$("#oftxt2").fadeOut(1);
		$("#oftxt3").fadeOut(1);
  	}).mouseleave(function() {
		$("#oftxt").fadeIn(500);
		$("#oftxt2").fadeOut(1);
		$("#oftxt3").fadeOut(1);
  	});
  	$("#of2").mouseenter(function() {
		$("#oftxt2").fadeOut(500);
		$("#oftxt").fadeOut(1);
		$("#oftxt3").fadeOut(1);
  	}).mouseleave(function() {
		$("#oftxt2").fadeIn(500);
		$("#oftxt").fadeOut(1);
		$("#oftxt3").fadeOut(1);
  	});
  	$("#of3").mouseenter(function() {
  		$("#oftxt3").fadeOut(500);
		$("#oftxt2").fadeOut(1);
		$("#oftxt").fadeOut(1);
  	}).mouseleave(function() {
  		$("#oftxt3").fadeIn(500);
		$("#oftxt2").fadeOut(1);
		$("#oftxt").fadeOut(1);
  	});

  	$("#refp5").mouseenter(function() {
    	$("#img-r-p5").animate({opacity: 0.99},800);
  	}).mouseleave(function() {
    	$("#img-r-p5").animate({opacity: 0.7},800);
  	});
  	$("#refof").mouseenter(function() {
    	$("#img-r-of").animate({opacity: 0.99},800);
  	}).mouseleave(function() {
    	$("#img-r-of").animate({opacity: 0.7},800);
  	});
});