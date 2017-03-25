import { TestBed, inject } from '@angular/core/testing';

import { DownloadService } from './download.service';

describe('DownloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadService]
    });
  });

  it('should ...', inject([DownloadService], (service: DownloadService) => {
    expect(service).toBeTruthy();
  }));
});
