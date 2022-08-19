import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReporttimeComponent } from './add-reporttime.component';

describe('AddReporttimeComponent', () => {
  let component: AddReporttimeComponent;
  let fixture: ComponentFixture<AddReporttimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReporttimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReporttimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
