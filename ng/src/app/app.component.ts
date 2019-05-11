import { Component, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { P52OfService } from './services/p5-2-of.service';
import { HighlightService } from './services/highlight.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public title = 'Rosetta';
  public ver = '1.0';
  /////////////////////////////
  /*- Elements -*/
  @ViewChild('p5') p5: any;
  @ViewChild('fp5') fp5: any;
  @ViewChild('of') of: any;
  @ViewChild('of2') of2: any;
  @ViewChild('of3') of3: any;
  @ViewChild('boton1') boton1: any;
  @ViewChild('boton2') boton2: any;
  @ViewChild('boton3') boton3: any;
  @ViewChild('debug') debug: any;
  @ViewChild('p5_debug') p5_debug: any;
  /////////////////////////////
  public p5v = 'x.x.x';
  public ofv = '0.9.x';
  public displayB1 = true;
  public displayB2 = false;
  public displayB3 = false;
  public disCFile = 'of | ofApp.cpp';
  public main = '';
  public app = '';
  public apph = '';
  public pathFile = '';

  constructor(public conversor: P52OfService, public hl: HighlightService,
    public d: FilesService, public renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    // Listener Buttons
    this.renderer.listen(this.boton1.nativeElement, 'click', () => {
      this.disCFile = 'of | ofApp.cpp';
      this.displayB1 = true;
      this.displayB2 = false;
      this.displayB3 = false;
    });
    this.renderer.listen(this.boton2.nativeElement, 'click', () => {
      this.disCFile = 'of | main.cpp';
      this.displayB1 = false;
      this.displayB2 = true;
      this.displayB3 = false;
    });
    this.renderer.listen(this.boton3.nativeElement, 'click', () => {
      this.disCFile = 'of | ofApp.h';
      this.displayB1 = false;
      this.displayB2 = false;
      this.displayB3 = true;
    });
    // Listener TextArea
    this.renderer.listen(this.p5.nativeElement, 'keyup', (e) => {
      // Get Value
      const txt = (<HTMLInputElement>this.p5.nativeElement).value;
      const hlP5 = this.hl.highlightP5(txt);
      this.fp5.nativeElement.innerHTML = hlP5 + '&#13;&#10;&#13;&#10;';

      const reset = this.conversor.reset(txt);
      const convers = this.conversor.conversor(reset, this.ofv);
      this.p5v = this.conversor.p5ver(reset);

      const apph = this.conversor.ofApph(convers);
      this.apph = apph;
      this.of3.nativeElement.innerHTML = this.hl.highlightC(apph);

      const maincpp = this.conversor.maincpp(convers);
      this.main = maincpp;
      this.of2.nativeElement.innerHTML = this.hl.highlightC(maincpp);

      const appcpp = this.conversor.ofAppcpp(convers);
      this.app = appcpp;
      this.of.nativeElement.innerHTML = this.hl.highlightC(appcpp);
    });
    // Get Tab Event
    this.renderer.listen(this.p5.nativeElement, 'keydown', (e) => {
      if (e.keyCode === 9) {
          const start = this.p5.nativeElement.selectionStart;
          const end = this.p5.nativeElement.selectionEnd;

          const target = (<HTMLTextAreaElement>e.target);
          const value = target.value;

          target.value = value.substring(0, start)
                      + '\t'
                      + value.substring(end);

          this.p5.nativeElement.selectionStart = this.p5.nativeElement.selectionEnd = start + 1;

          e.preventDefault();
      }
    });
    // Listener Scroll
    this.renderer.listen(this.p5.nativeElement, 'scroll', (e) => {
      const scrTop = this.p5.nativeElement.scrollTop;
      const clTop = this.p5.nativeElement.clientTop;

      this.fp5.nativeElement.scrollTop = (window.pageYOffset || scrTop)  - (clTop || 0);
    });
  }

  public onChange($event: any): void {
    const txt = (<HTMLInputElement>this.p5.nativeElement).value;
    const hlP5 = this.hl.highlightP5(txt);
    this.fp5.nativeElement.innerHTML = hlP5 + '&#13;&#10;&#13;&#10;';

    const reset = this.conversor.reset(txt);
    const convers = this.conversor.conversor(reset, this.ofv);
    this.p5v = this.conversor.p5ver(reset);

    const apph = this.conversor.ofApph(convers);
    this.apph = apph;
    this.of3.nativeElement.innerHTML = this.hl.highlightC(apph);

    const maincpp = this.conversor.maincpp(convers);
    this.main = maincpp;
    this.of2.nativeElement.innerHTML = this.hl.highlightC(maincpp);

    const appcpp = this.conversor.ofAppcpp(convers);
    this.app = appcpp;
    this.of.nativeElement.innerHTML = this.hl.highlightC(appcpp);
  }

}
