import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangertoCCComponent } from './dangerto-cc.component';

describe('DangertoCCComponent', () => {
  let component: DangertoCCComponent;
  let fixture: ComponentFixture<DangertoCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangertoCCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangertoCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
