import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmailQuestionComponent } from './sendmail-question.component';

describe('SendmailQuestionComponent', () => {
  let component: SendmailQuestionComponent;
  let fixture: ComponentFixture<SendmailQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendmailQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmailQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
