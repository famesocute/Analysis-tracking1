import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstiStepComponent } from './esti-step.component';

describe('EstiStepComponent', () => {
  let component: EstiStepComponent;
  let fixture: ComponentFixture<EstiStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstiStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstiStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
