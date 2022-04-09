import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddingrequeComponent } from './paddingreque.component';

describe('PaddingrequeComponent', () => {
  let component: PaddingrequeComponent;
  let fixture: ComponentFixture<PaddingrequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaddingrequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddingrequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
