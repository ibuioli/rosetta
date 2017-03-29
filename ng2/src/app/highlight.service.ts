/***********

Service for Highlight for P5 and OF code
Code developed by Ignacio Buioli

***********/
import { Injectable } from '@angular/core';
import { Tools } from './tools';

@Injectable()
export class HighlightService {

  constructor(public t: Tools) { }

  highlightC(code:string){
    var r_code = code;
    ///////////////
    //BRKs
    var brk = [/{/g, /}/g, /\[/g, /\]/g, /\(/g, /\)/g, /\./g, /\+/g, /-/g, /\*/g, /%/g, /,/g, /;/g, /:/g, /=/g,
    /!/g, /\|/g, /(\/)(?![^<]*>|[^<>]*<\/)/g, /&/g];
    var cbrk = ['<brk>{</brk>','<brk>}</brk>','<brk>[</brk>','<brk>]</brk>','<brk>(</brk>','<brk>)</brk>',
    '<brk>.</brk>','<brk>+</brk>','<brk>-</brk>','<brk>*</brk>','<brk>%</brk>',
    '<brk>,</brk>','<brk>;</brk>','<brk>:</brk>','<brk>=</brk>','<brk>!</brk>','<brk>|</brk>','<brk>/</brk>',
    '<brk>&</brk>'];
    for (let i = 0; i < brk.length; i++) {
        r_code = r_code.replace(brk[i], cbrk[i]);
    }

    //VARs
    var vars = [/public/g, /private/g, /bool /g,/int /g,/float /g,/char /g,/unsigned /g,/double /g,/long /g,
    /void /g,/new /g,/class /g,/if /g,/else /g,/for /g,/while /g,/true/g,/false/g];
    var cvars = ['<vars>public </vars>','<vars>private </vars>','<vars>bool </vars>','<vars>int </vars>',
    '<vars>float </vars>','<vars>char </vars>','<vars>unsigned </vars>','<vars>double </vars>','<vars>long </vars>',
    '<vars>void </vars>','<vars>new </vars>','<vars>class </vars>','<vars>if </vars>','<vars>else </vars>'
    ,'<vars>for </vars>','<vars>while </vars>','<vars>true</vars>','<vars>false</vars>'];
    for (let i = 0; i < vars.length; i++) {
        r_code = r_code.replace(vars[i], cvars[i]);
    }

    //NUMs
    r_code = r_code.replace(/\b(\d+)\b/g, '<num>$1</num>')

    //COMs
    var com = [/cout/g,/endl/g];
    var ccom = ['<com>cout</com>','<com>endl</com>'];
    for (let i = 0; i < com.length; i++) {
        r_code = r_code.replace(com[i], ccom[i]);
    }
    r_code = r_code.replace(/\#(.+)*$/gm, '<com>#$1</com>');

    //STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<str>"$1"</str>');
    r_code = r_code.replace(/\'([^']+)\'/g, "<chr>'$1'</chr>");

    ///////////////
    return r_code;
  }

