import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-approver-step',
  templateUrl: './approver-step.component.html',
  styleUrls: ['./approver-step.component.scss']
})
export class ApproverStepComponent implements OnInit {

  constructor( public productService: ProductService) { }

  ngOnInit(): void {
  }

}
