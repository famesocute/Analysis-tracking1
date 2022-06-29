import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnahomeCompleteComponent } from './anahome-complete.component';

describe('AnahomeCompleteComponent', () => {
  let component: AnahomeCompleteComponent;
  let fixture: ComponentFixture<AnahomeCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnahomeCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnahomeCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
