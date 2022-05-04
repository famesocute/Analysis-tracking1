import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstiCostComponent } from './esti-cost.component';

describe('EstiCostComponent', () => {
  let component: EstiCostComponent;
  let fixture: ComponentFixture<EstiCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstiCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstiCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
