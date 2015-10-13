<?php
/***********

main.cpp for translate P5 code into OF code
Code developed by Ignacio Buioli

***********/

	include 'conversor.php';
	include 'reset.php';
	include 'resaltar.php';
	include 'sacar.php';
	
	$p5 = $_POST['valP5'];
	$p5 = resete($p5);
	$p5 = str_replace('P3D', 'OF_WINDOW', $p5);
	$p5 = str_replace('JAVA2D', 'OF_WINDOW', $p5);
	$p5 = str_replace('OPENGL', 'OF_WINDOW', $p5);

	$p5 = sacar($p5, "void setup(){", "}void");

	if(strpos($p5, "size(") !== false){
		$m_size = sacar($p5, "size(", ");");
		if(strpos($m_size, "OF_WINDOW") !== false){
			$size = "ofSetupOpenGL(".$m_size.");";
		}else{
			$size = "ofSetupOpenGL(".$m_size.", OF_WINDOW);";
		}
	}else{
		$size = "ofSetupOpenGL(100,100,OF_WINDOW);";
	}

	if(strpos($p5, "noCursor(") !== false){
		$p5 = sacar($p5, "noCursor(", ");");
		$nocursor = "ofHideCursor();";
	}else{
		$nocursor = '';
	}

	$total_p5 = "#include \"ofMain.h\"\n#include \"ofApp.h\"\n\nint main(){\n\t".$size.$nocursor."\n\tofRunApp(new ofApp());\n}\n";
	$total_p5 = resaltar($total_p5);

	echo $total_p5;
?>