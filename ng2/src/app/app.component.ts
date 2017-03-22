import { Component, OnInit, AfterViewInit } from '@angular/core';
import { P52OfService } from './p5-2-of.service';
import { HighlightService } from './highlight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ver = 'alpha 0.2';
  displayB1:boolean = true;
  displayB2:boolean = false;
  displayB3:boolean = false;

  constructor(public conversor: P52OfService, public hl: HighlightService){}

  ngAfterViewInit(){
    var _this = this;
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
      var txt = (<HTMLInputElement>document.getElementById("p5")).value;
      var hlP5 = _this.hl.highlightP5(txt);
      document.getElementById('fp5').innerHTML = hlP5 + "&#13;&#10;&#13;&#10;";

      var reset = _this.conversor.reset(txt);
      var convers = _this.conversor.conversor(reset);

      var apph = _this.conversor.ofApph(convers);
      document.getElementById('of3').innerHTML = _this.hl.highlightC(apph);

      var maincpp = _this.conversor.maincpp(convers);
      document.getElementById('of2').innerHTML = _this.hl.highlightC(maincpp);

      var appcpp = _this.conversor.ofAppcpp(convers);
      document.getElementById('of').innerHTML = _this.hl.highlightC(appcpp);
    });
    //Get Tab Event
    document.querySelector("textarea").addEventListener('keydown',function(e) {
      if(e.keyCode === 9) {
          var start = this.selectionStart;
          var end = this.selectionEnd;

          var target = (<HTMLTextAreaElement>e.target);
          var value = target.value;

          target.value = value.substring(0, start)
                      + "\t"
                      + value.substring(end);

          this.selectionStart = this.selectionEnd = start + 1;

          e.preventDefault();
      }
    },false);
    //Listener Scroll
    document.getElementById("p5").addEventListener("scroll", function() {
      var scrTop = document.getElementById("p5").scrollTop;
      var clTop = document.getElementById("p5").clientTop;

      document.getElementById("fp5").scrollTop = (window.pageYOffset || scrTop)  - (clTop || 0);
    });
  }

}
