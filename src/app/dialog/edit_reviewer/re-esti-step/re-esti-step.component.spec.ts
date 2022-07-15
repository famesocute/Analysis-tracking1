import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReEstiStepComponent } from './re-esti-step.component';

describe('ReEstiStepComponent', () => {
  let component: ReEstiStepComponent;
  let fixture: ComponentFixture<ReEstiStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReEstiStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReEstiStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
