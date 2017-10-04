import { TestBed, inject } from '@angular/core/testing';

import { CargaimagenesService } from './cargaimagenes.service';

describe('CargaimagenesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargaimagenesService]
    });
  });

  it('should be created', inject([CargaimagenesService], (service: CargaimagenesService) => {
    expect(service).toBeTruthy();
  }));
});
