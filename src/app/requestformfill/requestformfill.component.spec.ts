import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestformfillComponent } from './requestformfill.component';

describe('RequestformfillComponent', () => {
  let component: RequestformfillComponent;
  let fixture: ComponentFixture<RequestformfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestformfillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestformfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
