import { TestBed, inject } from '@angular/core/testing';

import { HighlightService } from './highlight.service';
import { Tools } from './tools';

describe('HighlightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightService, Tools]
    });
  });

  it('should ...', inject([HighlightService], (service: HighlightService) => {
    expect(service).toBeTruthy();
  }));
});
