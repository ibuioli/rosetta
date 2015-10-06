<?php
/***********

ofApp.h for translate P5 code into OF code
Code developed by Ignacio Buioli

***********/

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

	$p5 = conversor($p5);

	echo "#pragma once\n\n";
	echo "#include \"ofMain.h\"\n\n";

	echo "class ofApp : public ofBaseApp{\n\n";
	echo "\t public:\n";
	echo "\t\t setup();\n";
	echo "\t\t update();\n";
	echo "\t\t draw();\n";
	echo "}\n\n";
?>