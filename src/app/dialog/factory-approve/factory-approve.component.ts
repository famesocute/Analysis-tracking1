import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-factory-approve',
  templateUrl: './factory-approve.component.html',
  styleUrls: ['./factory-approve.component.scss']
})
export class FactoryApproveComponent implements OnInit {
  DataRes : any

  message = ""
  issuer = ""
  confirm = ""
  analyzer = ""

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      this.issuer = this.DataRes[0].REVI_PAND_ISSUER.split("<")
      this.confirm = this.DataRes[0].REVI_PAND_CONFIRM.split("<")
      this.analyzer = this.DataRes[0].REVI_ANASEC_ANAL.split("<")
    })

  }

}
