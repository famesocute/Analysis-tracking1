import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteppaddingComponent } from './steppadding.component';

describe('SteppaddingComponent', () => {
  let component: SteppaddingComponent;
  let fixture: ComponentFixture<SteppaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteppaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteppaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
