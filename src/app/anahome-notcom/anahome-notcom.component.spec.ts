import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnahomeNotcomComponent } from './anahome-notcom.component';

describe('AnahomeNotcomComponent', () => {
  let component: AnahomeNotcomComponent;
  let fixture: ComponentFixture<AnahomeNotcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnahomeNotcomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnahomeNotcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
