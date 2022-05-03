import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-analyrequehome',
  templateUrl: './analyrequehome.component.html',
  styleUrls: ['./analyrequehome.component.scss']
})
export class AnalyrequehomeComponent implements OnInit {

  table:any

  panelOpenState = false;

  constructor(public router: Router, public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.TRACKING_ANALYSIS_SELECT_ALL().subscribe((data: {}) => {
      console.log(data);
      this.table = data
    })
  }
  addform(){
   this.router.navigate(['/Requestformfill'])
  }
}
