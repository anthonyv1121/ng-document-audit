import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardsModalComponent } from './view-cards-modal.component';

describe('ViewCardsModalComponent', () => {
  let component: ViewCardsModalComponent;
  let fixture: ComponentFixture<ViewCardsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCardsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
