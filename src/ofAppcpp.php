<?php
/***********

ofApp.cpp for translate P5 code into OF code
Code developed by Ignacio Buioli

***********/

	include 'conversor.php';
	include 'reset.php';
	include 'resaltar.php';
	include 'sacar.php';

	$p5 = $_POST['valP5'];
	$p5 = resete($p5);
	$sp5 = $p5;

	if(strpos($p5, "void draw(){") !== false){
		if(strstr($p5,'}')){
			$p5 = $p5 . '-';
		}
		$p5 = sacar($p5, "draw(){", "}-");
	}

	if(strpos($sp5, "} void draw") !== false){
		$sp5 = sacar($sp5, "void setup(){", "} void");
	}else{
		$sp5 = sacar($sp5, "void setup(){", "}void");
	}

	$p5 = conversor($p5);
	$sp5 = conversor($sp5);

	$total_p5 = "#include \"ofApp.h\"\n\nvoid ofApp::setup(){\n\t".$sp5."\n}\n\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw(){\n\t".$p5."\n}";
	$total_p5 = resaltar($total_p5);

	echo $total_p5;
?>