import { Injectable } from '@angular/core';

@Injectable()
export class DebugConsoleService {

  constructor() { }

  public debug_console(text:string, color:string, debug:any): void{
    let s:string;

    switch(color) {
    case "red":
        s = "<p style='color:red;'>"+text+"</p>";
        break;
    default:
        s = text;
    }
    debug.innerHTML = s;
    setTimeout(function(){
      debug.innerHTML = "";
    }, 3000);
  }

}
