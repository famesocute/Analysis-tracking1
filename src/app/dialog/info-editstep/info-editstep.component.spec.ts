import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEditstepComponent } from './info-editstep.component';

describe('InfoEditstepComponent', () => {
  let component: InfoEditstepComponent;
  let fixture: ComponentFixture<InfoEditstepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEditstepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEditstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
