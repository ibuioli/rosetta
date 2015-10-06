<?php
function conversor($p5){
	//Reseteadores
	$p5 = str_replace('boolean (', 'boolean (', $p5);
	$p5 = str_replace('byte (', 'byte(', $p5);
	$p5 = str_replace('char (', 'char(', $p5);
	$p5 = str_replace('float (', 'float(', $p5);
	$p5 = str_replace('int (', 'int(', $p5);
	$p5 = str_replace('color (', 'color(', $p5);
	//Variables
	$p5 = str_replace('boolean ', 'bool ', $p5);
	$p5 = str_replace('color ', 'ofColor ', $p5);
	$p5 = str_replace('byte ', 'unsigned char ', $p5);
	//OPENGL
	$p5 = str_replace('P2D', 'OF_WINDOW', $p5);
	$p5 = str_replace('P3D', 'OF_WINDOW', $p5);
	$p5 = str_replace('JAVA2D', 'OF_WINDOW', $p5);
	$p5 = str_replace('OPENGL', 'OF_WINDOW', $p5);
	//Cálculo
	$p5 = str_replace('constrain(', 'ofClamp(', $p5);
	$p5 = str_replace('dist(', 'ofDist(', $p5);
	$p5 = str_replace('lerp(', 'ofLerp(', $p5);
	$p5 = str_replace('map(', 'ofMap(', $p5);
	$p5 = str_replace('max(', 'MAX(', $p5);
	$p5 = str_replace('min(', 'MIN(', $p5);
	$p5 = str_replace('norm(', 'ofNormalize(', $p5);
	$p5 = str_replace('sq(', 'sq(', $p5, $contar_sq);
	for($i = 0; $i < $contar_sq; $i++){
		$m_sq = sacar($p5, 'sq(', ')');
		$nuevo_sq = 'pow('.$m_sq.', 2.0)';
		$p5 = str_replace('sq('.$m_sq.')', $nuevo_sq, $p5);
	}
	//Entorno
	$p5 = str_replace('frameCount', 'ofGetFrameNum()', $p5);
	$p5 = str_replace('frameRate', 'ofGetFrameRate()', $p5);
	$p5 = str_replace('width', 'ofGetWidth()', $p5);
	$p5 = str_replace('height', 'ofGetHeight()', $p5);
	$p5 = str_replace('displayWidth', 'ofGetScreenWidth()', $p5);
	$p5 = str_replace('displayHeight', 'ofGetScreenHeight()', $p5);
	$p5 = str_replace('frameRate(', 'ofSetFrameRate(', $p5);
	//Conversión
	$p5 = str_replace('boolean(', 'ofToBool(', $p5);
	$p5 = str_replace('binary(', 'ofToBinary(', $p5);
	$p5 = str_replace('byte(', 'ofToChar(', $p5);
	$p5 = str_replace('char(', 'ofToChar(', $p5);
	$p5 = str_replace('float(', 'ofToFloat(', $p5);
	$p5 = str_replace('hex(', 'ofToHex(', $p5);
	$p5 = str_replace('int(', 'ofToInt(', $p5);
	$p5 = str_replace('str(', 'ofToString(', $p5);
	//Funciones String
	$p5 = str_replace('join(', 'ofJoinString(', $p5);
	$p5 = str_replace('nf(', 'ofToString(', $p5);
	$p5 = str_replace('split(', 'ofSplitString(', $p5);
	$p5 = str_replace('splitTokens(', 'ofSplitString(', $p5);
	//Random
	$p5 = str_replace('noise(', 'ofNoise(', $p5);
	$p5 = str_replace('random(', 'ofRandom(', $p5);
	$p5 = str_replace('randomSeed(', 'ofSeedRandom(', $p5);
	//Constantes
	$p5 = str_replace('QUARTER_PI', 'HALF_PI/2', $p5);
	$p5 = str_replace('TAU', 'TWO_PI', $p5);
	//Fecha y Hora
	$p5 = str_replace('day(', 'ofGetDay(', $p5);
	$p5 = str_replace('hour(', 'ofGetHours(', $p5);
	$p5 = str_replace('millis(', 'ofGetElapsedTimeMillis(', $p5);
	$p5 = str_replace('minute(', 'ofGetMinutes(', $p5);
	$p5 = str_replace('month(', 'ofGetMonth(', $p5);
	$p5 = str_replace('second(', 'ofGetSeconds(', $p5);
	$p5 = str_replace('year(', 'ofGetYear(', $p5);
	//Transformación
	$p5 = str_replace('popMatrix(', 'ofPopMatrix(', $p5);
	$p5 = str_replace('pushMatrix(', 'ofPushMatrix(', $p5);
	$p5 = str_replace('popStyle(', 'ofPopStyle(', $p5);
	$p5 = str_replace('pushStyle(', 'ofPushStyle(', $p5);
	$p5 = str_replace('rotate(', 'ofRotate(', $p5);
	$p5 = str_replace('rotateX(', 'ofRotateX(', $p5);
	$p5 = str_replace('rotateY(', 'ofRotateY(', $p5);
	$p5 = str_replace('rotateZ(', 'ofRotateZ(', $p5);
	$p5 = str_replace('translate(', 'ofTranslate(', $p5);
	$p5 = str_replace('scale(', 'ofScale(', $p5);
	//Color
	$p5 = str_replace('background(', 'ofBackground(', $p5);
	$p5 = str_replace('fill(', 'fill(', $p5, $contar_fill);
	for($i = 0; $i < $contar_fill; $i++){
		$m_fill = sacar($p5, 'fill(', ')');
		$nuevo_fill = 'ofSetColor('.$m_fill.');ofFill()';
		$p5 = str_replace('fill('.$m_fill.')', $nuevo_fill, $p5);
	}
	$p5 = str_replace('stroke(', 'stroke(', $p5, $contar_stroke);
	for($i = 0; $i < $contar_stroke; $i++){
		$m_stroke = sacar($p5, 'stroke(', ')');
		$nuevo_stroke = 'ofSetColor('.$m_stroke.');ofNoFill()';
		$p5 = str_replace('stroke('.$m_stroke.')', $nuevo_stroke, $p5);
	}
	$p5 = str_replace('noFill(', 'ofNoFill(', $p5);
	$p5 = str_replace('noStroke(', 'ofFill(', $p5);
	$p5 = str_replace('color(', 'ofColor(', $p5);
	//Primitivas 2D
	$p5 = str_replace('ellipse(', 'ofEllipse(', $p5);
	$p5 = str_replace('rect(', 'ofRect(', $p5);
	$p5 = str_replace('line(', 'ofLine(', $p5);
	$p5 = str_replace('triangle(', 'ofTriangle(', $p5);
	//Curvas
	$p5 = str_replace('curve(', 'ofCurve(', $p5);
	$p5 = str_replace('curveTangent(', 'ofCurveTangent(', $p5);
	$p5 = str_replace('curvePoint(', 'ofCurveVertex(', $p5);
	$p5 = str_replace('curveDetail(', 'ofSetCurveResolution(', $p5);
	$p5 = str_replace('bezier(', 'ofBezier(', $p5);
	$p5 = str_replace('bezierDetail(', 'ofSetCurveResolution(', $p5);
	$p5 = str_replace('bezierPoint(', 'ofBezierPoint(', $p5);
	//Atributos
	$p5 = str_replace('rectMode(', 'ofSetRectMode(', $p5);
	$p5 = str_replace('CORNER', 'OF_RECTMODE_CORNER', $p5);
	$p5 = str_replace('CORNERS', 'OF_RECTMODE_CORNER', $p5);
	$p5 = str_replace('CENTER', 'OF_RECTMODE_CENTER', $p5);
	$p5 = str_replace('smooth(', 'ofEnableSmoothing(', $p5);
	$p5 = str_replace('noSmooth(', 'ofDisableSmoothing(', $p5);
	$p5 = str_replace('strokeWeight(', 'ofSetLineWidth(', $p5);
	//Vértices
	$p5 = str_replace('vertex(', 'ofVertex(', $p5);
	$p5 = str_replace('bezierVertex(', 'ofBezierVertex(', $p5);
	$p5 = str_replace('curveVertex(', 'ofCurveVertex(', $p5);
	$p5 = str_replace('beginShape(', 'ofBeginVertex(', $p5);
	$p5 = str_replace('endShape(', 'ofEndVertex(', $p5);
	//Imagen
	$p5 = str_replace('tint(', 'ofSetColor(', $p5);
	$p5 = str_replace('noTint(', 'ofSetColor(255', $p5);
	//Entrada
	$p5 = str_replace('mouseX', 'ofGetMouseX()', $p5);
	$p5 = str_replace('mouseY', 'ofGetMouseY()', $p5);
	$p5 = str_replace('pmouseX', 'ofGetPreviousMouseX()', $p5);
	$p5 = str_replace('pmouseY', 'ofGetPreviousMouseY()', $p5);
	//Salida
	$p5 = str_replace('save(', 'ofSaveScreen(', $p5);
	$p5 = str_replace('saveFrame(', 'ofSaveFrame(', $p5);
	$p5 = str_replace('profToInt(', 'print(', $p5, $contar_print);
	for($i = 0; $i < $contar_print; $i++){
		$m_print = sacar($p5, 'print(', ')');
		$nuevo_print = 'cout >> '.$m_print.'';
		$p5 = str_replace('print('.$m_print.')', $nuevo_print, $p5);
	}
	$p5 = str_replace('print ln(', 'println(', $p5, $contar_println);
	for($i = 0; $i < $contar_println; $i++){
		$m_println = sacar($p5, 'println(', ')');
		$nuevo_println = 'cout >> '.$m_println.' >> endl';
		$p5 = str_replace('println('.$m_println.')', $nuevo_println, $p5);
	}

	//Conf Final
	$p5 = str_replace(';', ";\n\t", $p5);
	$p5 = str_replace('{', "{\n\t\t", $p5);
	$p5 = str_replace('}', "}\n\t", $p5);

	return $p5;
}
?>