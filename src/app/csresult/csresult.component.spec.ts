import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSresultComponent } from './csresult.component';

describe('CSresultComponent', () => {
  let component: CSresultComponent;
  let fixture: ComponentFixture<CSresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
