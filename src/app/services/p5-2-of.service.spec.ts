import { TestBed, inject } from '@angular/core/testing';

import { P52OfService } from './p5-2-of.service';
import { Tools } from './tools';

describe('P52OfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [P52OfService, Tools]
    });
  });

  it('should ...', inject([P52OfService], (service: P52OfService) => {
    expect(service).toBeTruthy();
  }));
});
