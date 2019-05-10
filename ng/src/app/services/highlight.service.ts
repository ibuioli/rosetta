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
    const sys = [/\b(mouseX)\b/g, /\b(mouseY)\b/g, /\b(pmouseX)\b/g, /\b(pmouseY)\b/g, /\b(key)\b/g, /\b(keyCode)\b/g,
    /\b(frameCount)\b/g, /\b(frameRate)\b/g, /\b(width)\b/g, /\b(height)\b/g, /\b(displayWidth)\b/g, /\b(displayHeight)\b/g,
    /\b(screen)\b/g, /\b(pixelWidth)\b/g, /\b(pixelHeight)\b/g, /\b(focused)\b/g];
    for (let i = 0; i < sys.length; i++) {
        r_code = r_code.replace(sys[i], '<p5sys>$1</p5sys>');
    }

    // FUNs
    const fun = [
    /\b(setup(\b|\s+))(\()/g, /\b(draw(\b|\s+))(\()/g, /\b(settings(\b|\s+))(\()/g,
    /\b(print(\b|\s+))(\()/g, /\b(printArray(\b|\s+))(\()/g, /\b(println(\b|\s+))(\()/g, /\b(size(\b|\s+))(\()/g,
    /\b(fullScreen(\b|\s+))(\()/g, /\b(exit(\b|\s+))(\()/g, /\b(thread(\b|\s+))(\()/g, /\b(rect(\b|\s+))(\()/g,
    /\b(ellipse(\b|\s+))(\()/g, /\b(triangle(\b|\s+))(\()/g, /\b(line(\b|\s+))(\()/g, /\b(point(\b|\s+))(\()/g, /\b(arc(\b|\s+))(\()/g,
    /\b(quad(\b|\s+))(\()/g, /\b(vertex(\b|\s+))(\()/g, /\b(beginShape(\b|\s+))(\()/g, /\b(endShape(\b|\s+))(\()/g,
    /\b(bezierVertex(\b|\s+))(\()/g, /\b(curveVertex(\b|\s+))(\()/g, /\b(quadraticVertex(\b|\s+))(\()/g, /\b(circle(\b|\s+))(\()/g,
    /\b(beginContour(\b|\s+))(\()/g, /\b(endContour(\b|\s+))(\()/g, /\b(shape(\b|\s+))(\()/g, /\b(shapeMode(\b|\s+))(\()/g,
    /\b(clear(\b|\s+))(\()/g, /\b(box(\b|\s+))(\()/g, /\b(sphere(\b|\s+))(\()/g, /\b(sphereDetail(\b|\s+))(\()/g,
    /\b(curve(\b|\s+))(\()/g, /\b(bezier(\b|\s+))(\()/g, /\b(applyMatrix(\b|\s+))(\()/g, /\b(background(\b|\s+))(\()/g,
    /\b(fill(\b|\s+))(\()/g, /\b(noFill(\b|\s+))(\()/g, /\b(stroke(\b|\s+))(\()/g, /\b(noStroke(\b|\s+))(\()/g,
    /\b(displayDensity(\b|\s+))(\()/g, /\b(cursor(\b|\s+))(\()/g, /\b(noCursor(\b|\s+))(\()/g, /\b(loop(\b|\s+))(\()/g,
    /\b(noLoop(\b|\s+))(\()/g, /\b(redraw(\b|\s+))(\()/g, /\b(delay(\b|\s+))(\()/g, /\b(pushMatrix(\b|\s+))(\()/g,
    /\b(popMatrix(\b|\s+))(\()/g, /\b(translate(\b|\s+))(\()/g, /\b(rotate(\b|\s+))(\()/g, /\b(scale(\b|\s+))(\()/g,
    /\b(resetMatrix(\b|\s+))(\()/g, /\b(rotateX(\b|\s+))(\()/g, /\b(rotateY(\b|\s+))(\()/g, /\b(rotateZ(\b|\s+))(\()/g,
    /\b(shearX(\b|\s+))(\()/g, /\b(shearY(\b|\s+))(\()/g, /\b(printMatrix(\b|\s+))(\()/g, /\b(keyPressed(\b|\s+))(\()/g,
    /\b(keyReleased(\b|\s+))(\()/g, /\b(mouseMoved(\b|\s+))(\()/g, /\b(mouseDragged(\b|\s+))(\()/g, /\b(mousePressed(\b|\s+))(\()/g,
    /\b(mouseReleased(\b|\s+))(\()/g, /\b(createShape(\b|\s+))(\()/g, /\b(loadShape(\b|\s+))(\()/g, /\b(createImage(\b|\s+))(\()/g,
    /\b(loadShader(\b|\s+))(\()/g, /\b(resetShader(\b|\s+))(\()/g, /\b(shader(\b|\s+))(\()/g, /\b(noise(\b|\s+))(\()/g,
    /\b(noiseSeed(\b|\s+))(\()/g, /\b(noiseDetail(\b|\s+))(\()/g, /\b(image(\b|\s+))(\()/g, /\b(loadImage(\b|\s+))(\()/g,
    /\b(random(\b|\s+))(\()/g, /\b(text(\b|\s+))(\()/g, /\b(loadFont(\b|\s+))(\()/g, /\b(createFont(\b|\s+))(\()/g,
    /\b(textLeading(\b|\s+))(\()/g, /\b(textMode(\b|\s+))(\()/g, /\b(textSize(\b|\s+))(\()/g, /\b(textWidth(\b|\s+))(\()/g,
    /\b(textFont(\b|\s+))(\()/g, /\b(textAscent(\b|\s+))(\()/g, /\b(textDescent(\b|\s+))(\()/g, /\b(pushStyle(\b|\s+))(\()/g,
    /\b(popStyle(\b|\s+))(\()/g, /\b(tint(\b|\s+))(\()/g, /\b(noTint(\b|\s+))(\()/g, /\b(randomGaussian(\b|\s+))(\()/g,
    /\b(randomSeed(\b|\s+))(\()/g, /\b(alpha(\b|\s+))(\()/g, /\b(color(\b|\s+))(\()/g, /\b(blue(\b|\s+))(\()/g, /\b(red(\b|\s+))(\()/g,
    /\b(green(\b|\s+))(\()/g, /\b(smooth(\b|\s+))(\()/g, /\b(hue(\b|\s+))(\()/g, /\b(saturation(\b|\s+))(\()/g,
    /\b(brightness(\b|\s+))(\()/g, /\b(lerpColor(\b|\s+))(\()/g, /\b(colorMode(\b|\s+))(\()/g, /\b(noSmooth(\b|\s+))(\()/g,
    /\b(day(\b|\s+))(\()/g, /\b(hour(\b|\s+))(\()/g, /\b(millis(\b|\s+))(\()/g, /\b(minute(\b|\s+))(\()/g, /\b(month(\b|\s+))(\()/g,
    /\b(second(\b|\s+))(\()/g, /\b(year(\b|\s+))(\()/g, /\b(acos(\b|\s+))(\()/g, /\b(asin(\b|\s+))(\()/g, /\b(atan(\b|\s+))(\()/g,
    /\b(atan2(\b|\s+))(\()/g, /\b(cos(\b|\s+))(\()/g, /\b(degrees(\b|\s+))(\()/g, /\b(radians(\b|\s+))(\()/g, /\b(tan(\b|\s+))(\()/g,
    /\b(abs(\b|\s+))(\()/g, /\b(ceil(\b|\s+))(\()/g, /\b(constrain(\b|\s+))(\()/g, /\b(dist(\b|\s+))(\()/g, /\b(exp(\b|\s+))(\()/g,
    /\b(floor(\b|\s+))(\()/g, /\b(log(\b|\s+))(\()/g, /\b(mag(\b|\s+))(\()/g, /\b(map(\b|\s+))(\()/g, /\b(max(\b|\s+))(\()/g,
    /\b(min(\b|\s+))(\()/g, /\b(norm(\b|\s+))(\()/g, /\b(pow(\b|\s+))(\()/g, /\b(round(\b|\s+))(\()/g, /\b(sq(\b|\s+))(\()/g,
    /\b(sqrt(\b|\s+))(\()/g, /\b(textAlign(\b|\s+))(\()/g, /\b(lerp(\b|\s+))(\()/g, /\b(sin(\b|\s+))(\()/g, /\b(binary(\b|\s+))(\()/g,
    /\b(boolean(\b|\s+))(\()/g, /\b(byte(\b|\s+))(\()/g, /\b(char(\b|\s+))(\()/g, /\b(float(\b|\s+))(\()/g, /\b(hex(\b|\s+))(\()/g,
    /\b(int(\b|\s+))(\()/g, /\b(str(\b|\s+))(\()/g, /\b(unbinary(\b|\s+))(\()/g, /\b(unhex(\b|\s+))(\()/g, /\b(frameRate(\b|\s+))(\()/g,
    /\b(set(\b|\s+))(\()/g, /\b(get(\b|\s+))(\()/g, /\b(push(\b|\s+))(\()/g, /\b(pop(\b|\s+))(\()/g];
    for (let i = 0; i < fun.length; i++) {
        r_code = r_code.replace(fun[i], '<p5fun>$1</p5fun>$3');
    }

    // TYPs
    const typ = [/\b(void)\b/g, /\b(public)\b/g, /\b(private)\b/g, /\b(return)\b/g, /\b(true)\b/g, /\b(false)\b/g, /\b(super)\b/g,
    /\b(this)\b/g, /\b(default)\b/g, /\b(break)\b/g, /\b(case)\b/g, /\b(null)\b/g, /\b(new)\b/g, /\b(implements)\b/g, /\b(import)\b/g,
    /\b(extends)\b/g, /\b(final)\b/g];
    for (let i = 0; i < typ.length; i++) {
        r_code = r_code.replace(typ[i], '<p5typ>$1</p5typ>');
    }

    // CONs
    const con = [/\b(P2D)\b/g, /\b(P3D)\b/g, /\b(FX2D)\b/g, /\b(PDF)\b/g, /\b(JAVA2D)\b/g, /\b(OPENGL)\b/g, /\b(SVG)\b/g, /\b(HALF_PI)\b/g,
    /\b(PI)\b/g, /\b(QUARTER_PI)\b/g, /\b(TAU)\b/g, /\b(TWO_PI)\b/g, /\b(if)\b/g, /\b(else)\b/g, /\b(for)\b/g, /\b(while)\b/g,
    /\b(switch)\b/g, /\b(try)\b/g, /\b(RGB)\b/g, /\b(ARGB)\b/g, /\b(ALPHA)\b/g, /\b(OPEN)\b/g, /\b(CHORD)\b/g, /\b(PIE)\b/g, /\b(UP)\b/g,
    /\b(DOWN)\b/g, /\b(LEFT)\b/g, /\b(RIGHT)\b/g, /\b(ALT)\b/g, /\b(CONTROL)\b/g, /\b(SHIFT)\b/g, /\b(TAB)\b/g, /\b(ENTER)\b/g,
    /\b(RETURN)\b/g, /\b(BACKSPACE)\b/g, /\b(DELETE)\b/g];
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
