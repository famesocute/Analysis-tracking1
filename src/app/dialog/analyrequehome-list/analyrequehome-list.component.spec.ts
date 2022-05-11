import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyrequehomeListComponent } from './analyrequehome-list.component';

describe('AnalyrequehomeListComponent', () => {
  let component: AnalyrequehomeListComponent;
  let fixture: ComponentFixture<AnalyrequehomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyrequehomeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyrequehomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
