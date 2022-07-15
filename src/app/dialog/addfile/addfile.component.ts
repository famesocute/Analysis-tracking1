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
  DataRes : any

  DataResFlie : any

  section = "Fill_inital"

  constructor(public productService: ProductService,public router: Router) { }

  ngOnInit(): void {
    this.Requestno = sessionStorage.getItem("RequestNo");
    console.log(this.Requestno)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_REQ(this.Requestno).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })

    this.productService.TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ(this.Requestno).subscribe((data: {}) => {
      console.log(data);
      this.DataResFlie = data
    })
  }
  GoAnahome(){
    sessionStorage.removeItem("RequestNo");
    this.router.navigate(['/AnahomeNotcom'])

    var qtest2 = " "+this.DataRes[0].REVI_PAND_CONFIRM+";||"+this.DataRes[0].REVI_PAND_ISSUE_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
//(to)panusorn.pin@murata.com;asasas@murata.com;||CC||Subject||data link
  }
}
