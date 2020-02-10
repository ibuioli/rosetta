import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { P52OfService } from './services/p5-2-of.service';
import { HighlightService } from './services/highlight.service';
import { FilesService } from './services/files.service';
import { DebugConsoleService } from './services/debug-console.service';
import { Tools } from './services/tools';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        P52OfService,
        HighlightService,
        FilesService,
        DebugConsoleService,
        Tools
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
