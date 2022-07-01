import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyjobComponent } from './dailyjob.component';

describe('DailyjobComponent', () => {
  let component: DailyjobComponent;
  let fixture: ComponentFixture<DailyjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
