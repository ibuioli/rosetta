import { TestBed, inject } from '@angular/core/testing';

import { DebugConsoleService } from './debug-console.service';

describe('DebugConsoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebugConsoleService]
    });
  });

  it('should be created', inject([DebugConsoleService], (service: DebugConsoleService) => {
    expect(service).toBeTruthy();
  }));
});
