import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingEquipmentComponent } from './add-booking-equipment.component';

describe('AddBookingEquipmentComponent', () => {
  let component: AddBookingEquipmentComponent;
  let fixture: ComponentFixture<AddBookingEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookingEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