  highlightP5(code:string){
    var r_code = code;

    //VARs
    var vars = [/\bboolean\b/g,/\bint\b/g,/\bfloat\b/g,/\bchar\b/g,/\bbyte\b/g,/\bcolor\b/g,/\bdoube\b/g,/\blong\b/g,
    /\bArray\b/g,/\bArrayList\b/g,/\bFloatDict\b/g,/\bFloatList\b/g,/\bHashMap\b/g,/\bIntDict\b/g,/\bIntList\b/g,
    /\bJSONArray\b/g,/\bJSONObject\b/g,/\bString\b/g,/\bStringDict\b/g,/\bStringList\b/g,/\bTable\b/g,/\bTableRow\b/g,
    /\bXML\b/g,/\bPImage\b/g,/\bPFont\b/g,/\bPGraphics\b/g,/\bPVector\b/g];
    var cvars = ['<p5var>boolean</p5var>','<p5var>int</p5var>','<p5var>float</p5var>','<p5var>char</p5var>',
    '<p5var>byte</p5var>','<p5var>color</p5var>','<p5var>double</p5var>','<p5var>long</p5var>',
    '<p5var>Array</p5var>','<p5var>ArrayList</p5var>','<p5var>FloatDict</p5var>','<p5var>FloatList</p5var>',
    '<p5var>HashMap</p5var>','<p5var>IntDict</p5var>','<p5var>IntList</p5var>','<p5var>JSONArray</p5var>',
    '<p5var>JSONObject</p5var>','<p5var>String</p5var>','<p5var>StringDict</p5var>','<p5var>StringList</p5var>',
    '<p5var>Table</p5var>','<p5var>TableRow</p5var>','<p5var>XML</p5var>','<p5var>PImage</p5var>','<p5var>PFont</p5var>'
    ,'<p5var>PGraphics</p5var>','<p5var>PVector</p5var>'];
    for (let i = 0; i < vars.length; i++) {
        r_code = r_code.replace(vars[i], cvars[i]);
    }

    //SYSs
    var sys = [/\bmouseX\b/g,/\bmouseY\b/g,/\bpmouseX\b/g,/\bpmouseY\b/g,/\bkey\b/g,/\bframeCount\b/g,/\bwidth\b/g,/\bheight\b/g,
    /\bdisplayWidth\b/g,/\bdisplayHeight\b/g,/\bscreen\b/g];
    var csys = ['<p5sys>mouseX</p5sys>','<p5sys>mouseY</p5sys>','<p5sys>pmouseX</p5sys>','<p5sys>pmouseY</p5sys>',
    '<p5sys>key</p5sys>','<p5sys>frameCount</p5sys>','<p5sys>width</p5sys>','<p5sys>height</p5sys>'
    ,'<p5sys>displayWidth</p5sys>','<p5sys>displayHeight</p5sys>',,'<p5sys>screen</p5sys>'];
    for (let i = 0; i < sys.length; i++) {
        r_code = r_code.replace(sys[i], csys[i]);
    }

    //FUNs
    var fun = [
    /\bsetup\b/g,/\bdraw\b/g,/\bsettings\b/g,
    /\bprint\b/g,/\bprintln\b/g,/\bsize\b/g,/\bfullScreen\b/g,
    /\brect\b/g,/\bellipse\b/g,/\btriangle\b/g,/\bline\b/g,/\bpoint\b/g,/\barc\b/g,/\bquad\b/g,
    /\bbackground\b/g,/\bfill\b/g,/\bnoFill\b/g,/\bstroke\b/g,/\bnoStroke\b/g,
    /\bcursor\b/g,/\bnoCursor\b/g,
    /\bpushMatrix\b/g,/\bpopMatrix\b/g,/\btranslate\b/g,/\brotate\b/g,/\bscale\b/g,
    /\bvoid keyPressed\b/g,/\bvoid keyReleased\b/g,/\bvoid mouseMoved\b/g,/\bvoid mouseDragged\b/g,
    /\bvoid mousePressed\b/g,/\bvoid mouseReleased\b/g,
    /\bimage\b/g,/\bloadImage\b/g,/\brandom\b/g,/\btext\b/g,/\bloadFont\b/g,/\bcreateFont\b/g,
    /\btextFont\b/g
    ];
    var cfun =[
    '<p5fun>setup</p5fun>','<p5fun>draw</p5fun>','<p5fun>settings</p5fun>',
    '<p5fun>print</p5fun>','<p5fun>println</p5fun>','<p5fun>size</p5fun>','<p5fun>fullScreen</p5fun>',
    '<p5fun>rect</p5fun>','<p5fun>ellipse</p5fun>','<p5fun>triangle</p5fun>','<p5fun>line</p5fun>','<p5fun>point</p5fun>','<p5fun>arc</p5fun>','<p5fun>quad</p5fun>',
    '<p5fun>background</p5fun>','<p5fun>fill</p5fun>','<p5fun>noFill</p5fun>','<p5fun>stroke</p5fun>','<p5fun>noStroke</p5fun>',
    '<p5fun>cursor</p5fun>','<p5fun>noCursor</p5fun>',
    '<p5fun>pushMatrix</p5fun>','<p5fun>popMatrix</p5fun>','<p5fun>translate</p5fun>','<p5fun>rotate</p5fun>','<p5fun>scale</p5fun>',
    'void <p5fun>keyPressed</p5fun>','void <p5fun>keyReleased</p5fun>','void <p5fun>mouseMoved</p5fun>','void <p5fun>mouseDragged</p5fun>',
    'void <p5fun>mousePressed</p5fun>','void <p5fun>mouseReleased</p5fun>',
    '<p5fun>image</p5fun>','<p5fun>loadImage</p5fun>','<p5fun>random</p5fun>','<p5fun>text</p5fun>','<p5fun>loadFont</p5fun>','<p5fun>createFont</p5fun>',
    '<p5fun>textFont</p5fun>'
    ];
    for (let i = 0; i < fun.length; i++) {
        r_code = r_code.replace(fun[i], cfun[i]);
    }

    //TYPs
    var typ = [/\bvoid\b/g, /\bpublic\b/g, /\bprivate\b/g, /\breturn\b/g, /\btrue\b/g, /\bfalse\b/g];
    var ctyp = ['<p5typ>void</p5typ>','<p5typ>public</p5typ>','<p5typ>private</p5typ>','<p5typ>return</p5typ>',
    '<p5typ>true</p5typ>','<p5typ>false</p5typ>'];
    for (let i = 0; i < typ.length; i++) {
        r_code = r_code.replace(typ[i], ctyp[i]);
    }

    //CONs
    var con = [/\bP2D\b/g,/\bP3D\b/g,/\bFX2D\b/g,/\bPDF\b/g,/\bJAVA2D\b/g,/\bOPENGL\b/g,
    /\bHALF_PI\b/g,/\bPI\b/g,/\bQUARTER_PI\b/g,/\bTAU\b/g,/\bTWO_PI\b/g,
    /\bif\b/g,/\belse\b/g,/\bfor\b/g,/\bwhile\b/g,/\bswitch\b/g];
    var ccon = ['<p5con>P2D</p5con>','<p5con>P3D</p5con>','<p5con>FX2D</p5con>','<p5con>PDF</p5con>',
    '<p5con>JAVA2D</p5con>','<p5con>OPENGL</p5con>','<p5con>HALF_PI</p5con>','<p5con>PI</p5con>',
    '<p5con>QUARTER_PI</p5con>','<p5con>TAU</p5con>','<p5con>TWO_PI</p5con>',
    '<p5con>if</p5con>','<p5con>else</p5con>','<p5con>for</p5con>','<p5con>while</p5con>','<p5con>switch</p5con>'];
    for (let i = 0; i < con.length; i++) {
        r_code = r_code.replace(con[i], ccon[i]);
    }

    //STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<p5str>"$1"</p5str>');
    r_code = r_code.replace(/\'([^']+)\'/g, "<p5str>'$1'</p5str>");

    //For Comments
    var c_mc = this.t.repeted(r_code, '/*', false);
    for(let i = 0; i < c_mc; i++){
      var m = this.t.extract(r_code, '/*', '*/');
      var value = '<p5com>/*'+m+'*/</p5com>';
      r_code = r_code.replace('/*'+m+'*/', value);
  	}
    r_code = r_code.replace(/\/\/(.+)*$/gm, '<p5com>//$1</p5com>');

    /////////////
    return r_code;
  }
}
