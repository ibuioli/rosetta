import { Injectable } from '@angular/core';

@Injectable()
export class DebugConsoleService {

  constructor() { }

  debug_console(text:string, color:string, debug:string){
    let s:string;

    switch(color) {
    case "red":
        s = "<p style='color:red;'>"+text+"</p>";
        break;
    default:
        s = text;
    }
    document.getElementById(debug).innerHTML = s;
    setTimeout(function(){
      document.getElementById(debug).innerHTML = "";
    }, 3000);

    //document.getElementById("p5_debug").innerHTML += '<p>mouseButton must be used inside mousePressed() function</p>';
    //document.getElementById("p5_debug").innerHTML += '<p>key must be used inside keyPressed() function</p>';
  }

}
