import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAuditModalComponent } from './approve-audit-modal.component';

describe('ApproveAuditModalComponent', () => {
  let component: ApproveAuditModalComponent;
  let fixture: ComponentFixture<ApproveAuditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAuditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAuditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
