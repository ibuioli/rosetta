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
    'setup', 'draw', 'settings', 'print', 'printArray', 'println', 'size', 'fullScreen', 'exit', 'thread', 'rect',
    'ellipse', 'triangle', 'line', 'point', 'arc', 'quad', 'vertex', 'beginShape', 'endShape', 'bezierVertex', 'curveVertex',
    'quadraticVertex', 'beginContour', 'endContour', 'shape', 'shapeMode', 'clear', 'box', 'sphere', 'sphereDetail',
    'curve', 'bezier', 'applyMatrix', 'background', 'fill', 'noFill', 'stroke', 'noStroke', 'displayDensity', 'cursor', 'noCursor', 'loop',
    'noLoop', 'redraw', 'delay', 'pushMatrix', 'popMatrix', 'translate', 'rotate', 'scale', 'resetMatrix', 'rotateX', 'rotateY', 'rotateZ',
    'shearX', 'shearY', 'printMatrix', 'keyPressed', 'keyReleased', 'mouseMoved', 'mouseDragged', 'mousePressed', 'mouseReleased',
    'createShape', 'loadShape', 'createImage', 'loadShader', 'resetShader', 'shader', 'noise', 'noiseSeed', 'noiseDetail', 'image',
    'loadImage', 'random', 'text', 'loadFont', 'createFont', 'textLeading', 'textMode', 'textSize', 'textWidth', 'textFont', 'textAscent',
    'textDescent', 'pushStyle', 'popStyle', 'tint', 'noTint', 'randomGaussian', 'randomSeed', 'alpha', 'color', 'blue', 'red',
    'green', 'smooth', 'hue', 'saturation', 'brightness', 'lerpColor', 'colorMode', 'noSmooth', 'day', 'hour', 'millis', 'minute', 'month',
    'second', 'year', 'acos', 'asin', 'atan', 'atan2', 'cos', 'degrees', 'radians', 'tan', 'abs', 'ceil', 'constrain', 'dist', 'exp',
    'floor', 'log', 'mag', 'map', 'max', 'min', 'norm', 'pow', 'round', 'sq', 'sqrt', 'textAlign', 'lerp', 'sin', 'binary',
    'boolean', 'byte', 'char', 'float', 'hex', 'int', 'str', 'unbinary', 'unhex', 'frameRate', 'set', 'get', 'push', 'pop', 'circle',
    'square', 'push', 'pop'];
    for (let i = 0; i < fun.length; i++) {
        const re = new RegExp('\\b(' + fun[i] + '(\\b|\\s+))(\\()', 'g');
        r_code = r_code.replace(re, '<p5fun>$1</p5fun>$3');
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
