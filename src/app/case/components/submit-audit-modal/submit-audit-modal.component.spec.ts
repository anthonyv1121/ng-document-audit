import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAuditModalComponent } from './submit-audit-modal.component';

describe('SubmitAuditModalComponent', () => {
  let component: SubmitAuditModalComponent;
  let fixture: ComponentFixture<SubmitAuditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAuditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAuditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
