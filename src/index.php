<!DOCTYPE html>

<html>
<head>
    <title>Rosetta</title>
    <meta charset="UTF-8">
    <link href='estilo.css' rel='stylesheet' type='text/css'>
    <script src="jquery.min.js" type="text/javascript"></script>
    <script src="mainli.js" type="text/javascript"></script>
</head>

<body>
	<header>
		<h1>
			<img src="img/logo.png"><img src="img/rosetta.png" id="rosetta" alt="rosetta"><span>| pre-alpha 0.0.2</span>
		</h1>
	</header>

	<div id="con">
		<div id="p5txt" class="txt">p5</div>
		<div id="oftxt" class="txt">of | ofApp.cpp</div>
		<div id="oftxt2" class="txt">of | main.cpp</div>
		<div id="oftxt3" class="txt">of | ofApp.h</div>
		<textarea id="p5" type="text"></textarea>
		<div id="tras"></div>
		<textarea id="of" onclick="this.focus();this.select()" readonly="readonly" type="text"></textarea>
		<textarea id="of2" onclick="this.focus();this.select()" readonly="readonly" type="text"></textarea>
		<textarea id="of3" onclick="this.focus();this.select()" readonly="readonly" type="text"></textarea>

		<div id="boton1" class="botones">
		</div>
		<div id="boton2" class="botones">
		</div>
		<div id="boton3" class="botones">
		</div>
	</div>

	<div id="refp5">
		<img src="img/p5-logo.png" alt="processing" id="img-r-p5">
	</div>
	<div id="refof">
		<img src="img/of-logo.png" alt="openframeworks" id="img-r-of">
	</div>

	<script>
		$(document).ready(function(){

		$("#con").css("height", window.innerHeight - 40);

		$("#boton1").click(function() {
  			$("#of").fadeIn(100);
			$("#of2").fadeOut(100);
			$("#of3").fadeOut(100);
		});
		$("#boton2").click(function() {
  			$("#of").fadeOut(100);
			$("#of2").fadeIn(100);
			$("#of3").fadeOut(100);
		});
		$("#boton3").click(function() {
  			$("#of").fadeOut(100);
			$("#of2").fadeOut(100);
			$("#of3").fadeIn(100);
		});

		$("header").mouseenter(function() {
	    	$(this).animate({opacity: 0.95},800);
	  	}).mouseleave(function() {
	    	$(this).animate({opacity: 0.8},800);
	  	});

	  	$("#p5").mouseenter(function() {
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
	</script>
</body>
</html>