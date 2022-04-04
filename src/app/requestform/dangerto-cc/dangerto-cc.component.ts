import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dangerto-cc',
  templateUrl: './dangerto-cc.component.html',
  styleUrls: ['./dangerto-cc.component.scss']
})
export class DangertoCCComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns = [ 'task', 'process', 'name', 'time', 'comment', 'cc'];
  dataSource = ELEMENT_DATA;

  displayedColumns2 = [ 'top', 'side', 'view'];
  dataSource2 = ELEMENT_DATA2;
}

export interface PeriodicElement {
  task: string ;
  process: string;
  name: string;
  time: string;
  comment : string;
  cc : string;
}      
const ELEMENT_DATA: PeriodicElement[] = [
  {task: 'Pending request', process: 'Issuer', name: '', time: '', comment : '1' , cc : '-'},
  {task: '', process: 'Confirm 1', name: '', time: '', comment : '1', cc : '-'},
  {task: '', process: 'Confirm 2', name: '', time: '', comment : '1', cc : '-'},
  {task: '', process: 'Request approval', name: '', time: '', comment : '1', cc : '-'},
  {task: 'Analysis section', process: 'Controller', name: '', time: '', comment : '1', cc : '-'},
  {task: '', process: 'Analyst', name: '', time: '', comment : '1', cc : '-'},
  {task: 'Report approval', process: 'Check', name: '', time: '', comment : '1', cc : '-'},
  {task: '', process: 'Confirm', name: '', time: '', comment : '1', cc : '-'},
  {task: '', process: 'Approver', name: '', time: '', comment : '1', cc : '-'},
  {task: 'CS Evaluation', process: 'Issuer', name: '', time: '', comment : '1', cc : '-'},
  {task: 'Completed', process: 'Close', name: '', time: '', comment : '1', cc : '-'},
];

export interface PeriodicElement2 {
  top : string;
  side: number;
  view: number;
}
const ELEMENT_DATA2: PeriodicElement2[] = [
  { top: 'Fame', side: 1.0079, view: 1},
  { top: 'Helium', side: 4.0026, view: 2},
  { top: 'Lithium', side: 6.941, view: 3},
  { top: 'Beryllium', side: 9.0122, view: 3},
  { top: 'Boron', side: 10.811, view: 3},
  { top: 'Lithium', side: 6.941, view: 3},
  { top: 'Beryllium', side: 9.0122, view: 3},
  { top: 'Boron', side: 10.811, view: 3},
  
];

