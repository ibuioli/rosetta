import { Component, Renderer2, ViewChild } from '@angular/core';
import { P52OfService } from './services/p5-2-of.service';
import { HighlightService } from './services/highlight.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title:string = 'app works';
  public ver:string = '1.0';
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
  @ViewChild("debug") debug;
  @ViewChild("p5_debug") p5_debug;
  /////////////////////////////
  public p5v:string = 'x.x.x';
  public ofv:string = '0.9.x';
  public displayB1:boolean = true;
  public displayB2:boolean = false;
  public displayB3:boolean = false;
  public disCFile:string = "of | ofApp.cpp";
  public main:string = "";
  public app:string = "";
  public apph:string = "";
  public pathFile:string = "";

  constructor(public conversor: P52OfService, public hl: HighlightService,
    public d: FilesService, public renderer: Renderer2){}

  public ngAfterViewInit(): void{
    //Listener Buttons
    this.renderer.listen(this.boton1.nativeElement, "click", () => {
      this.disCFile = "of | ofApp.cpp";
      this.displayB1 = true;
      this.displayB2 = false;
      this.displayB3 = false;
    });
    this.renderer.listen(this.boton2.nativeElement, "click", () => {
      this.disCFile = "of | main.cpp";
      this.displayB1 = false;
      this.displayB2 = true;
      this.displayB3 = false;
    });
    this.renderer.listen(this.boton3.nativeElement, "click", () => {
      this.disCFile = "of | ofApp.h";
      this.displayB1 = false;
      this.displayB2 = false;
      this.displayB3 = true;
    });
    //Listener TextArea
    this.renderer.listen(this.p5.nativeElement, "keyup", (e) => {
      //Get Value
      let txt = (<HTMLInputElement>this.p5.nativeElement).value;
      let hlP5 = this.hl.highlightP5(txt);
      this.fp5.nativeElement.innerHTML = hlP5 + "&#13;&#10;&#13;&#10;";

      let reset = this.conversor.reset(txt);
      let convers = this.conversor.conversor(reset, this.ofv);
      this.p5v = this.conversor.p5ver(reset);

      let apph = this.conversor.ofApph(convers);
      this.apph = apph;
      this.of3.nativeElement.innerHTML = this.hl.highlightC(apph);

      let maincpp = this.conversor.maincpp(convers);
      this.main = maincpp;
      this.of2.nativeElement.innerHTML = this.hl.highlightC(maincpp);

      let appcpp = this.conversor.ofAppcpp(convers);
      this.app = appcpp;
      this.of.nativeElement.innerHTML = this.hl.highlightC(appcpp);
    });
    //Get Tab Event
    this.renderer.listen(this.p5.nativeElement, "keydown", (e) => {
      if(e.keyCode === 9) {
          let start = this.p5.nativeElement.selectionStart;
          let end = this.p5.nativeElement.selectionEnd;

          let target = (<HTMLTextAreaElement>e.target);
          let value = target.value;

          target.value = value.substring(0, start)
                      + "\t"
                      + value.substring(end);

          this.p5.nativeElement.selectionStart = this.p5.nativeElement.selectionEnd = start + 1;

          e.preventDefault();
      }
    });
    //Listener Scroll
    this.renderer.listen(this.p5.nativeElement, "scroll", (e) => {
      let scrTop = this.p5.nativeElement.scrollTop;
      let clTop = this.p5.nativeElement.clientTop;

      this.fp5.nativeElement.scrollTop = (window.pageYOffset || scrTop)  - (clTop || 0);
    });
  }

  public onChange($event:any, v:string): void{
    this.ofv = v;

    ////////////////////////////////////////////////////////////////////////
    let txt = (<HTMLInputElement>this.p5.nativeElement).value;
    let hlP5 = this.hl.highlightP5(txt);
    this.fp5.nativeElement.innerHTML = hlP5 + "&#13;&#10;&#13;&#10;";

    let reset = this.conversor.reset(txt);
    let convers = this.conversor.conversor(reset, this.ofv);
    this.p5v = this.conversor.p5ver(reset);

    let apph = this.conversor.ofApph(convers);
    this.apph = apph;
    this.of3.nativeElement.innerHTML = this.hl.highlightC(apph);

    let maincpp = this.conversor.maincpp(convers);
    this.main = maincpp;
    this.of2.nativeElement.innerHTML = this.hl.highlightC(maincpp);

    let appcpp = this.conversor.ofAppcpp(convers);
    this.app = appcpp;
    this.of.nativeElement.innerHTML = this.hl.highlightC(appcpp);
  }

}
