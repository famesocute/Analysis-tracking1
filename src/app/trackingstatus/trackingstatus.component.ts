import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { FactoryApproveComponent } from '../dialog/factory-approve/factory-approve.component';
import { EditOperationtimeComponent } from '../dialog/edit-operationtime/edit-operationtime.component';

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
  isValidButton = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
  isValidButton2 = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
  isValidButton3= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
  isValid1 = [false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  userType : any
  DataRes : any
  DataResreq : any
  operationtime = ""

  breaktime =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  constructor(public router: Router,public productService: ProductService,private route: ActivatedRoute,private matDialog: MatDialog) { }

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
          
          console.log((this.DataResreq[i].START_TIME));

          if (this.DataResreq[i].START_TIME != null) {
            this.isValidButton[i] = false
            this.isValidButton2[i] = true

            if(this.DataResreq[i].END_TIME != null){
              this.isValidButton2[i] = false
            }
          }else if (this.DataResreq[i].OPERATION_TIME != null){
            this.isValidButton3[i] = false
          }
          else{
            this.isValidButton2[i] = true
            console.log("data");
          }
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
  starttime(id:any,Array:any){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `START_TIME` = '"+ date2 +"' " +
      " WHERE (`ID_BOOKING` = '"+id+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidButton[Array] = false
      location.reload();
  })
  }
  Endtime(id:any,Array:any){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `END_TIME` = '"+ date2 +"' " +
      " WHERE (`ID_BOOKING` = '"+id+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidButton2[Array] = false
      location.reload();
    
  })
  }
  finish(id:any,Array:any){
// start
      console.log(this.DataResreq[Array].START_TIME.split(" "))
      var timecalStart =  this.DataResreq[Array].START_TIME.split(" ")
  
      if(timecalStart[2] == "PM"){
        console.log(this.dateto24(timecalStart[1]))
        timecalStart[1] = this.dateto24(timecalStart[1])
      }
      timecalStart[0] = timecalStart[0].substring(0, timecalStart[0].length - 1);

      const [month, day, year] = timecalStart[0].split('/');
      const [hours, minutes, seconds] = timecalStart[1].split(':');

      const date3 = new Date(+year, +month, +day, +hours, +minutes, +seconds);
      console.log(date3); // 👉️ Fri Jun 24 2022 09:30:05
// End
      console.log(this.DataResreq[Array].END_TIME.split(" "))
      var timecalEND =  this.DataResreq[Array].END_TIME.split(" ")

      if(timecalEND[2] == "PM"){
        console.log(this.dateto24(timecalEND[1]))
        timecalEND[1] = this.dateto24(timecalEND[1])
      }
      timecalEND[0] = timecalEND[0].substring(0, timecalEND[0].length - 1);

      const [monthEND, dayEND, yearEND] = timecalEND[0].split('/');
      const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');

      const date4 = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
      console.log(date4); // 👉️ Fri Jun 24 2022 09:30:05
// calculate
      var numDate= new Date(date4.getTime() - date3.getTime());
      console.log(numDate)
      // 3600000 ms
      console.log((date4.getTime() - date3.getTime()) / (10000 * 36))
      this.operationtime = this.msToTime(numDate)
      console.log(this.operationtime)

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `BREAK_TIME` = '"+ this.breaktime[Array] +"', `OPERATION_TIME` = '" + this.operationtime + "' " +
      " WHERE (`ID_BOOKING` = '"+id+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidButton3[Array] = false
  })
  }
   msToTime(s:any) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ':' + mins + ':' + secs;
  }

  dateto24(time1 : any){
    var time2 = time1.split(":")
    var time3 = parseInt(time2[0]) + 12
    console.log(time3)
    return (time3+":"+time2[1]+":"+time2[2])
  }

  FacDetail(){
    this.productService.changeMessage(this.DataRes[0].ID)

    const dialogRef = this.matDialog.open(FactoryApproveComponent, {
      disableClose : true,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result );
    }); 
  }
  edittime(){
    const dialogRef = this.matDialog.open(EditOperationtimeComponent, {
      disableClose : true,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result );
   
    });
  }
    
}
