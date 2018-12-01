import { TestBed, inject } from '@angular/core/testing';

import { FilesService } from './files.service';
import { DebugConsoleService } from './debug-console.service';

describe('FilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesService, DebugConsoleService]
    });
  });

  it('should ...', inject([FilesService], (service: FilesService) => {
    expect(service).toBeTruthy();
  }));
});
