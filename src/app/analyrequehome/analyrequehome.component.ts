import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyrequehome',
  templateUrl: './analyrequehome.component.html',
  styleUrls: ['./analyrequehome.component.scss']
})
export class AnalyrequehomeComponent implements OnInit {
  panelOpenState = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  addform(){
   this.router.navigate(['/Requestformfill'])
  }
}
