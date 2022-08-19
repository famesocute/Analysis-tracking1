import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationtimeComponent } from './add-operationtime.component';

describe('AddOperationtimeComponent', () => {
  let component: AddOperationtimeComponent;
  let fixture: ComponentFixture<AddOperationtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOperationtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperationtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
