import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.component.html',
  styleUrls: ['./addfile.component.scss']
})
export class AddfileComponent implements OnInit {
  Requestno : any

  DataResFlie : any

  constructor(public productService: ProductService,public router: Router) { }

  ngOnInit(): void {
    this.Requestno = sessionStorage.getItem("RequestNo");
    console.log(this.Requestno)

    this.productService.TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ(this.Requestno).subscribe((data: {}) => {
      console.log(data);
      this.DataResFlie = data
    })
  }
  GoAnahome(){
    sessionStorage.removeItem("RequestNo");
    this.router.navigate(['/AnahomeNotcom'])
  }
}
