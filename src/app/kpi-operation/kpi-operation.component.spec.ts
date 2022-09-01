import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KPIOperationComponent } from './kpi-operation.component';

describe('KPIOperationComponent', () => {
  let component: KPIOperationComponent;
  let fixture: ComponentFixture<KPIOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KPIOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KPIOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
