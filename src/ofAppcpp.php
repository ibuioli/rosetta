<?php
	include 'conversor.php';
	include 'sacar.php';

	$p5 = $_POST['valP5'];
	$p5 = trim($p5);
	$p5 = str_replace('public', ' ', $p5);
	$p5 = str_replace('private', ' ', $p5);
	$p5 = preg_replace("/\r\n+|\r+|\n+|\t+/i", "", $p5);
	$p5 = preg_replace('/\s+/', '', $p5);
	$p5 = str_replace('void', 'void ', $p5);
	$p5 = str_replace('boolean', 'boolean ', $p5);
	$p5 = str_replace('int', 'int ', $p5);
	$p5 = str_replace('float', 'float ', $p5);
	$p5 = str_replace('byte', 'byte ', $p5);
	$p5 = str_replace('char', 'char ', $p5);
	$p5 = str_replace('long', 'long ', $p5);
	$p5 = str_replace('doble', 'doble ', $p5);
	$p5 = str_replace('color', 'color ', $p5);
	$p5 = str_replace('PImage', 'PImage ', $p5);
	$p5 = str_replace('String', 'String ', $p5);
	$p5 = str_replace('PFont', 'PFont ', $p5);
	$p5 = str_replace('PVector', 'PVector ', $p5);
	$p5 = str_replace('Array', 'Array ', $p5);
	$p5 = str_replace('ArrayList', 'ArrayList ', $p5);
	$sp5 = $p5;
	if(strstr($p5,'}')){
		$p5 = $p5 . '-';
	}

	if(strpos($p5, "void draw(){") == true){
		$p5 = sacar($p5, "draw(){", "}-");
	}

	if(strpos($sp5, "} void draw") == true){
		$sp5 = sacar($sp5, "void setup(){", "} void");
	}else{
		$sp5 = sacar($sp5, "void setup(){", "}void");
	}

	$p5 = conversor($p5);
	$sp5 = conversor($sp5);

	echo "#include \"ofApp.h\"\n\n"

	echo "void ofApp::setup(){\n\n";
	echo "\t".$sp5."\n";
	echo "}\n\n";

	echo "void ofApp::update(){\n";
	echo "}\n\n";

	echo "void ofApp::draw(){\n\n";
	echo "\t".$p5."\n";
	echo "}\n";
?>