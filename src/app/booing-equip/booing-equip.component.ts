import { Component, OnInit } from '@angular/core';
import { VERSION, ViewChild} from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-booing-equip',
  templateUrl: './booing-equip.component.html',
  styleUrls: ['./booing-equip.component.scss']
})
export class BooingEquipComponent implements OnInit, AfterViewInit {
  private ngVersion: string = VERSION.full;
  @ViewChild('stepper') private myStepper!: MatStepper;
  totalStepsCount!: number;
  constructor() { }

  ngOnInit(): void {
  }
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
