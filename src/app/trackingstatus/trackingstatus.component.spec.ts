import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingstatusComponent } from './trackingstatus.component';

describe('TrackingstatusComponent', () => {
  let component: TrackingstatusComponent;
  let fixture: ComponentFixture<TrackingstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
