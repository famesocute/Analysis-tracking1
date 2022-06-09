import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstistepEditComponent } from './estistep-edit.component';

describe('EstistepEditComponent', () => {
  let component: EstistepEditComponent;
  let fixture: ComponentFixture<EstistepEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstistepEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstistepEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
