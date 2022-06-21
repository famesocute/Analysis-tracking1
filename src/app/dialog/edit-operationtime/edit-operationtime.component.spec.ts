import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOperationtimeComponent } from './edit-operationtime.component';

describe('EditOperationtimeComponent', () => {
  let component: EditOperationtimeComponent;
  let fixture: ComponentFixture<EditOperationtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOperationtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOperationtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
