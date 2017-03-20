/***********

Service for translate P5 code into OF code
Code developed by Ignacio Buioli

***********/
import { Injectable } from '@angular/core';
import { Tools } from './tools';

@Injectable()
export class P52OfService {

  constructor(public t: Tools) { }

  reset(p5:string) {
    var r_p5 = p5;
    r_p5 = r_p5.trim();
    r_p5 = r_p5.replace(/ +(?= )/g,'');
    ////////////////////
    //Comments Cleaner
    r_p5 = r_p5.replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm , '');
    //Other Sets
    r_p5 = r_p5.replace(/ \(/g, '(');
    //r_p5 = r_p5.replace(/</g, ' < ');
		//r_p5 = r_p5.replace(/>/g, ' > ');

    ////////////////////
    return r_p5;
  }

  conversor(p5:string){
    var r_p5 = p5;
    //Data
  	r_p5 = r_p5.replace(/boolean /g, 'bool ');
  	r_p5 = r_p5.replace(/color /g, 'ofColor ');
  	r_p5 = r_p5.replace(/byte /g, 'unsigned char ');
  	//OPENGL
  	r_p5 = r_p5.replace(/P2D/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/P3D/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/JAVA2D/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/OPENGL/g, 'OF_WINDOW');
  	//Calc
  	r_p5 = r_p5.replace(/constrain\(/g, 'ofClamp(');
  	r_p5 = r_p5.replace(/dist\(/g, 'ofDist(');
  	r_p5 = r_p5.replace(/lerp\(/g, 'ofLerp(');
  	r_p5 = r_p5.replace(/map\(/g, 'ofMap(');
  	r_p5 = r_p5.replace(/max\(/g, 'MAX(');
  	r_p5 = r_p5.replace(/min\(/g, 'MIN(');
  	r_p5 = r_p5.replace(/norm\(/g, 'ofNormalize(');
    var c_sq = this.t.repeted(r_p5, 'sq(', false);
    for(let i = 0; i < c_sq; i++){
      var m = this.t.extract(r_p5, 'sq(', ')');
      var value = 'pow('+m+', 2.0)';
      r_p5 = r_p5.replace('sq('+m+')', value);
  	}
    //Env
  	r_p5 = r_p5.replace(/frameCount/g, 'ofGetFrameNum()');
  	r_p5 = r_p5.replace(/frameRate/g, 'ofGetFrameRate()');
  	r_p5 = r_p5.replace(/width/g, 'ofGetWidth()');
  	r_p5 = r_p5.replace(/height/g, 'ofGetHeight()');
  	r_p5 = r_p5.replace(/displayWidth/g, 'ofGetScreenWidth()');
  	r_p5 = r_p5.replace(/displayHeight/g, 'ofGetScreenHeight()');
  	r_p5 = r_p5.replace(/frameRate\(/g, 'ofSetFrameRate(');
    //Convertion
  	r_p5 = r_p5.replace(/boolean\(/g, 'ofToBool(');
  	r_p5 = r_p5.replace(/binary\(/g, 'ofToBinary(');
  	r_p5 = r_p5.replace(/byte\(/g, 'ofToChar(');
  	r_p5 = r_p5.replace(/float\(/g, 'ofToFloat(');
    r_p5 = r_p5.replace(/char\(/g, 'ofToChar(');
  	r_p5 = r_p5.replace(/hex\(/g, 'ofToHex(');
  	r_p5 = r_p5.replace(/int\(/g, 'ofToInt(');
  	r_p5 = r_p5.replace(/str\(/g, 'ofToString(');
    //String Functions
  	r_p5 = r_p5.replace(/join\(/g, 'ofJoinString(');
  	r_p5 = r_p5.replace(/nf\(/g, 'ofToString(');
  	r_p5 = r_p5.replace(/split\(/g, 'ofSplitString(');
  	r_p5 = r_p5.replace(/splitTokens\(/g, 'ofSplitString(');
    //Random
  	r_p5 = r_p5.replace(/noise\(/g, 'ofNoise(');
  	r_p5 = r_p5.replace(/random\(/g, 'ofRandom(');
  	r_p5 = r_p5.replace(/randomSeed\(/g, 'ofSeedRandom(');
    //Cons
  	r_p5 = r_p5.replace(/QUARTER_PI/g, 'HALF_PI/2');
  	r_p5 = r_p5.replace(/TAU/g, 'TWO_PI');
    //Date & Hour
  	r_p5 = r_p5.replace(/day\(/g, 'ofGetDay(');
  	r_p5 = r_p5.replace(/hour\(/g, 'ofGetHours(');
  	r_p5 = r_p5.replace(/millis\(/g, 'ofGetElapsedTimeMillis(');
  	r_p5 = r_p5.replace(/minute\(/g, 'ofGetMinutes(');
  	r_p5 = r_p5.replace(/month\(/g, 'ofGetMonth(');
  	r_p5 = r_p5.replace(/second\(/g, 'ofGetSeconds(');
  	r_p5 = r_p5.replace(/year\(/g, 'ofGetYear(');
    //Transforms
  	r_p5 = r_p5.replace(/popMatrix\(/g, 'ofPopMatrix(');
  	r_p5 = r_p5.replace(/popStyle\(/g, 'ofPopStyle(');
    r_p5 = r_p5.replace(/pushMatrix\(/g, 'ofPushMatrix(');
  	r_p5 = r_p5.replace(/pushStyle\(/g, 'ofPushStyle(');
  	r_p5 = r_p5.replace(/rotate\(/g, 'ofRotate(');
  	r_p5 = r_p5.replace(/rotateX\(/g, 'ofRotateX(');
  	r_p5 = r_p5.replace(/rotateY\(/g, 'ofRotateY(');
  	r_p5 = r_p5.replace(/rotateZ\(/g, 'ofRotateZ(');
  	r_p5 = r_p5.replace(/translate\(/g, 'ofTranslate(');
  	r_p5 = r_p5.replace(/scale\(/g, 'ofScale(');
    //Color
    r_p5 = r_p5.replace(/background\(/g, 'ofBackground(');
    r_p5 = r_p5.replace(/noFill\(/g, 'ofNoFill(');
  	r_p5 = r_p5.replace(/noStroke\(/g, 'ofFill(');
  	r_p5 = r_p5.replace(/color\(/g, 'ofColor(');
    var c_fill = this.t.repeted(r_p5, 'fill(', false);
    for(let i = 0; i < c_fill; i++){
      var m = this.t.extract(r_p5, 'fill(', ')');
      var value = 'ofSetColor('+m+');\nofFill();';
      r_p5 = r_p5.replace('fill('+m+')', value);
  	}
    var c_stroke = this.t.repeted(r_p5, 'stroke(', false);
    for(let i = 0; i < c_stroke; i++){
      var m = this.t.extract(r_p5, 'stroke(', ')');
      var value = 'ofSetColor('+m+');\nofNoFill();';
      r_p5 = r_p5.replace('stroke('+m+')', value);
  	}
    //Prims 2D
  	r_p5 = r_p5.replace(/ellipse\(/g, 'ofEllipse(');
  	r_p5 = r_p5.replace(/rect\(/g, 'ofRect(');
  	r_p5 = r_p5.replace(/line\(/g, 'ofLine(');
  	r_p5 = r_p5.replace(/triangle\(/g, 'ofTriangle(');
    //Curves
  	r_p5 = r_p5.replace(/curve\(/g, 'ofCurve(');
  	r_p5 = r_p5.replace(/curveTangent\(/g, 'ofCurveTangent(');
  	r_p5 = r_p5.replace(/curvePoint\(/g, 'ofCurveVertex(');
  	r_p5 = r_p5.replace(/curveDetail\(/g, 'ofSetCurveResolution(');
  	r_p5 = r_p5.replace(/bezier\(/g, 'ofBezier(');
  	r_p5 = r_p5.replace(/bezierDetail\(/g, 'ofSetCurveResolution(');
  	r_p5 = r_p5.replace(/bezierPoint\(/g, 'ofBezierPoint(');
  	//Atts
  	r_p5 = r_p5.replace(/rectMode\(/g, 'ofSetRectMode(');
  	r_p5 = r_p5.replace(/CORNER/g, 'OF_RECTMODE_CORNER');
  	r_p5 = r_p5.replace(/CORNERS/g, 'OF_RECTMODE_CORNER');
  	r_p5 = r_p5.replace(/CENTER/g, 'OF_RECTMODE_CENTER');
  	r_p5 = r_p5.replace(/smooth\(/g, 'ofEnableSmoothing(');
  	r_p5 = r_p5.replace(/noSmooth\(/g, 'ofDisableSmoothing(');
  	r_p5 = r_p5.replace(/strokeWeight\(/g, 'ofSetLineWidth(');
  	//Vertex
  	r_p5 = r_p5.replace(/vertex\(/g, 'ofVertex(');
  	r_p5 = r_p5.replace(/bezierVertex\(/g, 'ofBezierVertex(');
  	r_p5 = r_p5.replace(/curveVertex\(/g, 'ofCurveVertex(');
  	r_p5 = r_p5.replace(/beginShape\(/g, 'ofBeginShape(');
  	r_p5 = r_p5.replace(/endShape\(/g, 'ofEndShape(');
  	//Image
  	r_p5 = r_p5.replace(/tint\(/g, 'ofSetColor(');
  	r_p5 = r_p5.replace(/noTint\(/g, 'ofSetColor(255');
  	//In
  	r_p5 = r_p5.replace(/mouseX/g, 'ofGetMouseX()');
  	r_p5 = r_p5.replace(/mouseY/g, 'ofGetMouseY()');
  	r_p5 = r_p5.replace(/pmouseX/g, 'ofGetPreviousMouseX()');
  	r_p5 = r_p5.replace(/pmouseY/g, 'ofGetPreviousMouseY()');
    //Out
  	r_p5 = r_p5.replace(/save\(/g, 'ofSaveScreen(');
  	r_p5 = r_p5.replace(/saveFrame\(/g, 'ofSaveFrame(');
    var c_print = this.t.repeted(r_p5, 'profToInt(', false);
    for(let i = 0; i < c_print; i++){
      var m = this.t.extract(r_p5, 'profToInt(', ')');
      var value = 'cout << '+m+'';
      r_p5 = r_p5.replace('profToInt('+m+')', value);
  	}
    var c_println = this.t.repeted(r_p5, 'println(', false);
    for(let i = 0; i < c_println; i++){
      var m = this.t.extract(r_p5, 'println(', ')');
      var value = 'cout << '+m+' << endl';
      r_p5 = r_p5.replace('println('+m+')', value);
  	}

    ///////////////////
    //Final Sets
    r_p5 = r_p5.replace(/; ;/g, ';');
    r_p5 = r_p5.replace(/;;/g, ';');
    r_p5 = r_p5.replace(/\bif\b/g, 'if ');
    r_p5 = r_p5.replace(/\belse\b/g, 'else ');
    r_p5 = r_p5.replace(/\bfor\b/g, 'for ');
    r_p5 = r_p5.replace(/\bwhile\b/g, 'while ');
    ///////////////////
    return r_p5;
  }

  ofApph(p5:string){
    var r_p5 = p5;

    r_p5 = "#pragma once\n\n#include \"ofMain.h\"\n\nclass ofApp : public ofBaseApp{\n\n\t public :\n\t\t void setup();\n\t\t void update();\n\t\t void draw();\n}\n\n";
    /////////////////
    return r_p5;
  }

  ofAppcpp(p5:string){
    var r_p5 = p5;

    r_p5 = "#include \"ofApp.h\"\n\nvoid ofApp::setup(){\n\t"+""+"\n}\n\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw(){\n\t"+r_p5+"\n}";
    /////////////////
    return r_p5
  }
}
