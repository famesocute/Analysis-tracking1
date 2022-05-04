import { Component, OnInit } from '@angular/core';
import {  VERSION, ViewChild} from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';



@Component({
  selector: 'app-csresult',
  templateUrl: './csresult.component.html',
  styleUrls: ['./csresult.component.scss']
})
export class CSresultComponent implements OnInit, AfterViewInit {
  private ngVersion: string = VERSION.full;
  
  // Only required when not passing the id in methods
  @ViewChild('stepper') private myStepper!: MatStepper;
  totalStepsCount!: number;
  
  constructor() {}

  ngOnInit(): void {
    
  }
  // Event fired after view is initialized
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  
  
}
