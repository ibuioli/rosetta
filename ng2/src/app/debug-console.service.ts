import { Injectable } from '@angular/core';

@Injectable()
export class DebugConsoleService {

  constructor() { }

  p5Debug(p5:string){
    document.getElementById("p5_debug").innerHTML = "";
    //document.getElementById("p5_debug").innerHTML += '<p>mouseButton must be used inside mousePressed() function</p>';
    //document.getElementById("p5_debug").innerHTML += '<p>key must be used inside keyPressed() function</p>';
  }

  ofDebug(main:string, app:string, apph:string){}

}
