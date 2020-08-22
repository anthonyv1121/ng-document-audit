import { TestBed, inject } from '@angular/core/testing';

import { PagePropsService } from './page-props.service';

describe('PagePropsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagePropsService]
    });
  });

  it('should be created', inject([PagePropsService], (service: PagePropsService) => {
    expect(service).toBeTruthy();
  }));
});
