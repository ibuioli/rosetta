import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { P52OfService } from './services/p5-2-of.service';
import { HighlightService } from './services/highlight.service';
import { FilesService } from './services/files.service';
import { DebugConsoleService } from './services/debug-console.service';
import { Tools } from './services/tools';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule
  ],
  providers: [
    P52OfService,
    HighlightService,
    FilesService,
    DebugConsoleService,
    Tools
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
