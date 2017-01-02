/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionDataService } from './session-data.service';

describe('SessionDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionDataService]
    });
  });

  it('should ...', inject([SessionDataService], (service: SessionDataService) => {
    expect(service).toBeTruthy();
  }));
});
