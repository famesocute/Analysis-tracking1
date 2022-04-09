import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyrequehomeComponent } from './analyrequehome.component';

describe('AnalyrequehomeComponent', () => {
  let component: AnalyrequehomeComponent;
  let fixture: ComponentFixture<AnalyrequehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyrequehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyrequehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
