/***********

Service for Highlight for P5 and OF/C++ code
Code developed by Ignacio Buioli

***********/
import { Injectable } from '@angular/core';
import { Tools } from './tools';

@Injectable()
export class HighlightService {

  constructor(public t: Tools) { }

  public highlightC(code: string): string {
    let r_code = code;
    ///////////////
    r_code = r_code.replace(/\</g, '°<°');  // For HTML Tags
    r_code = r_code.replace(/\>/g, '°>°');
    r_code = r_code.replace(/\//g, '°/°');
    ///////////////
    // BRKs
    const brk = [/({)/g, /(})/g, /(\[)/g, /(\])/g, /(\()/g, /(\))/g, /(\.)/g, /(\+)/g, /(-)/g,
    /(\*)/g, /(%)/g, /(,)/g, /(;)/g, /(:)/g, /(=)/g, /(!)/g, /(\|)/g, /(°\/°)/g, /(&)/g, /(°<°)/g, /(°>°)/g];
    for (let i = 0; i < brk.length; i++) {
        r_code = r_code.replace(brk[i], '<brk>$1</brk>');
    }
    r_code = r_code.replace(/°<°/g, '<');  // For Tags
    r_code = r_code.replace(/°>°/g, '>');
    r_code = r_code.replace(/°\/°/g, '/');

    // VARs
    const vars = [/(public )/g, /(private )/g, /(bool )/g, /(int )/g, /(float )/g, /(char )/g, /(unsigned )/g, /(double )/g, /(long )/g,
    /(void )/g, /(new )/g, /(class )/g, /(if )/g, /(else )/g, /(for )/g, /(while )/g, /\b(true)\b/g, /\b(false)\b/g];
    for (let i = 0; i < vars.length; i++) {
        r_code = r_code.replace(vars[i], '<vars>$1</vars>');
    }

    // NUMs
    r_code = r_code.replace(/\b(\d+)\b/g, '<num>$1</num>')

    // COMs
    const com = [/\b(cout)\b/g, /\b(endl)\b/g];
    for (let i = 0; i < com.length; i++) {
        r_code = r_code.replace(com[i], '<com>$1</com>');
    }
    r_code = r_code.replace(/\#(.+)*$/gm, '<com>#$1</com>');

    // STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<str>"$1"</str>');
    r_code = r_code.replace(/\'([^']+)\'/g, '<chr>"$1"</chr>');

    ///////////////
    return r_code;
  }

  public highlightP5(code: string): string {
    let r_code = code;

    // VARs
    const vars = [/\b(boolean)\b/g, /\b(int)\b/g, /\b(float)\b/g, /\b(char)\b/g, /\b(byte)\b/g, /\b(color)\b/g, /\b(double)\b/g,
    /\b(long)\b/g, /\b(Array)\b/g, /\b(ArrayList)\b/g, /\b(FloatDict)\b/g, /\b(FloatList)\b/g, /\b(HashMap)\b/g, /\b(IntDict)\b/g,
    /\b(IntList)\b/g, /\b(JSONArray)\b/g, /\b(JSONObject)\b/g, /\b(String)\b/g, /\b(StringDict)\b/g, /\b(StringList)\b/g,
    /\b(Table)\b/g, /\b(TableRow)\b/g, /\b(XML)\b/g, /\b(PImage)\b/g, /\b(PFont)\b/g, /\b(PGraphics)\b/g, /\b(PVector)\b/g,
    /\b(PShape)\b/g, /\b(PShader)\b/g];
    for (let i = 0; i < vars.length; i++) {
        r_code = r_code.replace(vars[i], '<p5var>$1</p5var>');
    }

    // SYSs
    const sys = [/\b(mouseX)\b/g, /\b(mouseY)\b/g, /\b(pmouseX)\b/g, /\b(pmouseY)\b/g,
    /\b(key)\b/g, /\b(keyCode)\b/g, /\b(frameCount)\b/g, /\b(frameRate)\b/g, /\b(width)\b/g, /\b(height)\b/g,
    /\b(displayWidth)\b/g, /\b(displayHeight)\b/g, /\b(screen)\b/g, /\b(pixelWidth)\b/g, /\b(pixelHeight)\b/g,
    /\b(focused)\b/g];
    for (let i = 0; i < sys.length; i++) {
        r_code = r_code.replace(sys[i], '<p5sys>$1</p5sys>');
    }

    // FUNs
    const fun = [
    /\b(setup)\b/g, /\b(draw)\b/g, /\b(settings)\b/g,
    /\b(print)\b/g, /\b(printArray)\b/g, /\b(println)\b/g, /\b(size)\b/g, /\b(fullScreen)\b/g, /\b(exit)\b/g, /\b(thread)\b/g,
    /\b(rect)\b/g, /\b(ellipse)\b/g, /\b(triangle)\b/g, /\b(line)\b/g, /\b(point)\b/g, /\b(arc)\b/g, /\b(quad)\b/g,
    /\b(vertex)\b/g, /\b(beginShape)\b/g, /\b(endShape)\b/g, /\b(bezierVertex)\b/g, /\b(curveVertex)\b/g, /\b(quadraticVertex)\b/g,
    /\b(beginContour)\b/g, /\b(endContour)\b/g, /\b(shape)\b/g, /\b(shapeMode)\b/g, /\b(clear)\b/g,
    /\b(box)\b/g, /\b(sphere)\b/g, /\b(sphereDetail)\b/g, /\b(curve)\b/g, /\b(bezier)\b/g,
    /\b(background)\b/g, /\b(fill)\b/g, /\b(noFill)\b/g, /\b(stroke)\b/g, /\b(noStroke)\b/g,
    /\b(cursor)\b/g, /\b(noCursor)\b/g, /\b(loop)\b/g, /\b(noLoop)\b/g, /\b(redraw)\b/g, /\b(delay)\b/g, /\b(displayDensity)\b/g,
    /\b(pushMatrix)\b/g, /\b(popMatrix)\b/g, /\b(translate)\b/g, /\b(rotate)\b/g, /\b(scale)\b/g, /\b(resetMatrix)\b/g,
    /\b(rotateX)\b/g, /\b(rotateY)\b/g, /\b(rotateZ)\b/g, /\b(shearX)\b/g, /\b(shearY)\b/g, /\b(printMatrix)\b/g, /\b(applyMatrix)\b/g,
    /\b(void keyPressed)\b/g, /\b(void keyReleased)\b/g, /\b(void mouseMoved)\b/g, /\b(void mouseDragged)\b/g,
    /\b(void mousePressed)\b/g, /\b(void mouseReleased)\b/g, /\b(createShape)\b/g, /\b(loadShape)\b/g, /\b(createImage)\b/g,
    /\b(loadShader)\b/g, /\b(resetShader)\b/g, /\b(shader)\b/g, /\b(noise)\b/g, /\b(noiseSeed)\b/g, /\b(noiseDetail)\b/g,
    /\b(image)\b/g, /\b(loadImage)\b/g, /\b(random)\b/g, /\b(text)\b/g, /\b(loadFont)\b/g, /\b(createFont)\b/g, /\b(textAlign)\b/g,
    /\b(textLeading)\b/g, /\b(textMode)\b/g, /\b(textSize)\b/g, /\b(textWidth)\b/g, /\b(textFont)\b/g, /\b(textAscent)\b/g,
    /\b(textDescent)\b/g, /\b(pushStyle)\b/g, /\b(popStyle)\b/g, /\b(tint)\b/g, /\b(noTint)\b/g, /\b(randomGaussian)\b/g,
    /\b(randomSeed)\b/g, /\b(alpha)\b/g, /\b(color)\b/g, /\b(blue)\b/g, /\b(red)\b/g, /\b(green)\b/g, /\b(smooth)\b/g, /\b(noSmooth)\b/g,
    /\b(hue)\b/g, /\b(saturation)\b/g, /\b(brightness)\b/g, /\b(lerpColor)\b/g, /\b(colorMode)\b/g,
    /\b(day)\b/g, /\b(hour)\b/g, /\b(millis)\b/g, /\b(minute)\b/g, /\b(month)\b/g, /\b(second)\b/g, /\b(year)\b/g,
    /\b(acos)\b/g, /\b(asin)\b/g, /\b(atan)\b/g, /\b(atan2)\b/g, /\b(cos)\b/g, /\b(degrees)\b/g, /\b(radians)\b/g, /\b(sin)\b/g,
    /\b(tan)\b/g, /\b(abs)\b/g, /\b(ceil)\b/g, /\b(constrain)\b/g, /\b(dist)\b/g, /\b(exp)\b/g, /\b(floor)\b/g, /\b(lerp)\b/g,
    /\b(log)\b/g, /\b(mag)\b/g, /\b(map)\b/g, /\b(max)\b/g, /\b(min)\b/g, /\b(norm)\b/g, /\b(pow)\b/g, /\b(round)\b/g,
    /\b(sq)\b/g, /\b(sqrt)\b/g];
    for (let i = 0; i < fun.length; i++) {
        r_code = r_code.replace(fun[i], '<p5fun>$1</p5fun>');
    }

    // TYPs
    const typ = [/\b(void)\b/g, /\b(public)\b/g, /\b(private)\b/g, /\b(return)\b/g, /\b(true)\b/g, /\b(false)\b/g, /\b(super)\b/g ,
    /\b(this)\b/g, /\b(default)\b/g, /\b(break)\b/g, /\b(case)\b/g, /\b(null)\b/g, /\b(new)\b/g, /\b(implements)\b/g, /\b(import)\b/g,
    /\b(extends)\b/g, /\b(final)\b/g];
    for (let i = 0; i < typ.length; i++) {
        r_code = r_code.replace(typ[i], '<p5typ>$1</p5typ>');
    }

    // CONs
    const con = [/\b(P2D)\b/g, /\b(P3D)\b/g, /\b(FX2D)\b/g, /\b(PDF)\b/g, /\b(JAVA2D)\b/g, /\b(OPENGL)\b/g,
    /\b(HALF_PI)\b/g, /\b(PI)\b/g, /\b(QUARTER_PI)\b/g, /\b(TAU)\b/g, /\b(TWO_PI)\b/g,
    /\b(if)\b/g, /\b(else)\b/g, /\b(for)\b/g, /\b(while)\b/g, /\b(switch)\b/g, /\b(try)\b/g,
    /\b(RGB)\b/g, /\b(ARGB)\b/g, /\b(ALPHA)\b/g, /\b(OPEN)\b/g, /\b(CHORD)\b/g, /\b(PIE)\b/g,
    /\b(UP)\b/g, /\b(DOWN)\b/g, /\b(LEFT)\b/g, /\b(RIGHT)\b/g, /\b(ALT)\b/g, /\b(CONTROL)\b/g, /\b(SHIFT)\b/g,
    /\b(TAB)\b/g, /\b(ENTER)\b/g, /\b(RETURN)\b/g, /\b(BACKSPACE)\b/g, /\b(DELETE)\b/g];
    for (let i = 0; i < con.length; i++) {
        r_code = r_code.replace(con[i], '<p5con>$1</p5con>');
    }

    // STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<p5str>"$1"</p5str>');
    r_code = r_code.replace(/\'([^']+)\'/g, '<p5str>\'$1\'</p5str>');

    // For Comments
    const c_mc = this.t.repeted(r_code, '/*', false);
    for (let i = 0; i < c_mc; i++) {
      const m = this.t.extract(r_code, '/*', '*/');
      const value = '<p5com>/*' + m + '*/</p5com>';
      r_code = r_code.replace('/*' + m + '*/', value);
    }
    r_code = r_code.replace(/\/\/(.+)*$/gm, '<p5com>//$1</p5com>');

    /////////////
    return r_code;
  }
}
