import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryApproveComponent } from './factory-approve.component';

describe('FactoryApproveComponent', () => {
  let component: FactoryApproveComponent;
  let fixture: ComponentFixture<FactoryApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
