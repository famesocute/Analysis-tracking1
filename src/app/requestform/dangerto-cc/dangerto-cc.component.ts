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
  displayedColumns = [ 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  displayedColumns2 = [ 'top', 'side', 'view'];
  dataSource2 = ELEMENT_DATA2;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
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

