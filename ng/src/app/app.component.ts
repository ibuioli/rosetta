import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { P52OfService } from './p5-2-of.service';
import { HighlightService } from './highlight.service';
import { FilesService } from './files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ver:string = '1.0';
  /////////////////////////////
  /*- Elements -*/
  @ViewChild("p5") p5;
  @ViewChild("fp5") fp5;
  @ViewChild("of") of;
  @ViewChild("of2") of2;
  @ViewChild("of3") of3;
  @ViewChild("boton1") boton1;
  @ViewChild("boton2") boton2;
  @ViewChild("boton3") boton3;
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
    public d: FilesService, public renderer: Renderer2){}

  public ngAfterViewInit(): void{
    let _this = this;
    //Listener Buttons
    this.renderer.listen(this.boton1.nativeElement, "click", () => {
      _this.displayB1 = true;
      _this.displayB2 = false;
      _this.displayB3 = false;
    });
    this.renderer.listen(this.boton2.nativeElement, "click", () => {
      _this.displayB1 = false;
      _this.displayB2 = true;
      _this.displayB3 = false;
    });
    this.renderer.listen(this.boton3.nativeElement, "click", () => {
      _this.displayB1 = false;
      _this.displayB2 = false;
      _this.displayB3 = true;
    });
    //Listener TextArea
    this.renderer.listen(this.p5.nativeElement, "keyup", (e) => {
      //Get Value
      let txt = (<HTMLInputElement>_this.p5.nativeElement).value;
      let hlP5 = _this.hl.highlightP5(txt);
      _this.fp5.nativeElement.innerHTML = hlP5 + "&#13;&#10;&#13;&#10;";

      let reset = _this.conversor.reset(txt);
      let convers = _this.conversor.conversor(reset, _this.ofv);
      _this.p5v = _this.conversor.p5ver(reset);

      let apph = _this.conversor.ofApph(convers);
      _this.apph = apph;
      _this.of3.nativeElement.innerHTML = _this.hl.highlightC(apph);

      let maincpp = _this.conversor.maincpp(convers);
      _this.main = maincpp;
      _this.of2.nativeElement.innerHTML = _this.hl.highlightC(maincpp);

      let appcpp = _this.conversor.ofAppcpp(convers);
      _this.app = appcpp;
      _this.of.nativeElement.innerHTML = _this.hl.highlightC(appcpp);
    });
    //Get Tab Event
    this.renderer.listen(this.p5.nativeElement, "keydown", (e) => {
      if(e.keyCode === 9) {
          let start = _this.p5.nativeElement.selectionStart;
          let end = _this.p5.nativeElement.selectionEnd;

          let target = (<HTMLTextAreaElement>e.target);
          let value = target.value;

          target.value = value.substring(0, start)
                      + "\t"
                      + value.substring(end);

          _this.p5.nativeElement.selectionStart = _this.p5.nativeElement.selectionEnd = start + 1;

          e.preventDefault();
      }
    });
    //Listener Scroll
    this.renderer.listen(this.p5.nativeElement, "scroll", (e) => {
      let scrTop = _this.p5.nativeElement.scrollTop;
      let clTop = _this.p5.nativeElement.clientTop;

      _this.fp5.nativeElement.scrollTop = (window.pageYOffset || scrTop)  - (clTop || 0);
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
