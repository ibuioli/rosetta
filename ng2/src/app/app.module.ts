import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { P52OfService } from './p5-2-of.service';
import { HighlightService } from './highlight.service';
import { DownloadService } from './download.service';
import { Tools } from './tools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    P52OfService,
    HighlightService,
    DownloadService,
    Tools
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
