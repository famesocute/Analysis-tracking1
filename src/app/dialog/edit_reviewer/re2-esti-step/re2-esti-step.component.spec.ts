import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Re2EstiStepComponent } from './re2-esti-step.component';

describe('Re2EstiStepComponent', () => {
  let component: Re2EstiStepComponent;
  let fixture: ComponentFixture<Re2EstiStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Re2EstiStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Re2EstiStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
