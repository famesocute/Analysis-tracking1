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
  Fill_inital :any = "["
  Fill_initalchk = false

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
      var x 
      for(x in this.DataResFlie){
        if(this.DataResFlie[x].SECTION == "Fill_inital"){

          if((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png"|| (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg"){
            this.Fill_inital = this.Fill_inital + '{"FILENAME":"",'  
          }
          else{  
            this.Fill_inital = this.Fill_inital + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
          }
          console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
          this.Fill_inital = this.Fill_inital + '"idupload_list":"' + this.DataResFlie[x].idupload_list + '",' 
          this.Fill_inital = this.Fill_inital + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'
        }
      }
      if(this.Fill_inital.length != 1){
        this.Fill_inital = this.Fill_inital.substring(0, this.Fill_inital.length - 1);
        this.Fill_inital = this.Fill_inital + "]";
        console.log(this.Fill_inital)

        if(this.Fill_inital != "]"){
        var obj = JSON.parse(this.Fill_inital);
         console.log(obj)
         this.Fill_inital = obj

        if(this.Fill_inital != "]"){
          this.Fill_initalchk = true
        }
      }
      }
    })
    
  }
  GoAnahome(){
    var qtest2 = " "+this.DataRes[0].REVI_PAND_CONFIRM+";||"+this.DataRes[0].REVI_PAND_ISSUE_CC+"||Q-Analysis Request ->(Approve Request Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve request.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Paddingreque?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
     
      sessionStorage.removeItem("RequestNo");
    })
    this.router.navigate(['/AnahomeNotcom'])
  }
  deletefile(x:any){
    this.productService.TRACKING_ANALYSIS_DELETE_FILE(x).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
  }
}
