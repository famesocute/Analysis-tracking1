import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryresultComponent } from './summaryresult.component';

describe('SummaryresultComponent', () => {
  let component: SummaryresultComponent;
  let fixture: ComponentFixture<SummaryresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
