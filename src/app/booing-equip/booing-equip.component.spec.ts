import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooingEquipComponent } from './booing-equip.component';

describe('BooingEquipComponent', () => {
  let component: BooingEquipComponent;
  let fixture: ComponentFixture<BooingEquipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooingEquipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooingEquipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
