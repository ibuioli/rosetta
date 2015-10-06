<?php
	include 'conversor.php';
	include 'sacar.php';
	
	$p5 = $_POST['valP5'];
	$p5 = trim($p5);
	$p5 = preg_replace("/\r\n+|\r+|\n+|\t+/i", " ", $p5);
	$p5 = preg_replace('/\s+/', '', $p5);
	$p5 = str_replace('void', 'void ', $p5);
	$p5 = str_replace('boolean', 'boolean ', $p5);
	$p5 = str_replace('int', 'int ', $p5);
	$p5 = str_replace('float', 'float ', $p5);
	$p5 = str_replace('byte', 'byte ', $p5);
	$p5 = str_replace('char', 'char ', $p5);
	$p5 = str_replace('PImage', 'PImage ', $p5);
	$p5 = str_replace('String', 'String ', $p5);
	$p5 = str_replace('PFont', 'PFont ', $p5);
	$p5 = str_replace('PVector', 'PVector ', $p5);
	$p5 = str_replace('P2D', 'OF_WINDOW', $p5);
	$p5 = str_replace('P3D', 'OF_WINDOW', $p5);
	$p5 = str_replace('JAVA2D', 'OF_WINDOW', $p5);
	$p5 = str_replace('OPENGL', 'OF_WINDOW', $p5);

	if(strpos($p5, "} void draw") == true){
		$p5 = sacar($p5, "void setup(){", "} void");
	}else{
		$p5 = sacar($p5, "void setup(){", "}void");
	}

	if(strpos($p5, "size(") == true){
		$m_size = sacar($p5, "size(", ");");
		if(strpos($m_size, "OF_WINDOW") == true){
			$size = "ofSetupOpenGL(".$m_size.");";
		}else{
			$size = "ofSetupOpenGL(".$m_size.", OF_WINDOW);";
		}
	}else if(strpos($p5, "size (") == true){
		$size  =sacar($p5, "size (", ");");
	}else if(strpos($p5, "size (") == false || strpos($p5, "size(") == false){
		$size = "ofSetupOpenGL(100,100,OF_WINDOW);";
	}

	echo "#include \"ofMain.h\"\n";
	echo "#include \"ofApp.h\"\n\n";

	echo "int main( ){\n";
	echo "\t".$size."\n";
	if(strpos($p5, "noCursor(") == true){
		$p5 = sacar($p5, "noCursor(", ");");
		$nocursor = "ofHideCursor();";
		echo "\t".$nocursor."\n";
	}else if(strpos($p5, "noCursor (") == true){
		$p5 = sacar($p5, "noCursor (", ");");
		$nocursor = "ofHideCursor();";
		echo "\t".$nocursor."\n";
	}
	echo "\tofRunApp(new ofApp());\n";
	echo "}\n"

?>