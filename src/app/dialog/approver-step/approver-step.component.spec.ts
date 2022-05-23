import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverStepComponent } from './approver-step.component';

describe('ApproverStepComponent', () => {
  let component: ApproverStepComponent;
  let fixture: ComponentFixture<ApproverStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
