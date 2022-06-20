import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-trackingstatus',
  templateUrl: './trackingstatus.component.html',
  styleUrls: ['./trackingstatus.component.scss']
})
export class TrackingstatusComponent implements OnInit {
  isValidPic1 = true

  requester = ""
  sample1 : any
  sample2 : any

  loading = true
  isValid = false
  isValidButton = true

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  userType : any
  DataRes : any
  DataResreq : any

  breaktime =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  constructor(public router: Router,public productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }

    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
      this.loading = false

      var x
      for (x in this.DataRes) {
        this.requester = this.DataRes[x].REVI_PAND_ISSUER.split("<");
        this.DataRes[x].REVI_PAND_ISSUER = this.requester[0]
      }

      this.sample1 = this.DataRes[0].ESTI_TECHNIQUE.split("[]")
    console.log(this.sample1)

    var x
    var a
    this.sample2 = "["

    for(x in this.sample1)
    {
      a = this.sample1[x].split("||")
      this.sample2 = this.sample2 + '{"equip":"' + a[0] + '",'
      this.sample2 = this.sample2 + '"Sample_no":"' + a[1] + '"},'

    }
    this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
    this.sample2 =  this.sample2 + "]";
    console.log( this.sample2)
    var obj = JSON.parse( this.sample2);
      this.sample1 = obj
      console.log( this.sample1)

      this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResreq = data
        var i :any
        for (i in this.DataResreq){
          this.breaktime[i] = this.DataResreq[i].BREAK_TIME
        }
        if (this.DataResreq[0].START_TIME != null) {
          this.isValidButton = false
        }
      })
    })
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
  }
  Logout(){
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("EMPLOY_CODE");
    sessionStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  starttime(id:any){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `START_TIME` = '"+ date2 +"' " +
      " WHERE (`ID_BOOKING` = '"+id+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
  })
  }
  Endtime(id:any){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `END_TIME` = '"+ date2 +"' " +
      " WHERE (`ID_BOOKING` = '"+id+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
  })
  }
  finish(id:any,Array:any){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `BREAK_TIME` = '"+ this.breaktime[Array] +"' " +
      " WHERE (`ID_BOOKING` = '"+id+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
  })
  }

}
