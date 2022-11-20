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

/* MATERIAL */
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule
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
