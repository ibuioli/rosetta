<?php
/***********

ofApp.h for translate P5 code into OF code
Code developed by Ignacio Buioli

***********/

	include 'conversor.php';
	include 'reset.php';
	include 'resaltar.php';
	include 'sacar.php';

	$p5 = $_POST['valP5'];
	$p5 = resete($p5);
	$p5 = conversor($p5);

	$total_p5 = "#pragma once\n\n#include \"ofMain.h\"\n\nclass ofApp : public ofBaseApp{\n\n\t public :\n\t\t void setup();\n\t\t void update();\n\t\t void draw();\n}\n\n";
	$total_p5 = resaltar($total_p5);

	echo $total_p5;
?>