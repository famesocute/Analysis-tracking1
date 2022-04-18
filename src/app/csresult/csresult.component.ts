import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csresult',
  templateUrl: './csresult.component.html',
  styleUrls: ['./csresult.component.scss']
})
export class CSresultComponent implements OnInit {

  input=""

  constructor() { 
    
  }

  ngOnInit(): void {
  }
  Test(){
      console.log(this.input);
  }
}
