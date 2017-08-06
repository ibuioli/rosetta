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
    let r_p5 = p5;
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
    r_p5 = r_p5.replace(/\= /g, '=');
    r_p5 = r_p5.replace(/ \=/g, '=');
    r_p5 = r_p5.replace(/ \= /g, '=');
    r_p5 = r_p5.replace(/, /g, ',');
    r_p5 = r_p5.replace(/ , /g, ',');
    r_p5 = r_p5.replace(/ ,/g, ',');

    ////////////////////
    return r_p5;
  }

  conversor(p5:string, of:string){
    let r_p5 = p5;

    /////// DATA ///////
  	r_p5 = r_p5.replace(/boolean /g, 'bool ');
  	r_p5 = r_p5.replace(/color /g, 'ofColor ');
  	r_p5 = r_p5.replace(/byte /g, 'unsigned char ');
    r_p5 = r_p5.replace(/final /g, 'const ');
    r_p5 = r_p5.replace(/String /g, 'string ');
    r_p5 = r_p5.replace(/Array /g, 'vector ');
    r_p5 = r_p5.replace(/ArrayList /g, 'list ');
    r_p5 = r_p5.replace(/HashMap /g, 'map ');
    r_p5 = r_p5.replace(/PImage /g, 'ofImage ');
    r_p5 = r_p5.replace(/PFont /g, 'ofTrueTypeFont ');
    r_p5 = r_p5.replace(/PVector /g, 'ofVec2f ');
    r_p5 = r_p5.replace(/PGraphics /g, 'ofFbo ');
    /////// CONS ///////
  	r_p5 = r_p5.replace(/\bQUARTER_PI\b/g, 'HALF_PI/2');
  	r_p5 = r_p5.replace(/\bTAU\b/g, 'TWO_PI');
  	r_p5 = r_p5.replace(/\bP2D\b/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/\bP3D\b/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/\bJAVA2D\b/g, 'OF_WINDOW');
  	r_p5 = r_p5.replace(/\bOPENGL\b/g, 'OF_WINDOW');
    r_p5 = r_p5.replace(/\bRGB\b/g, 'OF_IMAGE_COLOR');
    r_p5 = r_p5.replace(/\bARGB\b/g, 'OF_IMAGE_COLOR_ALPHA');
    r_p5 = r_p5.replace(/\bALPHA\b/g, 'OF_IMAGE_GRAYSCALE');
  	/////// CALC ///////
  	r_p5 = r_p5.replace(/\bconstrain\b\(/g, 'ofClamp(');
  	r_p5 = r_p5.replace(/\bdist\b\(/g, 'ofDist(');
    let c_mag = this.t.repeted(r_p5, 'mag(', false);
    for(let i = 0; i < c_mag; i++){
      let m = this.t.extract(r_p5, 'mag(', ');');
      if(this.t.countpar(m, ',') <= 1){
        r_p5 = r_p5.replace('mag('+m+');', 'ofDist(0, 0, '+m+');');
      }else if(this.t.countpar(m, ',') > 1){
        r_p5 = r_p5.replace('mag('+m+');', 'ofDist(0, 0, 0, '+m+');');
      }
  	}
  	r_p5 = r_p5.replace(/\blerp\b\(/g, 'ofLerp(');
  	r_p5 = r_p5.replace(/\bmap\b\(/g, 'ofMap(');
  	r_p5 = r_p5.replace(/\bmax\b\(/g, 'MAX(');
  	r_p5 = r_p5.replace(/\bmin\b\(/g, 'MIN(');
  	r_p5 = r_p5.replace(/\bnorm\b\(/g, 'ofNormalize(');
    let c_sq = this.t.repeted(r_p5, 'sq(', false);
    for(let i = 0; i < c_sq; i++){
      let m = this.t.extract(r_p5, 'sq(', ');');
      let value = 'pow('+m+', 2.0)';
      r_p5 = r_p5.replace('sq('+m+');', value);
  	}
    r_p5 = r_p5.replace(/\bdegrees\b\(/g, 'ofRagToDeg(');
    r_p5 = r_p5.replace(/\bradians\b\(/g, 'ofDegToRag(');
    r_p5 = r_p5.replace(/\b=new ofVec2f\b\(/g, '.set(');
    /////// ENV ///////
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
    let c_cur = this.t.repeted(r_p5, 'cursor(', false);
    for(let i = 0; i < c_cur; i++){
      let m = this.t.extract(r_p5, 'cursor(', ');');
      let value = 'ofShowCursor();';
      r_p5 = r_p5.replace('cursor('+m+');', value);
  	}
    r_p5 = r_p5.replace(/\bdelay\b\(/g, 'ofSleepMillis(');
    /////// CONVERTION ///////
  	r_p5 = r_p5.replace(/\bboolean\b\(/g, 'ofToBool(');
  	r_p5 = r_p5.replace(/\bbinary\b\(/g, 'ofToBinary(');
  	r_p5 = r_p5.replace(/\bbyte\b\(/g, 'ofToChar(');
  	r_p5 = r_p5.replace(/\bfloat\b\(/g, 'ofToFloat(');
    r_p5 = r_p5.replace(/\bchar\b\(/g, 'ofToChar(');
  	r_p5 = r_p5.replace(/\bhex\b\(/g, 'ofToHex(');
  	r_p5 = r_p5.replace(/\bint\b\(/g, 'ofToInt(');
  	r_p5 = r_p5.replace(/\bstr\b\(/g, 'ofToString(');
    /////// STRING FUNS ///////
  	r_p5 = r_p5.replace(/\bjoin\b\(/g, 'ofJoinString(');
  	r_p5 = r_p5.replace(/\bnf\b\(/g, 'ofToString(');
  	r_p5 = r_p5.replace(/\bsplit\b\(/g, 'ofSplitString(');
  	r_p5 = r_p5.replace(/\bsplitTokens\b\(/g, 'ofSplitString(');
    /////// RANDOM ///////
  	r_p5 = r_p5.replace(/\bnoise\b\(/g, 'ofNoise(');
  	r_p5 = r_p5.replace(/\brandom\b\(/g, 'ofRandom(');
  	r_p5 = r_p5.replace(/\brandomSeed\b\(/g, 'ofSeedRandom(');
    /////// DATE & HOUR ///////
  	r_p5 = r_p5.replace(/\bday\b\(/g, 'ofGetDay(');
  	r_p5 = r_p5.replace(/\bhour\b\(/g, 'ofGetHours(');
  	r_p5 = r_p5.replace(/\bmillis\b\(/g, 'ofGetElapsedTimeMillis(');
  	r_p5 = r_p5.replace(/\bminute\b\(/g, 'ofGetMinutes(');
  	r_p5 = r_p5.replace(/\bmonth\b\(/g, 'ofGetMonth(');
  	r_p5 = r_p5.replace(/\bsecond\b\(/g, 'ofGetSeconds(');
  	r_p5 = r_p5.replace(/\byear\b\(/g, 'ofGetYear(');
    /////// TRANSFORMS ///////
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
    /////// COLOR ///////
    r_p5 = r_p5.replace(/\bcolorMode\(\w*\)\;/g, '');
    r_p5 = r_p5.replace(/\bbackground\b\(/g, 'ofBackground(');
    r_p5 = r_p5.replace(/\bnoFill\b\(/g, 'ofNoFill(');
  	r_p5 = r_p5.replace(/\bnoStroke\b\(/g, 'ofFill(');
  	r_p5 = r_p5.replace(/\bcolor\b\(/g, 'ofColor(');
    let c_fill = this.t.repeted(r_p5, 'fill(', false);
    for(let i = 0; i < c_fill; i++){
      let m = this.t.extract(r_p5, 'fill(', ');');
      let value = 'ofSetColor('+m+');ofFill();';
      r_p5 = r_p5.replace('fill('+m+');', value);
  	}
    let c_stroke = this.t.repeted(r_p5, 'stroke(', false);
    for(let i = 0; i < c_stroke; i++){
      let m = this.t.extract(r_p5, 'stroke(', ');');
      let value = 'ofSetColor('+m+');ofNoFill();';
      r_p5 = r_p5.replace('stroke('+m+');', value);
  	}
    /////// PRIMS 2D ///////
    if(of === '0.9.x'){
      r_p5 = r_p5.replace(/\bellipse\b\(/g, 'ofDrawEllipse(');
      let c_rect = this.t.repeted(r_p5, 'rect(', false);
      for(let i = 0; i < c_rect; i++){
        let m = this.t.extract(r_p5, 'rect(', ');');
        if(this.t.countpar(m, ',') <= 3){
          r_p5 = r_p5.replace('rect('+m+');', 'ofDrawRectangle('+m+');');
        }else if(this.t.countpar(m, ',') > 3){
          r_p5 = r_p5.replace('rect('+m+');', 'ofDrawRectRounded('+m+');');
        }
    	}
    	r_p5 = r_p5.replace(/\bline\b\(/g, 'ofDrawLine(');
    	r_p5 = r_p5.replace(/\btriangle\b\(/g, 'ofDrawTriangle(');
      let c_point = this.t.repeted(r_p5, 'point(', false);
      for(let i = 0; i < c_point; i++){
        let m = this.t.extract(r_p5, 'point(', ');');
        let value = 'ofDrawRectangle('+m+', 1, 1);';
        r_p5 = r_p5.replace('point('+m+');', value);
    	}
    }else if(of === '0.8.x'){
      r_p5 = r_p5.replace(/\bellipse\b\(/g, 'ofEllipse(');
      let c_rect = this.t.repeted(r_p5, 'rect(', false);
      for(let i = 0; i < c_rect; i++){
        let m = this.t.extract(r_p5, 'rect(', ');');
        if(m.indexOf("(") === -1){
          let n = m.split(',');
          if(n.length <= 4){
            r_p5 = r_p5.replace('rect(', 'ofRect(');
          }else{
            r_p5 = r_p5.replace('rect('+m+');', 'ofRect('+n[0]+','+n[1]+','+n[2]+','+n[3]+');');
          }
        }else{
          let sn = [];
          sn = this.t.params(m, ',', 4);
          r_p5 = r_p5.replace('rect('+m+');', 'ofRect('+sn[0]+','+sn[1]+','+sn[2]+','+sn[3]+');');
        }
    	}
    	r_p5 = r_p5.replace(/\bline\b\(/g, 'ofLine(');
    	r_p5 = r_p5.replace(/\btriangle\b\(/g, 'ofTriangle(');
      let c_point = this.t.repeted(r_p5, 'point(', false);
      for(let i = 0; i < c_point; i++){
        let m = this.t.extract(r_p5, 'point(', ');');
        let value = 'ofRect('+m+', 1, 1);';
        r_p5 = r_p5.replace('point('+m+');', value);
    	}
    }
    let c_quad = this.t.repeted(r_p5, 'quad(', false);
    for(let i = 0; i < c_quad; i++){
      let m = this.t.extract(r_p5, 'quad(', ');');
      let p = this.t.params(m, ',', 8);
      r_p5 = r_p5.replace('quad('+m+');', "ofBeginShape();\nofVertex("+p[0]+","+p[1]+");\nofVertex("+p[2]+","+p[3]+");\nofVertex("+p[4]+","+p[5]+");\nofVertex("+p[6]+","+p[7]+");\nofEndShape();");
    }
    let c_arc = this.t.repeted(r_p5, 'arc(', false);
    for(let i = 0; i < c_arc; i++){
      let m = this.t.extract(r_p5, 'arc(', ');');
      let v = "of_"+Math.random().toString(36).substr(2, 5);
      let cp = this.t.countpar(m, ',');
      let p = this.t.params(m, ',', cp+1);
      for (let s = 0; s < p.length; s++) {
        p[s] = p[s].replace(/\bHALF_PI\b/g, "90");
        p[s] = p[s].replace(/\bPI\b/g, "180");
        p[s] = p[s].replace(/\bTWO_PI\b/g, "360");
      }
      if(p[6] === undefined || p[6] === 'OPEN'){
        r_p5 = r_p5.replace("arc("+m+");", "ofPolyline "+v+";\n"+v+".°arc°("+p[0]+","+p[1]+","+p[2]+","+p[3]+","+p[4]+","+p[5]+");\n"+v+".draw();");
      }else if(p[6] === 'CHORD'){
        r_p5 = r_p5.replace("arc("+m+");", "ofPolyline "+v+";\n"+v+".°arc°("+p[0]+","+p[1]+","+p[2]+","+p[3]+","+p[4]+","+p[5]+");\n"+v+".close();\n"
        +v+".draw();");
      }else if(p[6] === 'PIE'){
        r_p5 = r_p5.replace("arc("+m+");", "ofPolyline "+v+";\n"+v+".°arc°("+p[0]+","+p[1]+","+p[2]+","+p[3]+","+p[4]+","+p[5]+");\n"
        +v+".lineTo("+p[0]+","+p[1]+");\n"+v+".close();\n"+v+".draw();");
      }else{
        r_p5 = r_p5.replace("arc("+m+");", "ofPolyline "+v+";\n"+v+".°arc°("+p[0]+","+p[1]+","+p[2]+","+p[3]+","+p[4]+","+p[5]+");\n"+v+".draw();");
      }
    }
    /////// PRIMS 3D ///////
    if(of === '0.9.x'){
      r_p5 = r_p5.replace(/\bbox\b\(/g, 'ofDrawBox(');
      r_p5 = r_p5.replace(/\bsphere\b\(/g, 'ofDrawSphere(');
    }else if(of === '0.8.x'){
      r_p5 = r_p5.replace(/\bbox\b\(/g, 'ofBox(');
      r_p5 = r_p5.replace(/\bsphere\b\(/g, 'ofSphere(');
    }
    r_p5 = r_p5.replace(/\bsphereDetail\b\(/g, 'ofSetSphereResolution(');
    r_p5 = r_p5.replace(/\blights\b\(/g, 'ofEnableLighting(');
    r_p5 = r_p5.replace(/\bnoLights\b\(/g, 'ofDisableLighting(');
    /////// CURVES ///////
    if(of === '0.9.x'){
      r_p5 = r_p5.replace(/\bbezier\b\(/g, 'ofDrawBezier(');
      r_p5 = r_p5.replace(/\bcurve\b\(/g, 'ofDrawCurve(');
    }else if(of === '0.8.x'){
      r_p5 = r_p5.replace(/\bbezier\b\(/g, 'ofBezier(');
      r_p5 = r_p5.replace(/\bcurve\b\(/g, 'ofCurve(');
    }
  	r_p5 = r_p5.replace(/\bcurveTangent\b\(/g, 'ofCurveTangent(');
  	r_p5 = r_p5.replace(/\bcurvePoint\b\(/g, 'ofCurveVertex(');
  	r_p5 = r_p5.replace(/\bcurveDetail\b\(/g, 'ofSetCurveResolution(');
  	r_p5 = r_p5.replace(/\bbezierDetail\b\(/g, 'ofSetCurveResolution(');
  	r_p5 = r_p5.replace(/\bbezierPoint\b\(/g, 'ofBezierPoint(');
  	/////// ATTS ///////
  	r_p5 = r_p5.replace(/\brectMode\b\(/g, 'ofSetRectMode(');
  	r_p5 = r_p5.replace(/\bCORNER\b/g, 'OF_RECTMODE_CORNER');
  	r_p5 = r_p5.replace(/\bCORNERS\b/g, 'OF_RECTMODE_CORNER');
  	r_p5 = r_p5.replace(/\bCENTER\b/g, 'OF_RECTMODE_CENTER');
    r_p5 = r_p5.replace(/\bRADIUS\b/g, 'OF_RECTMODE_CENTER');
  	r_p5 = r_p5.replace(/\bsmooth\b\(/g, 'ofEnableSmoothing(');
  	r_p5 = r_p5.replace(/\bnoSmooth\b\(/g, 'ofDisableSmoothing(');
  	r_p5 = r_p5.replace(/\bstrokeWeight\b\(/g, 'ofSetLineWidth(');
  	/////// VERTEX ///////
  	r_p5 = r_p5.replace(/\bvertex\b\(/g, 'ofVertex(');
  	r_p5 = r_p5.replace(/\bbezierVertex\b\(/g, 'ofBezierVertex(');
  	r_p5 = r_p5.replace(/\bcurveVertex\b\(/g, 'ofCurveVertex(');
  	r_p5 = r_p5.replace(/\bbeginShape\b\(/g, 'ofBeginShape(');
  	r_p5 = r_p5.replace(/\bendShape\b\(/g, 'ofEndShape(');
  	/////// IMAGE ///////
    let c_image = this.t.repeted(r_p5, 'image(', false);
    for(let i = 0; i < c_image; i++){
      let m = this.t.extract(r_p5, 'image(', ');');
      let mc = this.t.countpar(m, ',');
      let p = this.t.params(m, ',', mc+1);
      if(mc === 2){
        r_p5 = r_p5.replace('image('+m+');', p[0]+"."+"draw("+p[1]+","+p[2]+");");
      }else if(mc === 4){
        r_p5 = r_p5.replace('image('+m+');', p[0]+"."+"draw("+p[1]+","+p[2]+","+p[3]+","+p[4]+");");
      }else{
        r_p5 = r_p5.replace('image('+m+');', ".draw("+m+");");
      }
  	}
    r_p5 = r_p5.replace(/\b=loadImage\b\(/g, '.load(');
    r_p5 = r_p5.replace(/\b=createImage\b\(/g, '.allocate(');
  	r_p5 = r_p5.replace(/\btint\b\(/g, 'ofSetColor(');
  	r_p5 = r_p5.replace(/\bnoTint\b\(/g, 'ofSetColor(255');
    r_p5 = r_p5.replace(/\b\.pixels\b/g, '.getPixels()');
    r_p5 = r_p5.replace(/\b\.getPixels\(\)\.length\b/g, '.getPixels().size()');
    r_p5 = r_p5.replace(/\b\.updatePixels\b\(/g, '.reloadTexture(');
    r_p5 = r_p5.replace(/\b.*\.loadPixels\b\(\)/g, '');
    /////// FONT ///////
    r_p5 = r_p5.replace(/\b=loadFont\b\(/g, '.load(');
    r_p5 = r_p5.replace(/\b=createFont\b\(/g, '.load(');
    if(r_p5.indexOf("textFont(") === -1){
      r_p5 = r_p5.replace(/\btext\b\(/g, 'ofDrawBitmapString(');
    }else{
      let pfont = [];
      let c_tfont = this.t.repeted(r_p5, 'textFont(', false);
      for(let i = 0; i < c_tfont; i++){
        let m = this.t.extract(r_p5, 'textFont(', ');');
        pfont[i] = m;
        r_p5 = r_p5.replace("textFont("+m+");", "");
    	}
      r_p5 = r_p5.replace(/\btext\b\(/g, pfont[0]+'.drawString(');
    }
    /////// GRAPHICS ///////
    let c_cgraphics = this.t.repeted(r_p5, '=createGraphics(', false);
    for(let i = 0; i < c_cgraphics; i++){
      let m = this.t.extract(r_p5, '=createGraphics(', ');');
      let mc = this.t.countpar(m, ',');
      let p = this.t.params(m, ',', mc+1);
      r_p5 = r_p5.replace("=createGraphics("+m+")", '.allocate('+p[0]+','+p[1]+', GL_RGBA)');
  	}
    if(c_cgraphics >= 1){
      r_p5 = r_p5.replace(/\b\.beginDraw\b\(/g, '.begin(');
      r_p5 = r_p5.replace(/\b\.endDraw\b\(/g, '.end(');
      r_p5 = r_p5.replace(/\b.*\.ofBackground\b\(/g, 'ofBackground(');
      r_p5 = r_p5.replace(/\b.*\.ofSetColor\b\(/g, 'ofSetColor(');
      r_p5 = r_p5.replace(/\b.*\.ofVertex\b\(/g, 'ofVertex(');
      r_p5 = r_p5.replace(/\b.*\.ofBeginShape\b\(/g, 'ofBeginShape(');
      r_p5 = r_p5.replace(/\b.*\.ofEndShape\b\(/g, 'ofEndShape(');
      r_p5 = r_p5.replace(/\b.*\.ofBezierVertex\b\(/g, 'ofBezierVertex(');
      r_p5 = r_p5.replace(/\b.*\.ofCurveVertex\b\(/g, 'ofCurveVertex(');
      r_p5 = r_p5.replace(/\b.*\.ofDrawBitmapString\b\(/g, 'ofDrawBitmapString(');
      r_p5 = r_p5.replace(/\b.*\.ofSetRectMode\b\(/g, 'ofSetRectMode(');
      r_p5 = r_p5.replace(/\b.*\.ofSetLineWidth\b\(/g, 'ofSetLineWidth(');
      r_p5 = r_p5.replace(/\b.*\.ofBox\b\(/g, 'ofBox(');
      r_p5 = r_p5.replace(/\b.*\.ofSphere\b\(/g, 'ofSphere(');
      r_p5 = r_p5.replace(/\b.*\.ofPolyline\b/g, 'ofPolyline');
      r_p5 = r_p5.replace(/\b.*\.ofEnableLighting\b\(/g, 'ofEnableLighting(');
      r_p5 = r_p5.replace(/\b.*\.ofDisableLighting\b\(/g, 'ofDisableLighting(');
      r_p5 = r_p5.replace(/\b.*\.(.*)\.draw\b\(/g, '$1.draw(');
      r_p5 = r_p5.replace(/\b.*\.(.*)\.drawString\b\(/g, '$1.drawString(');
      if(of === '0.9.x'){
        r_p5 = r_p5.replace(/\b.*\.ofDrawLine\b\(/g, 'ofDrawLine(');
        r_p5 = r_p5.replace(/\b.*\.ofDrawRectangle\b\(/g, 'ofDrawRectangle(');
        r_p5 = r_p5.replace(/\b.*\.ofDrawRectRounded\b\(/g, 'ofDrawRectRounded(');
        r_p5 = r_p5.replace(/\b.*\.ofDrawEllipse\b\(/g, 'ofDrawEllipse(');
        r_p5 = r_p5.replace(/\b.*\.ofDrawBezier\b\(/g, 'ofDrawBezier(');
        r_p5 = r_p5.replace(/\b.*\.ofDrawCurve\b\(/g, 'ofDrawCurve(');
      }else if(of === '0.8.x'){
        r_p5 = r_p5.replace(/\b.*\.ofLine\b\(/g, 'ofLine(');
        r_p5 = r_p5.replace(/\b.*\.ofRect\b\(/g, 'ofRect(');
        r_p5 = r_p5.replace(/\b.*\.ofEllipse\b\(/g, 'ofEllipse(');
        r_p5 = r_p5.replace(/\b.*\.ofBezier\b\(/g, 'ofBezier(');
        r_p5 = r_p5.replace(/\b.*\.ofCurve\b\(/g, 'ofCurve(');
      }
      r_p5 = r_p5.replace(/\b.*\. /g, '');
    }
  	/////// IN ///////
  	r_p5 = r_p5.replace(/\bpmouseX\b/g, 'ofGetPreviousMouseX()');
  	r_p5 = r_p5.replace(/\bpmouseY\b/g, 'ofGetPreviousMouseY()');
    r_p5 = r_p5.replace(/\bmouseButton\b/g, 'button');
    r_p5 = r_p5.replace(/\bbutton==LEFT\b/g, 'button==0');
    r_p5 = r_p5.replace(/\bbutton==CENTER\b/g, 'button==1');
    r_p5 = r_p5.replace(/\bbutton==RIGHT\b/g, 'button==2');
    r_p5 = r_p5.replace(/\bkeyCode\b/g, 'key');
    r_p5 = r_p5.replace(/\bkey==CODED\b/g, 'true');
    r_p5 = r_p5.replace(/\bUP\b/g, 'OF_KEY_UP');
    r_p5 = r_p5.replace(/\bDOWN\b/g, 'OF_KEY_DOWN');
    r_p5 = r_p5.replace(/\bLEFT\b/g, 'OF_KEY_LEFT');
    r_p5 = r_p5.replace(/\bRIGHT\b/g, 'OF_KEY_RIGHT');
    r_p5 = r_p5.replace(/\bBACKSPACE\b/g, 'OF_KEY_BACKSPACE');
    r_p5 = r_p5.replace(/\bENTER\b/g, 'OF_KEY_RETURN');
    r_p5 = r_p5.replace(/\bRETURN\b/g, 'OF_KEY_RETURN');
    r_p5 = r_p5.replace(/\bESC\b/g, 'OF_KEY_ESC');
    r_p5 = r_p5.replace(/\bDELETE\b/g, 'OF_KEY_DEL');
    r_p5 = r_p5.replace(/\bSHIFT\b/g, 'OF_KEY_SHIFT');
    r_p5 = r_p5.replace(/\bCONTROL\b/g, 'OF_KEY_CONTROL');
    r_p5 = r_p5.replace(/\bTAB\b/g, 'OF_KEY_TAB');
    r_p5 = r_p5.replace(/\bALT\b/g, 'OF_KEY_ALT');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F1\b/g, 'OF_KEY_F1');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F2\b/g, 'OF_KEY_F2');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F3\b/g, 'OF_KEY_F3');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F4\b/g, 'OF_KEY_F4');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F5\b/g, 'OF_KEY_F5');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F6\b/g, 'OF_KEY_F6');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F7\b/g, 'OF_KEY_F7');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F8\b/g, 'OF_KEY_F8');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F9\b/g, 'OF_KEY_F9');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F10\b/g, 'OF_KEY_F10');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F11\b/g, 'OF_KEY_F11');
    r_p5 = r_p5.replace(/\bKeyEvent\.VK_F12\b/g, 'OF_KEY_F12');
    /////// OUT ///////
  	r_p5 = r_p5.replace(/\bsave\b\(/g, 'ofSaveScreen(');
  	r_p5 = r_p5.replace(/\bsaveFrame\b\(/g, 'ofSaveFrame(');
    let c_print = this.t.repeted(r_p5, 'print(', false);
    for(let i = 0; i < c_print; i++){
      let m = this.t.extract(r_p5, 'print(', ');');
      let value = 'cout << '+m+'';
      r_p5 = r_p5.replace('print('+m+');', value);
  	}
    let c_println = this.t.repeted(r_p5, 'println(', false);
    for(let i = 0; i < c_println; i++){
      let m = this.t.extract(r_p5, 'println(', ');');
      let value = 'cout << '+m+' << endl';
      r_p5 = r_p5.replace('println('+m+');', value);
  	}

    ////////////////////////////////////////////////////////
    //Final Sets
    r_p5 = r_p5.replace(/; ;/g, ';');
    r_p5 = r_p5.replace(/;;/g, ';');
    r_p5 = r_p5.replace(/ \./g, '.');
    r_p5 = r_p5.replace(/\.\./g, '.');
    r_p5 = r_p5.replace(/,/g, ', ');
    r_p5 = r_p5.replace(/=/g, ' = ');
    r_p5 = r_p5.replace(/==/g, ' == ');
    r_p5 = r_p5.replace(/ =  = /g, ' == ');
    r_p5 = r_p5.replace(/ ! = /g, ' != ');
    r_p5 = r_p5.replace(/! = /g, ' != ');
    r_p5 = r_p5.replace(/ < = /g, ' <= ');
    r_p5 = r_p5.replace(/< = /g, ' <= ');
    r_p5 = r_p5.replace(/ > = /g, ' >= ');
    r_p5 = r_p5.replace(/> = /g, ' >= ');
    r_p5 = r_p5.replace(/°arc°/g, 'arc');

    //For the Structure
    r_p5 = r_p5.replace(/\bif\b/g, 'if ');
    r_p5 = r_p5.replace(/\belse\b/g, 'else ');
    r_p5 = r_p5.replace(/\bfor\b/g, 'for ');
    r_p5 = r_p5.replace(/\bwhile\b/g, 'while ');
    ////////////////////////////////////////////////////////
    return r_p5;
  }

  ofApph(p5:string){
    let ofapph:string;
    let forfun:string = "";

    let csetup = p5.search("void setup()");
    let cdraw = p5.search("void draw()");

    if(csetup !== -1 || cdraw !== -1){
      let keyPressed = p5.search(/void keyPressed\(\)/);
      let keyReleased = p5.search(/void keyReleased\(\)/);
      let mousePressed = p5.search(/void mousePressed\(\)/);
      let mouseReleased = p5.search(/void mouseReleased\(\)/);
      let mouseMoved = p5.search(/void mouseMoved\(\)/);
      let mouseDragged = p5.search(/void mouseDragged\(\)/);

      let types = p5.match(/.+ \w+\(.*\)\{/g);
      for (let i = 0; i < types.length; i++) {
          forfun = forfun + types[i]+";\n\t\t";
      }

      forfun = forfun.replace(/\)\{\;/g, ");");
      forfun = forfun.replace("void setup();", "");
      forfun = forfun.replace("void draw();", "");
      forfun = forfun.replace("void keyPressed();", "");
      forfun = forfun.replace("void keyReleased();", "");
      forfun = forfun.replace("void mouseMoved();", "");
      forfun = forfun.replace("void mouseDragged();", "");
      forfun = forfun.replace("void mousePressed();", "");
      forfun = forfun.replace("void mouseReleased();", "");
      forfun = forfun.replace(/=.*;/g, "");

      p5 = p5.replace(/import .*;/g, "");
      p5 = p5.replace(/void setup\(\){([^]*)}/, "");
      p5 = p5.replace(/void draw\(\){([^]*)}/, "");
      p5 = p5.replace(/void keyPressed\(\){([^]*)}/, "");
      p5 = p5.replace(/void keyReleased\(\){([^]*)}/, "");
      p5 = p5.replace(/void mouseMoved\(\){([^]*)}/, "");
      p5 = p5.replace(/void mouseDragged\(\){([^]*)}/, "");
      p5 = p5.replace(/void mousePressed\(\){([^]*)}/, "");
      p5 = p5.replace(/void mouseReleased\(\){([^]*)}/, "");
      p5 = p5.replace(/\n\s*\n/g, '\n');
      p5 = p5.trim();
      p5 = p5.replace(/(\n)/g, '\n\t\t');
      p5 = p5.replace(/ =.*;/g, ";");

      let interactive = "";

      if(keyPressed !== -1){
        interactive = interactive + "\n\t\tvoid keyPressed(int key);";
      }
      if(keyReleased !== -1){
        interactive = interactive + "\n\t\tvoid keyReleased(int key);";
      }
      if(mouseMoved !== -1){
        interactive = interactive + "\n\t\tvoid mouseMoved(int x, int y);";
      }
      if(mouseDragged !== -1){
        interactive = interactive + "\n\t\tvoid mouseDragged(int x, int y, int button);";
      }
      if(mousePressed !== -1){
        interactive = interactive + "\n\t\tvoid mousePressed(int x, int y, int button);";
      }
      if(mouseReleased !== -1){
        interactive = interactive + "\n\t\tvoid mouseReleased(int x, int y, int button);";
      }

      ofapph = "#pragma once\n\n#include \"ofMain.h\"\n\nclass ofApp : public ofBaseApp{\n\n\t public:\n\t\tvoid setup();\n\t\tvoid update();\n\t\tvoid draw();"+interactive+"\n\t\t"+p5+forfun+"\n};\n";
    }else{
      ofapph = "#pragma once\n\n#include \"ofMain.h\"\n\nclass ofApp : public ofBaseApp{\n\n\t public:\n\t\tvoid setup();\n\t\tvoid update();\n\t\tvoid draw();\n};\n";
    }

    /////////////////
    return ofapph;
  }

  ofAppcpp(p5:string){
    let r_p5 = p5;
    let p_p5 = p5;
    let gvar = p5;  //Globals Vars

    //GET GLOBAL VARS//
    gvar = gvar.replace(/(\n)/g, '\n\t');
    gvar = gvar.replace(/int /g, "");
    gvar = gvar.replace(/bool /g, "");
    gvar = gvar.replace(/char /g, "");
    gvar = gvar.replace(/float /g, "");
    gvar = gvar.replace(/unsigned char /g, "");
    gvar = gvar.replace(/ofColor /g, "");
    gvar = gvar.replace(/string /g, "");
    gvar = gvar.replace(/vector /g, "");
    gvar = gvar.replace(/list /g, "");
    gvar = gvar.replace(/map /g, "");
    gvar = gvar.replace(/ofImage /g, "");
    gvar = gvar.replace(/ofTrueTypeFont /g, "");
    gvar = gvar.replace(/ofVect2f /g, "");
    gvar = gvar.replace(/ofFbo /g, "");
    gvar = gvar.replace(/import .*;/g, "");
    gvar = gvar.replace(/void setup\(\){([^]*)}/, "");
    gvar = gvar.replace(/void draw\(\){([^]*)}/, "");
    gvar = gvar.replace(/void keyPressed\(\){([^]*)}/, "");
    gvar = gvar.replace(/void keyReleased\(\){([^]*)}/, "");
    gvar = gvar.replace(/void mouseMoved\(\){([^]*)}/, "");
    gvar = gvar.replace(/void mouseDragged\(\){([^]*)}/, "");
    gvar = gvar.replace(/void mousePressed\(\){([^]*)}/, "");
    gvar = gvar.replace(/void mouseReleased\(\){([^]*)}/, "");
    gvar = gvar.replace(/;/g, ";\n");
    gvar = gvar.replace(/(\D|\W)[a-zA-Z0-9]+;/g, "");
    gvar = gvar.replace(/\n\s*\n/g, '\n');
    gvar = gvar.trim();
    //END GLOBAL VARS//

    //Setup Content//
    let fillSetup:string = "\n\tofSetBackgroundAuto(false);\n\tofEnableAlphaBlending();\n\tofBackground(204);\n\tofSetColor(255);\n\tofFill();";
    //END Setup Content//

    let csetup = r_p5.search("void setup()");
    let cdraw = r_p5.search("void draw()");

    let csize = this.t.repeted(r_p5, 'ofSetupOpenGL(', false);
    for(let i = 0; i < csize; i++){
      let m = this.t.extract(r_p5, 'ofSetupOpenGL(', ');');
      let value = '';
      r_p5 = r_p5.replace('ofSetupOpenGL('+m+');', value);
  	}
    r_p5 = r_p5.replace(/fullScreen\(\);/g, '');
    r_p5 = r_p5.replace(/fullScreen\(\w\);/g, '');

    if(csetup === -1 && cdraw === -1){
      r_p5 = r_p5.replace(/(\n)/g, '\n\t');
      r_p5 = "#include \"ofApp.h\"\n\nvoid ofApp::setup(){"+fillSetup+"\n}\n\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw(){\n\t"+r_p5+"\n}";
    }
    else{
      p_p5 = p_p5.replace(/void setup\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void draw\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void keyPressed\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void keyReleased\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void mouseMoved\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void mouseDragged\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void mousePressed\(\){([^]*)}/, "");
      p_p5 = p_p5.replace(/void mouseReleased\(\){([^]*)}/, "");
      p_p5 = p_p5.trim();

      r_p5 = r_p5.replace(/\n\s*\n/g, '\n');
      r_p5 = r_p5.replace(/void /g, "void ofApp::");
      if(csetup === -1){
        r_p5 = r_p5.replace(/void ofApp::draw\(\)/g, "void ofApp::setup(){"+fillSetup+"\n\t"+gvar+"\n}\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw()");
      }else{
        r_p5 = r_p5.replace(/void ofApp::setup\(\)\{/g, "void ofApp::setup(){"+fillSetup+"\n\t"+gvar);
        r_p5 = r_p5.replace(/void ofApp::draw\(\)/g, "\nvoid ofApp::update(){\n}\n\nvoid ofApp::draw()");
      }
      r_p5 = r_p5.replace(/void ofApp::keyPressed\(\)/g, "\n\nvoid ofApp::keyPressed(int key)");
      r_p5 = r_p5.replace(/void ofApp::keyReleased\(\)/g, "\n\nvoid ofApp::keyReleased(int key)");
      r_p5 = r_p5.replace(/void ofApp::mouseMoved\(\)/g, "\n\nvoid ofApp::mouseMoved(int x, int y)");
      r_p5 = r_p5.replace(/void ofApp::mouseDragged\(\)/g, "\n\nvoid ofApp::mouseDragged(int x, int y, int button)");
      r_p5 = r_p5.replace(/void ofApp::mousePressed\(\)/g, "\n\nvoid ofApp::mousePressed(int x, int y, int button)");
      r_p5 = r_p5.replace(/void ofApp::mouseReleased\(\)/g, "\n\nvoid ofApp::mouseReleased(int x, int y, int button)");
      r_p5 = "#include \"ofApp.h\"\n\n"+r_p5;

      r_p5 = r_p5.replace(p_p5, '');
      r_p5 = r_p5.replace(/(\n\n\n)/g, '\n\n');
    }

    /////////////////
    return r_p5
  }

  maincpp(p5:string){
    let r_p5 = p5;
    let opengl = "";

    let csize = this.t.repeted(r_p5, 'ofSetupOpenGL(', false);
    let cfull = this.t.repeted(r_p5, 'fullScreen(', false);
    if(csize === 1){
      let m = this.t.extract(r_p5, 'ofSetupOpenGL(', ')');
      let ms = m.split(',');
      if(ms.length === 3){
          opengl = "ofSetupOpenGL("+m+");";
      }else if(ms.length === 2){
          opengl = "ofSetupOpenGL("+m+", OF_WINDOW);";
      }else{
          opengl = "ofSetupOpenGL(100, 100, OF_WINDOW);";
      }
    }else if(cfull === 1){
        opengl = "ofSetupOpenGL(ofGetScreenWidth(), ofGetScreenHeight(), OF_FULLSCREEN);";
    }else{
        opengl = "ofSetupOpenGL(100, 100, OF_WINDOW);";
    }

    let maincpp = "#include \"ofMain.h\"\n#include \"ofApp.h\"\n\nint main( ){\n\n\t"+opengl+"\n\n\tofRunApp(new ofApp());\n}";

    /////////////////
    return maincpp;
  }
  ////////////////////////////////////////////////
  p5ver(p5:string){
    let ver:string = '1.0.0+';

    let c_rect = this.t.repeted(p5, 'rect(', false);
    let rect:boolean = false;
    for(let i = 0; i < c_rect; i++){
      let m = this.t.extract(p5, 'rect(', ');');
      if(this.t.countpar(m, ',') <= 3){
        rect = false;
      }else if(this.t.countpar(m, ',') > 3){
        rect = true;
      }
    }

    if(p5.search(/\bdisplayWidth\b/) !== -1 || p5.search(/\bdisplayHeight\b/) !== -1 || p5.search(/\bOPENGL\b/) !== -1
    || rect){
      ver = '2.0.0+';
    }else if(p5.search(/\bfullScreen\b\(/) !== -1 || p5.search(/\bFX2D\b/) !== -1){
      ver = '3.0.0+';
    }
    ///////////////
    return ver;
  }
}
