import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoandTachniComponent } from './infoand-tachni.component';

describe('InfoandTachniComponent', () => {
  let component: InfoandTachniComponent;
  let fixture: ComponentFixture<InfoandTachniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoandTachniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoandTachniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
