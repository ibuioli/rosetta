import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { P52OfService } from './services/p5-2-of.service';
import { HighlightService } from './services/highlight.service';
import { FilesService } from './services/files.service';
import { DebugConsoleService } from './services/debug-console.service';
import { Tools } from './services/tools';

/* MATERIAL */
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatSelectModule], providers: [
        P52OfService,
        HighlightService,
        FilesService,
        DebugConsoleService,
        Tools,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
