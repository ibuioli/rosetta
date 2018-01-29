/***********

Service for Highlight for P5 and OF/C++ code
Code developed by Ignacio Buioli

***********/
import { Injectable } from '@angular/core';
import { Tools } from './tools';

@Injectable()
export class HighlightService {

  constructor(public t: Tools) { }

  public highlightC(code:string): string{
    let r_code = code;
    ///////////////
    r_code = r_code.replace(/\</g, "°<°");  //For HTML Tags
    r_code = r_code.replace(/\>/g, "°>°");
    r_code = r_code.replace(/\//g, "°/°");
    ///////////////
    //BRKs
    let brk = [/({)/g, /(})/g, /(\[)/g, /(\])/g, /(\()/g, /(\))/g, /(\.)/g, /(\+)/g, /(-)/g,
    /(\*)/g, /(%)/g, /(,)/g, /(;)/g, /(:)/g, /(=)/g, /(!)/g, /(\|)/g, /(°\/°)/g, /(&)/g, /(°<°)/g, /(°>°)/g];
    for (let i = 0; i < brk.length; i++) {
        r_code = r_code.replace(brk[i], "<brk>$1</brk>");
    }
    r_code = r_code.replace(/°<°/g, "<");  //For Tags
    r_code = r_code.replace(/°>°/g, ">");
    r_code = r_code.replace(/°\/°/g, "/");

    //VARs
    let vars = [/(public )/g, /(private )/g, /(bool )/g,/(int )/g,/(float )/g,/(char )/g,/(unsigned )/g,/(double )/g,/(long )/g,
    /(void )/g,/(new )/g,/(class )/g,/(if )/g,/(else )/g,/(for )/g,/(while )/g,/\b(true)\b/g,/\b(false)\b/g];
    for (let i = 0; i < vars.length; i++) {
        r_code = r_code.replace(vars[i], "<vars>$1</vars>");
    }

    //NUMs
    r_code = r_code.replace(/\b(\d+)\b/g, '<num>$1</num>')

    //COMs
    let com = [/\b(cout)\b/g,/\b(endl)\b/g];
    for (let i = 0; i < com.length; i++) {
        r_code = r_code.replace(com[i], "<com>$1</com>");
    }
    r_code = r_code.replace(/\#(.+)*$/gm, '<com>#$1</com>');

    //STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<str>"$1"</str>');
    r_code = r_code.replace(/\'([^']+)\'/g, "<chr>'$1'</chr>");

    ///////////////
    return r_code;
  }

  public highlightP5(code:string): string{
    let r_code = code;

    //VARs
    let vars = [/\b(boolean)\b/g,/\b(int)\b/g,/\b(float)\b/g,/\b(char)\b/g,/\b(byte)\b/g,/\b(color)\b/g,/\b(double)\b/g,/\b(long)\b/g,
    /\b(Array)\b/g,/\b(ArrayList)\b/g,/\b(FloatDict)\b/g,/\b(FloatList)\b/g,/\b(HashMap)\b/g,/\b(IntDict)\b/g,/\b(IntList)\b/g,
    /\b(JSONArray)\b/g,/\b(JSONObject)\b/g,/\b(String)\b/g,/\b(StringDict)\b/g,/\b(StringList)\b/g,/\b(Table)\b/g,/\b(TableRow)\b/g,
    /\b(XML)\b/g,/\b(PImage)\b/g,/\b(PFont)\b/g,/\b(PGraphics)\b/g,/\b(PVector)\b/g,/\b(PShape)\b/g];
    for (let i = 0; i < vars.length; i++) {
        r_code = r_code.replace(vars[i], "<p5var>$1</p5var>");
    }

    //SYSs
    let sys = [/\b(mouseX)\b/g,/\b(mouseY)\b/g,/\b(pmouseX)\b/g,/\b(pmouseY)\b/g,
    /\b(key)\b/g,/\b(keyCode)\b/g,/\b(frameCount)\b/g,/\b(width)\b/g,/\b(height)\b/g,
    /\b(displayWidth)\b/g,/\b(displayHeight)\b/g,/\b(screen)\b/g];
    for (let i = 0; i < sys.length; i++) {
        r_code = r_code.replace(sys[i], "<p5sys>$1</p5sys>");
    }

    //FUNs
    let fun = [
    /\b(setup)\b/g,/\b(draw)\b/g,/\b(settings)\b/g,
    /\b(print)\b/g,/\b(println)\b/g,/\b(size)\b/g,/\b(fullScreen)\b/g,
    /\b(rect)\b/g,/\b(ellipse)\b/g,/\b(triangle)\b/g,/\b(line)\b/g,/\b(point)\b/g,/\b(arc)\b/g,/\b(quad)\b/g,
    /\b(background)\b/g,/\b(fill)\b/g,/\b(noFill)\b/g,/\b(stroke)\b/g,/\b(noStroke)\b/g,
    /\b(cursor)\b/g,/\b(noCursor)\b/g,
    /\b(pushMatrix)\b/g,/\b(popMatrix)\b/g,/\b(translate)\b/g,/\b(rotate)\b/g,/\b(scale)\b/g,
    /\b(void keyPressed)\b/g,/\b(void keyReleased)\b/g,/\b(void mouseMoved)\b/g,/\b(void mouseDragged)\b/g,
    /\b(void mousePressed)\b/g,/\b(void mouseReleased)\b/g,
    /\b(image)\b/g,/\b(loadImage)\b/g,/\b(random)\b/g,/\b(text)\b/g,/\b(loadFont)\b/g,/\b(createFont)\b/g,
    /\b(textFont)\b/g,/\b(pushStyle)\b/g,/\b(popStyle)\b/g,
    /\b(alpha)\b/g,/\b(color)\b/g,/\b(blue)\b/g,/\b(red)\b/g,/\b(green)\b/g,
    /\b(hue)\b/g,/\b(saturation)\b/g,/\b(brightness)\b/g,/\b(lerpColor)\b/g,
    ];
    for (let i = 0; i < fun.length; i++) {
        r_code = r_code.replace(fun[i], "<p5fun>$1</p5fun>");
    }

    //TYPs
    let typ = [/\b(void)\b/g, /\b(public)\b/g, /\b(private)\b/g, /\b(return)\b/g, /\b(true)\b/g, /\b(false)\b/g];
    for (let i = 0; i < typ.length; i++) {
        r_code = r_code.replace(typ[i], "<p5typ>$1</p5typ>");
    }

    //CONs
    let con = [/\b(P2D)\b/g,/\b(P3D)\b/g,/\b(FX2D)\b/g,/\b(PDF)\b/g,/\b(JAVA2D)\b/g,/\b(OPENGL)\b/g,
    /\b(HALF_PI)\b/g,/\b(PI)\b/g,/\b(QUARTER_PI)\b/g,/\b(TAU)\b/g,/\b(TWO_PI)\b/g,
    /\b(if)\b/g,/\b(else)\b/g,/\b(for)\b/g,/\b(while)\b/g,/\b(switch)\b/g,
    /\b(RGB)\b/g,/\b(ARGB)\b/g,/\b(ALPHA)\b/g,/\b(OPEN)\b/g,/\b(CHORD)\b/g,/\b(PIE)\b/g,
    /\b(UP)\b/g,/\b(DOWN)\b/g,/\b(LEFT)\b/g,/\b(RIGHT)\b/g,/\b(ALT)\b/g,/\b(CONTROL)\b/g,/\b(SHIFT)\b/g,
    /\b(TAB)\b/g,/\b(ENTER)\b/g,/\b(RETURN)\b/g,/\b(BACKSPACE)\b/g,/\b(DELETE)\b/g];
    for (let i = 0; i < con.length; i++) {
        r_code = r_code.replace(con[i], "<p5con>$1</p5con>");
    }

    //STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<p5str>"$1"</p5str>');
    r_code = r_code.replace(/\'([^']+)\'/g, "<p5str>'$1'</p5str>");

    //For Comments
    let c_mc = this.t.repeted(r_code, '/*', false);
    for(let i = 0; i < c_mc; i++){
      let m = this.t.extract(r_code, '/*', '*/');
      let value = '<p5com>/*'+m+'*/</p5com>';
      r_code = r_code.replace('/*'+m+'*/', value);
  	}
    r_code = r_code.replace(/\/\/(.+)*$/gm, '<p5com>//$1</p5com>');

    /////////////
    return r_code;
  }
}
