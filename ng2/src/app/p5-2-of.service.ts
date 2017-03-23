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
    r_p5 = r_p5.replace(/\( /g, '(');
    r_p5 = r_p5.replace(/ \)/g, ')');
    r_p5 = r_p5.replace(/\) /g, ')');

    ////////////////////
    return r_p5;
  }

  conversor(p5:string){
    var r_p5 = p5;
    //Data
  	r_p5 = r_p5.replace(/boolean /g, 'bool ');
  	r_p5 = r_p5.replace(/color /g, 'ofColor ');
  	r_p5 = r_p5.replace(/byte /g, 'unsigned char ');
    r_p5 = r_p5.replace(/String /g, 'string ');
  	//OPENGL
  	r_p5 = r_p5.replace(/\bP2D\b/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/\bP3D\b/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/\bJAVA2D\b/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/\bOPENGL\b/g, 'OF_WINDOW');
  	//Calc
  	r_p5 = r_p5.replace(/\bconstrain\b\(/g, 'ofClamp(');
  	r_p5 = r_p5.replace(/\bdist\b\(/g, 'ofDist(');
  	r_p5 = r_p5.replace(/\blerp\b\(/g, 'ofLerp(');
  	r_p5 = r_p5.replace(/\bmap\b\(/g, 'ofMap(');
  	r_p5 = r_p5.replace(/\bmax\b\(/g, 'MAX(');
  	r_p5 = r_p5.replace(/\bmin\b\(/g, 'MIN(');
  	r_p5 = r_p5.replace(/\bnorm\b\(/g, 'ofNormalize(');
    var c_sq = this.t.repeted(r_p5, 'sq(', false);
    for(let i = 0; i < c_sq; i++){
      var m = this.t.extract(r_p5, 'sq(', ');');
      var value = 'pow('+m+', 2.0)';
      r_p5 = r_p5.replace('sq('+m+');', value);
  	}
    //Env
    r_p5 = r_p5.replace(/\bsize\b\(/g, 'ofSetupOpenGL(');
  	r_p5 = r_p5.replace(/\bframeCount\b/g, 'ofGetFrameNum()');
  	r_p5 = r_p5.replace(/\bframeRate\b/g, 'ofGetFrameRate()');
  	r_p5 = r_p5.replace(/\bwidth\b/g, 'ofGetWidth()');
  	r_p5 = r_p5.replace(/\bheight\b/g, 'ofGetHeight()');
  	r_p5 = r_p5.replace(/\bdisplayWidth\b/g, 'ofGetScreenWidth()');
  	r_p5 = r_p5.replace(/\bdisplayHeight\b/g, 'ofGetScreenHeight()');
    r_p5 = r_p5.replace(/\bscreen.ofGetWidth\b/g, 'ofGetScreenWidth');
    r_p5 = r_p5.replace(/\bscreen.ofGetHeight\b/g, 'ofGetScreenWidth');
  	r_p5 = r_p5.replace(/\bframeRate\b\(/g, 'ofSetFrameRate(');
    r_p5 = r_p5.replace(/\bnoCursor\b\(/g, 'ofHideCursor(');
    var c_cur = this.t.repeted(r_p5, 'cursor(', false);
    for(let i = 0; i < c_cur; i++){
      var m = this.t.extract(r_p5, 'cursor(', ');');
      var value = 'ofShowCursor();';
      r_p5 = r_p5.replace('cursor('+m+');', value);
  	}
    //Convertion
  	r_p5 = r_p5.replace(/\bboolean\b\(/g, 'ofToBool(');
  	r_p5 = r_p5.replace(/\bbinary\b\(/g, 'ofToBinary(');
  	r_p5 = r_p5.replace(/\bbyte\b\(/g, 'ofToChar(');
  	r_p5 = r_p5.replace(/\bfloat\b\(/g, 'ofToFloat(');
    r_p5 = r_p5.replace(/\bchar\b\(/g, 'ofToChar(');
  	r_p5 = r_p5.replace(/\bhex\b\(/g, 'ofToHex(');
  	r_p5 = r_p5.replace(/\bint\b\(/g, 'ofToInt(');
  	r_p5 = r_p5.replace(/\bstr\b\(/g, 'ofToString(');
    //String Functions
  	r_p5 = r_p5.replace(/\bjoin\b\(/g, 'ofJoinString(');
  	r_p5 = r_p5.replace(/\bnf\b\(/g, 'ofToString(');
  	r_p5 = r_p5.replace(/\bsplit\b\(/g, 'ofSplitString(');
  	r_p5 = r_p5.replace(/\bsplitTokens\b\(/g, 'ofSplitString(');
    //Random
  	r_p5 = r_p5.replace(/\bnoise\b\(/g, 'ofNoise(');
  	r_p5 = r_p5.replace(/\brandom\b\(/g, 'ofRandom(');
  	r_p5 = r_p5.replace(/\brandomSeed\b\(/g, 'ofSeedRandom(');
    //Cons
  	r_p5 = r_p5.replace(/\bQUARTER_PI\b/g, 'HALF_PI/2');
  	r_p5 = r_p5.replace(/\bTAU\b/g, 'TWO_PI');
    //Date & Hour
  	r_p5 = r_p5.replace(/\bday\b\(/g, 'ofGetDay(');
  	r_p5 = r_p5.replace(/\bhour\b\(/g, 'ofGetHours(');
  	r_p5 = r_p5.replace(/\bmillis\b\(/g, 'ofGetElapsedTimeMillis(');
  	r_p5 = r_p5.replace(/\bminute\b\(/g, 'ofGetMinutes(');
  	r_p5 = r_p5.replace(/\bmonth\b\(/g, 'ofGetMonth(');
  	r_p5 = r_p5.replace(/\bsecond\b\(/g, 'ofGetSeconds(');
  	r_p5 = r_p5.replace(/\byear\b\(/g, 'ofGetYear(');
    //Transforms
  	r_p5 = r_p5.replace(/\bpopMatrix\b\(/g, 'ofPopMatrix(');
  	r_p5 = r_p5.replace(/\bpopStyle\b\(/g, 'ofPopStyle(');
    r_p5 = r_p5.replace(/\bpushMatrix\b\(/g, 'ofPushMatrix(');
  	r_p5 = r_p5.replace(/\bpushStyle\b\(/g, 'ofPushStyle(');
  	r_p5 = r_p5.replace(/\brotate\b\(/g, 'ofRotate(');
  	r_p5 = r_p5.replace(/\brotateX\b\(/g, 'ofRotateX(');
  	r_p5 = r_p5.replace(/\brotateY\b\(/g, 'ofRotateY(');
  	r_p5 = r_p5.replace(/\brotateZ\b\(/g, 'ofRotateZ(');
  	r_p5 = r_p5.replace(/\btranslate\b\(/g, 'ofTranslate(');
  	r_p5 = r_p5.replace(/\bscale\b\(/g, 'ofScale(');
    //Color
    r_p5 = r_p5.replace(/\bbackground\b\(/g, 'ofBackground(');
    r_p5 = r_p5.replace(/\bnoFill\b\(/g, 'ofNoFill(');
  	r_p5 = r_p5.replace(/\bnoStroke\b\(/g, 'ofFill(');
  	r_p5 = r_p5.replace(/\bcolor\b\(/g, 'ofColor(');
    var c_fill = this.t.repeted(r_p5, 'fill(', false);
    for(let i = 0; i < c_fill; i++){
      var m = this.t.extract(r_p5, 'fill(', ');');
      var value = 'ofSetColor('+m+');\nofFill();';
      r_p5 = r_p5.replace('fill('+m+');', value);
  	}
    var c_stroke = this.t.repeted(r_p5, 'stroke(', false);
    for(let i = 0; i < c_stroke; i++){
      var m = this.t.extract(r_p5, 'stroke(', ');');
      var value = 'ofSetColor('+m+');\nofNoFill();';
      r_p5 = r_p5.replace('stroke('+m+');', value);
  	}
    //Prims 2D
  	r_p5 = r_p5.replace(/\bellipse\b\(/g, 'ofEllipse(');
  	r_p5 = r_p5.replace(/\brect\b\(/g, 'ofRect(');
  	r_p5 = r_p5.replace(/\bline\b\(/g, 'ofLine(');
  	r_p5 = r_p5.replace(/\btriangle\b\(/g, 'ofTriangle(');
    //Curves
  	r_p5 = r_p5.replace(/\bcurve\b\(/g, 'ofCurve(');
  	r_p5 = r_p5.replace(/\bcurveTangent\b\(/g, 'ofCurveTangent(');
  	r_p5 = r_p5.replace(/\bcurvePoint\b\(/g, 'ofCurveVertex(');
  	r_p5 = r_p5.replace(/\bcurveDetail\b\(/g, 'ofSetCurveResolution(');
  	r_p5 = r_p5.replace(/\bbezier\b\(/g, 'ofBezier(');
  	r_p5 = r_p5.replace(/\bbezierDetail\b\(/g, 'ofSetCurveResolution(');
  	r_p5 = r_p5.replace(/\bbezierPoint\b\(/g, 'ofBezierPoint(');
  	//Atts
  	r_p5 = r_p5.replace(/\brectMode\b\(/g, 'ofSetRectMode(');
  	r_p5 = r_p5.replace(/\bCORNER\b/g, 'OF_RECTMODE_CORNER');
  	r_p5 = r_p5.replace(/\bCORNERS\b/g, 'OF_RECTMODE_CORNER');
  	r_p5 = r_p5.replace(/\bCENTER\b/g, 'OF_RECTMODE_CENTER');
  	r_p5 = r_p5.replace(/\bsmooth\b\(/g, 'ofEnableSmoothing(');
  	r_p5 = r_p5.replace(/\bnoSmooth\b\(/g, 'ofDisableSmoothing(');
  	r_p5 = r_p5.replace(/\bstrokeWeight\b\(/g, 'ofSetLineWidth(');
  	//Vertex
  	r_p5 = r_p5.replace(/\bvertex\b\(/g, 'ofVertex(');
  	r_p5 = r_p5.replace(/\bbezierVertex\b\(/g, 'ofBezierVertex(');
  	r_p5 = r_p5.replace(/\bcurveVertex\b\(/g, 'ofCurveVertex(');
  	r_p5 = r_p5.replace(/\bbeginShape\b\(/g, 'ofBeginShape(');
  	r_p5 = r_p5.replace(/\bendShape\b\(/g, 'ofEndShape(');
  	//Image
  	r_p5 = r_p5.replace(/\btint\b\(/g, 'ofSetColor(');
  	r_p5 = r_p5.replace(/\bnoTint\b\(/g, 'ofSetColor(255');
  	//In
  	r_p5 = r_p5.replace(/\bmouseX\b/g, 'ofGetMouseX()');
  	r_p5 = r_p5.replace(/\bmouseY\b/g, 'ofGetMouseY()');
  	r_p5 = r_p5.replace(/\bpmouseX\b/g, 'ofGetPreviousMouseX()');
  	r_p5 = r_p5.replace(/\bpmouseY\b/g, 'ofGetPreviousMouseY()');
    //Out
  	r_p5 = r_p5.replace(/\bsave\b\(/g, 'ofSaveScreen(');
  	r_p5 = r_p5.replace(/\bsaveFrame\b\(/g, 'ofSaveFrame(');
    var c_print = this.t.repeted(r_p5, 'profToInt(', false);
    for(let i = 0; i < c_print; i++){
      var m = this.t.extract(r_p5, 'print(', ');');
      var value = 'cout << '+m+'';
      r_p5 = r_p5.replace('print('+m+');', value);
  	}
    var c_println = this.t.repeted(r_p5, 'println(', false);
    for(let i = 0; i < c_println; i++){
      var m = this.t.extract(r_p5, 'println(', ');');
      var value = 'cout << '+m+' << endl';
      r_p5 = r_p5.replace('println('+m+');', value);
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

    //var setup = r_p5.replace(/void setup\(\){([^]*)}/, "$1");
    //var draw = r_p5.replace(/void draw\(\){([^]*)}/, "$1");
    var csetup = r_p5.search("void setup()");
    var cdraw = r_p5.search("void draw()");

    var csize = this.t.repeted(r_p5, 'ofSetupOpenGL(', false);
    for(let i = 0; i < csize; i++){
      var m = this.t.extract(r_p5, 'ofSetupOpenGL(', ');');
      var value = '';
      r_p5 = r_p5.replace('ofSetupOpenGL('+m+');', value);
  	}
    r_p5 = r_p5.replace(/fullScreen\(\);/g, '');
    r_p5 = r_p5.replace(/fullScreen\(\w\);/g, '');

    if(csetup === -1 || cdraw === -1){
      r_p5 = r_p5.replace(/(\n)/g, '\n\t');
      r_p5 = "#include \"ofApp.h\"\n\nvoid ofApp::setup(){\n\t"+"ofBackground(204);\n\tofSetColor(255);\n\tofFill();"+"\n}\n\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw(){\n\t"+r_p5+"\n}";
    }
    else{
      r_p5 = r_p5.replace(/\n\s*\n/g, '\n');
      r_p5 = r_p5.replace(/void draw\(\)/g, "\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw()");
      r_p5 = r_p5.replace(/void setup\(\)\{/g, "void ofApp::setup(){\n\tofBackground(204);\n\tofSetColor(255);\n\tofFill();");
      r_p5 = "#include \"ofApp.h\"\n\n"+r_p5;
    }

    /////////////////
    return r_p5
  }

  maincpp(p5:string){
    var r_p5 = p5;
    var opengl = "";

    var csize = this.t.repeted(r_p5, 'ofSetupOpenGL(', false);
    var cfull = this.t.repeted(r_p5, 'fullScreen(', false);
    if(csize === 1){
      var m = this.t.extract(r_p5, 'ofSetupOpenGL(', ')');
      var ms = m.split(',');
      if(ms.length === 3){
        opengl = "ofSetupOpenGL("+m+");";
      }else if(ms.length === 2){
        opengl = "ofSetupOpenGL("+m+", OF_WINDOW);";
      }else{
        opengl = "ofSetupOpenGL(100, 100, OF_WINDOW);";
      }
    }else if(cfull === 1){
      opengl = "ofSetupOpenGL(ofGetScreenWidth(), ofGetScreenHeight(), OF_WINDOW);";
    }else{
      opengl = "ofSetupOpenGL(100, 100, OF_WINDOW);";
    }

    var f_p5 = "#include \"ofMain.h\"\n#include \"ofApp.h\"\n\nint main( ){\n\n\t"+opengl+"\n\n\tofRunApp(new ofApp());\n}";
    /////////////////
    return f_p5
  }
  ////////////////////////////////////////////////
  p5ver(p5:string){
    var ver:string = '1.0.0+';

    var c_rect = this.t.repeted(p5, 'rect(', false);
    var f_rect:any = [];
    var rectR:boolean = false;
    for(let i = 0; i < c_rect; i++){
      var m = this.t.extract(p5, 'rect(', ');');
      var n = m.split(',');
      f_rect[i] = n.length;
  	}
    for(let i = 0; i < f_rect; i++){
      if(f_rect[i] > 4){
        rectR = true;
      }
  	}

    if(p5.search(/\bdisplayWidth\b/) !== -1 || p5.search(/\bdisplayHeight\b/) !== -1 || p5.search(/\bOPENGL\b/) !== -1
      || rectR){
      ver = '2.0.0+';
    }else if(p5.search(/\bfullScreen\b\(/) !== -1 || p5.search(/\bFX2D\b/) !== -1){
      ver = '3.0.0+';
    }
    ///////////////
    return ver;
  }
}
