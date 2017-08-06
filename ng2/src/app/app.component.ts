import { Component, OnInit, AfterViewInit } from '@angular/core';
import { P52OfService } from './p5-2-of.service';
import { HighlightService } from './highlight.service';
import { FilesService } from './files.service';
import { DebugConsoleService } from './debug-console.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ver:string = '1.0';
  /////////////////////////////
  p5v:string = 'x.x.x';
  ofv:string = '0.9.x';
  displayB1:boolean = true;
  displayB2:boolean = false;
  displayB3:boolean = false;
  main:string = "";
  app:string = "";
  apph:string = "";
  pathFile:string = "";

  constructor(public conversor: P52OfService, public hl: HighlightService,
    public d: FilesService, public debug: DebugConsoleService){}

  ngAfterViewInit(){
    let _this = this;
    //Listener Buttons
    document.getElementById("boton1").addEventListener("click", function(){
      _this.displayB1 = true;
      _this.displayB2 = false;
      _this.displayB3 = false;
    });
    document.getElementById("boton2").addEventListener("click", function(){
      _this.displayB1 = false;
      _this.displayB2 = true;
      _this.displayB3 = false;
    });
    document.getElementById("boton3").addEventListener("click", function(){
      _this.displayB1 = false;
      _this.displayB2 = false;
      _this.displayB3 = true;
    });
    //Listener TextArea
    document.getElementById("p5").addEventListener("keyup", function(e) {
      //Get Value
      let txt = (<HTMLInputElement>document.getElementById("p5")).value;
      let hlP5 = _this.hl.highlightP5(txt);
      document.getElementById('fp5').innerHTML = hlP5 + "&#13;&#10;&#13;&#10;";

      let reset = _this.conversor.reset(txt);
      let convers = _this.conversor.conversor(reset, _this.ofv);
      _this.p5v = _this.conversor.p5ver(reset);

      let apph = _this.conversor.ofApph(convers);
      _this.apph = apph;
      document.getElementById('of3').innerHTML = _this.hl.highlightC(apph);

      let maincpp = _this.conversor.maincpp(convers);
      _this.main = maincpp;
      document.getElementById('of2').innerHTML = _this.hl.highlightC(maincpp);

      let appcpp = _this.conversor.ofAppcpp(convers);
      _this.app = appcpp;
      document.getElementById('of').innerHTML = _this.hl.highlightC(appcpp);

      //Debug P5 to Console
      _this.debug.p5Debug(reset);
    });
    //Get Tab Event
    document.querySelector("textarea").addEventListener('keydown',function(e) {
      if(e.keyCode === 9) {
          let start = this.selectionStart;
          let end = this.selectionEnd;

          let target = (<HTMLTextAreaElement>e.target);
          let value = target.value;

          target.value = value.substring(0, start)
                      + "\t"
                      + value.substring(end);

          this.selectionStart = this.selectionEnd = start + 1;

          e.preventDefault();
      }
    },false);
    //Listener Scroll
    document.getElementById("p5").addEventListener("scroll", function() {
      let scrTop = document.getElementById("p5").scrollTop;
      let clTop = document.getElementById("p5").clientTop;

      document.getElementById("fp5").scrollTop = (window.pageYOffset || scrTop)  - (clTop || 0);
    });
  }

  onChange($event, v){
    this.ofv = v;

    ////////////////////////////

    let txt = (<HTMLInputElement>document.getElementById("p5")).value;
    let hlP5 = this.hl.highlightP5(txt);
    document.getElementById('fp5').innerHTML = hlP5 + "&#13;&#10;&#13;&#10;";

    let reset = this.conversor.reset(txt);
    let convers = this.conversor.conversor(reset, this.ofv);
    this.p5v = this.conversor.p5ver(reset);

    let apph = this.conversor.ofApph(convers);
    this.apph = apph;
    document.getElementById('of3').innerHTML = this.hl.highlightC(apph);

    let maincpp = this.conversor.maincpp(convers);
    this.main = maincpp;
    document.getElementById('of2').innerHTML = this.hl.highlightC(maincpp);

    let appcpp = this.conversor.ofAppcpp(convers);
    this.app = appcpp;
    document.getElementById('of').innerHTML = this.hl.highlightC(appcpp);
  }

}
