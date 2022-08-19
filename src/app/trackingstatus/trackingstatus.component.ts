import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { FactoryApproveComponent } from '../dialog/factory-approve/factory-approve.component';
import { EditOperationtimeComponent } from '../dialog/edit-operationtime/edit-operationtime.component';
import { AddOperationtimeComponent } from '../dialog/add-operationtime/add-operationtime.component';
import { AddReporttimeComponent } from '../dialog/add-reporttime/add-reporttime.component'

@Component({
  selector: 'app-trackingstatus',
  templateUrl: './trackingstatus.component.html',
  styleUrls: ['./trackingstatus.component.scss']
})
export class TrackingstatusComponent implements OnInit {
  isValidPic1 = true

  requester = ""
  sample1: any
  sample2: any

  loading = true
  isValid = false
  isValidButton = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  isValidButton2 = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  isValidButton3 = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  isValid1 = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  userType: any
  DataRes: any
  DataResreq: any
  DataResreq2: any
  operationtime = ""
  operationtime2: any
  operationtime3: any
  operationtimere2: any
  operationtimere3: any
  DataIssue : any

  isValidIssueRe = true
  isValidshowIssueRe = true
  isValidstatusre = true
  validissue = false
  isValidIssueRefinish = true

  breaktime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  breaktime2: any
  breaktime3: any
  breaktimere2 : any
  breaktimere3 : any

  breaktimereport = 0

  constructor(public router: Router, public productService: ProductService, private route: ActivatedRoute, private matDialog: MatDialog) { }

  ngOnInit(): void {

    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");

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

      for (x in this.sample1) {
        a = this.sample1[x].split("||")
        this.sample2 = this.sample2 + '{"equip":"' + a[0] + '",'
        this.sample2 = this.sample2 + '"Sample_no":"' + a[1] + '"},'

      }
      var lastSTEP :any
      this.sample2 = this.sample2.substring(0, this.sample2.length - 1);
      this.sample2 = this.sample2 + "]";
      console.log(this.sample2)
      var obj = JSON.parse(this.sample2);
      this.sample1 = obj
      console.log(this.sample1)

      this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResreq = data
        var i: any

        this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_STEP(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
          console.log(data);
          this.DataResreq2 = data

          var x: any
          for (i in this.DataResreq) {
            this.breaktime[i] = this.DataResreq[i].BREAK_TIME
            console.log((this.DataResreq[i].START_TIME));
            if (this.DataResreq[i].START_TIME != null ) {
              if(this.DataResreq[i].START_TIME != 'null'){
                this.isValidButton[i] = false
                this.isValidButton2[i] = true
              }

              if (this.DataResreq[i].END_TIME != null) {
                if (this.DataResreq[i].END_TIME != 'null') { 
                  this.isValidButton2[i] = false
                }
                if (this.DataResreq[i].OPERATION_TIME != "0") {
                  this.isValidButton3[i] = false
                }
              }
            }
            else {
              this.isValidButton2[i] = true
              
            }
            
            for (x in this.DataResreq2) {
              // console.log("DataResreq2" +this.DataResreq2[x].STEP_BOOKING)
              // console.log("DataResreq" +this.DataResreq[x].STEP_BOOKING)
              

              if (this.DataResreq2[x].STEP_BOOKING == this.DataResreq[i].STEP_BOOKING) {
                console.log("nowSTEP : " +this.DataResreq2[x].STEP_BOOKING)
                console.log("lastSTEP : " +lastSTEP)

              
                console.log(this.DataResreq[i].OPERATION_TIME);
                if (lastSTEP == this.DataResreq2[x].STEP_BOOKING)
                {
                  if ( (this.isValid1[x-1] == false && this.DataResreq[i].OPERATION_TIME.length == 1) || this.DataResreq[i].OPERATION_TIME == 0){
                    this.isValid1[x] = true
                    break
                  }
                  else if( (this.isValid1[x-1] == true && this.DataResreq[i].OPERATION_TIME.length == 1) || this.DataResreq[i].OPERATION_TIME == 0){
                    this.isValid1[x] = true
                    break
                  }
                }
                else{
                  if (this.DataResreq[i].OPERATION_TIME.length == 1) {
                    this.isValid1[x] = true
                    console.log("true" + i)
                  }
                  else{
                    this.isValid1[x] = false
                    console.log("false" + i)
                  }
                }
                
                lastSTEP = this.DataResreq2[x].STEP_BOOKING
              }
              
            }
          }
         
        })
        console.log(this.DataRes)
        this.productService.TRACKING_ANALYSIS_SELECT_TIMEISSUE_REPORT_BYREQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
          console.log(data);
          this.DataIssue = data
          console.log(this.DataIssue.length)

          if(this.DataIssue.length != 0){
            this.validissue = true
            if (this.DataIssue[0].START_TIME != null) {
              this.isValidIssueRe = false
              if(this.DataIssue[0].END_TIME != null){
                this.isValidIssueRefinish = false
              }
            }
            if(this.DataIssue[0].REQ_NUM != null){
              if(this.DataIssue[0].OPERATION_TIME != null){
                this.isValidshowIssueRe = true
                this.isValidstatusre = false
              }else {
                this.isValidshowIssueRe = false
              }
            }
          }else{
            this.validissue = false
          }
        })
      })
    })
  }
  Goanalysishome() {
    this.router.navigate(['/Analyrequehome'])
  }
  Logout() {
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  GoAnaNoCom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  addreporttime(){
    var qtest = ""
    qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`issue_report` " +
      " (`REQ_NUM`) VALUES ('" + this.DataRes[0].REQ_NUM + "'); " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
     
      this.isValidshowIssueRe = false
      location.reload();
    })
  }
  calreporttime(){
    console.log(this.DataIssue[0].START_TIME.split(" "))
    var timecalStart = this.DataIssue[0].START_TIME.split(" ")

    if (timecalStart[2] == "PM") {
      const [hoursEND, minutesEND, secondsEND] = timecalStart[1].split(':');
      if(hoursEND == 12){
        hoursEND2 = 12
        timecalStart[1] = hoursEND2+":"+minutesEND+":"+secondsEND
        console.log(timecalStart[1])
      }else{
        console.log(this.dateto24(timecalStart[1]))
        timecalStart[1] = this.dateto24(timecalStart[1])
      }
    }
    timecalStart[0] = timecalStart[0].substring(0, timecalStart[0].length - 1);
   
    const [month, day, year] = timecalStart[0].split('/');
    const [hours, minutes, seconds] = timecalStart[1].split(':');

    const date3 = new Date(+year, +month, +day, +hours, +minutes, +seconds);
    console.log(date3); // 👉️ Fri Jun 24 2022 09:30:05

    // End
    console.log(this.DataIssue[0].END_TIME.split(" "))
    var timecalEND = this.DataIssue[0].END_TIME.split(" ")
    var hoursEND2
    if (timecalEND[2] == "PM") {
      const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');
      if(hoursEND == 12){
        hoursEND2 = 12
        timecalEND[1] = hoursEND2+":"+minutesEND+":"+secondsEND
        console.log(timecalEND[1])
      }else{
        console.log(this.dateto24(timecalEND[1]))
        timecalEND[1] = this.dateto24(timecalEND[1])
      }
    }
    timecalEND[0] = timecalEND[0].substring(0, timecalEND[0].length - 1);

    const [monthEND, dayEND, yearEND] = timecalEND[0].split('/');
    const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');

    const date4 = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
    console.log(date4); // 👉️ Fri Jun 24 2022 09:30:05
    // calculate
    var numDate = new Date(date4.getTime() - date3.getTime());
    console.log(numDate)
    // 3600000 ms
    this.operationtime = this.msToTime(numDate)
    console.log(this.operationtime)
    this.operationtimere2 = this.operationtime.split(':');
    console.log(this.operationtimere2[0])

    this.breaktimere2 = this.breaktimereport / 60
    console.log(this.breaktimere2)
    // 1.88
    this.breaktimere2 = this.breaktimere2.toString();
    this.breaktimere2 = this.breaktimere2.split('.');
    console.log(this.breaktimere2[0])
    // 1 houre
    this.breaktimere3 = this.breaktimereport % 60
    console.log(this.breaktimere3)
    // 50 min
    var min
    var houre
    if(this.operationtimere2[0] == 0){
      if (this.operationtimere2[1] - this.breaktimere3 < 0){
        alert("Over break times");
      }else{
        min = this.operationtimere2[1] - this.breaktimere3
      houre = this.operationtimere2[0] - this.breaktimere2[0]

      min = min.toString();
      if (min.length == 1) {
        min = "0" + min
        this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
        console.log(this.operationtimere3)
      } else {
        this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
        console.log(this.operationtimere3)
      }
  
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`issue_report` " +
        " SET  `BREAK_TIME` = '" + this.breaktimereport + "', `OPERATION_TIME` = '" + this.operationtimere3 + "' " +
        " WHERE (`ID_ISSUEREPORT` = '" + this.DataIssue[0].ID_ISSUEREPORT + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })

      }
    }else{
      if (this.operationtimere2[1] - this.breaktimere3 < 0) {
        min = this.breaktimere3 - this.operationtimere2[1]
        console.log(min)
        min = 60 - min
        houre = this.operationtimere2[0] - 1
        console.log(min)
        houre = this.operationtimere2[0] - this.breaktimere2[0]
        console.log(houre)
  
        min = min.toString();
        if (min.length == 1) {
          min = "0" + min
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        } else {
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        }
  
      } else {
        min = this.operationtimere2[1] - this.breaktimere3
        houre = this.operationtimere2[0] - this.breaktimere2[0]
  
        min = min.toString();
        if (min.length == 1) {
          min = "0" + min
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        } else {
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        }
      }
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`issue_report` " +
        " SET  `BREAK_TIME` = '" + this.breaktimereport + "', `OPERATION_TIME` = '" + this.operationtimere3 + "' " +
        " WHERE (`ID_ISSUEREPORT` = '" + this.DataIssue[0].ID_ISSUEREPORT + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })
    }
 
    var qtest2 = ""
    qtest2 = qtest2 + "INSERT INTO `mtq10_project_tracking_analysis`.`issue_report` " +
      " (`REQ_NUM`) VALUES ('" + this.DataRes[0].REQ_NUM + "'); " 
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest2).subscribe((data: {}) => {
      console.log(data);
      this.isValidIssueRe = false
      location.reload();
    })
  }

  finishreport(){
    console.log(this.DataIssue[0].START_TIME.split(" "))
    var timecalStart = this.DataIssue[0].START_TIME.split(" ")

    if (timecalStart[2] == "PM") {
      const [hoursEND, minutesEND, secondsEND] = timecalStart[1].split(':');
      if(hoursEND == 12){
        hoursEND2 = 12
        timecalStart[1] = hoursEND2+":"+minutesEND+":"+secondsEND
        console.log(timecalStart[1])
      }else{
        console.log(this.dateto24(timecalStart[1]))
        timecalStart[1] = this.dateto24(timecalStart[1])
      }
    }
    timecalStart[0] = timecalStart[0].substring(0, timecalStart[0].length - 1);
   
    const [month, day, year] = timecalStart[0].split('/');
    const [hours, minutes, seconds] = timecalStart[1].split(':');

    const date3 = new Date(+year, +month, +day, +hours, +minutes, +seconds);
    console.log(date3); // 👉️ Fri Jun 24 2022 09:30:05

    // End
    console.log(this.DataIssue[0].END_TIME.split(" "))
    var timecalEND = this.DataIssue[0].END_TIME.split(" ")
    var hoursEND2
    if (timecalEND[2] == "PM") {
      const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');
      if(hoursEND == 12){
        hoursEND2 = 12
        timecalEND[1] = hoursEND2+":"+minutesEND+":"+secondsEND
        console.log(timecalEND[1])
      }else{
        console.log(this.dateto24(timecalEND[1]))
        timecalEND[1] = this.dateto24(timecalEND[1])
      }
    }
    timecalEND[0] = timecalEND[0].substring(0, timecalEND[0].length - 1);

    const [monthEND, dayEND, yearEND] = timecalEND[0].split('/');
    const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');

    const date4 = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
    console.log(date4); // 👉️ Fri Jun 24 2022 09:30:05
    // calculate
    var numDate = new Date(date4.getTime() - date3.getTime());
    console.log(numDate)
    // 3600000 ms
    this.operationtime = this.msToTime(numDate)
    console.log(this.operationtime)
    this.operationtimere2 = this.operationtime.split(':');
    console.log(this.operationtimere2[0])

    this.breaktimere2 = this.breaktimereport / 60
    console.log(this.breaktimere2)
    // 1.88
    this.breaktimere2 = this.breaktimere2.toString();
    this.breaktimere2 = this.breaktimere2.split('.');
    console.log(this.breaktimere2[0])
    // 1 houre
    this.breaktimere3 = this.breaktimereport % 60
    console.log(this.breaktimere3)
    // 50 min
    var min
    var houre
    if(this.operationtimere2[0] == 0){
      if (this.operationtimere2[1] - this.breaktimere3 < 0){
        alert("Hello! I am an alert box!");
      }else{
        min = this.operationtimere2[1] - this.breaktimere3
      houre = this.operationtimere2[0] - this.breaktimere2[0]

      min = min.toString();
      if (min.length == 1) {
        min = "0" + min
        this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
        console.log(this.operationtimere3)
      } else {
        this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
        console.log(this.operationtimere3)
      }
  
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`issue_report` " +
        " SET  `BREAK_TIME` = '" + this.breaktimereport + "', `OPERATION_TIME` = '" + this.operationtimere3 + "' " +
        " WHERE (`ID_ISSUEREPORT` = '" + this.DataIssue[0].ID_ISSUEREPORT + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id='+this.DataRes[0].ID
      })

      }
    }else{
      if (this.operationtimere2[1] - this.breaktimere3 < 0) {
        min = this.breaktimere3 - this.operationtimere2[1]
        console.log(min)
        min = 60 - min
        houre = this.operationtimere2[0] - 1
        console.log(min)
        houre = this.operationtimere2[0] - this.breaktimere2[0]
        console.log(houre)
  
        min = min.toString();
        if (min.length == 1) {
          min = "0" + min
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        } else {
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        }
  
      } else {
        min = this.operationtimere2[1] - this.breaktimere3
        houre = this.operationtimere2[0] - this.breaktimere2[0]
  
        min = min.toString();
        if (min.length == 1) {
          min = "0" + min
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        } else {
          this.operationtimere3 = houre + ":" + min + ":" + this.operationtimere2[2]
          console.log(this.operationtimere3)
        }
      }
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`issue_report` " +
        " SET  `BREAK_TIME` = '" + this.breaktimereport + "', `OPERATION_TIME` = '" + this.operationtimere3 + "' " +
        " WHERE (`ID_ISSUEREPORT` = '" + this.DataIssue[0].ID_ISSUEREPORT + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id='+this.DataRes[0].ID
        location.reload();
      })
    }
 
  }

  starttime(id: any, Array: any) {
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `START_TIME` = '" + date2 + "' " +
      " WHERE (`ID_BOOKING` = '" + id + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidButton[Array] = false
      location.reload();
    })

  }
  starttimereport() {
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`issue_report` " +
      " SET  `START_TIME` = '" + date2 + "' " +
      " WHERE (`ID_ISSUEREPORT` = '" + this.DataIssue[0].ID_ISSUEREPORT + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidIssueRe = false
      location.reload();
    })

  }

  Endtime(id: any, Array: any) {

    console.log(this.DataResreq[0].START_TIME);
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `END_TIME` = '" + date2 + "' " +
      " WHERE (`ID_BOOKING` = '" + id + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidButton2[Array] = false
      location.reload();

    })
  }
  endtimereport(){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    // UPDATE `mtq10_project_tracking_analysis`.`issue_report` SET `END_TIME` = '' WHERE (`ID_ISSUEREPORT` = '1');
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`issue_report` " +
      " SET  `END_TIME` = '" + date2 + "' " +
      " WHERE (`ID_ISSUEREPORT` = '" + this.DataIssue[0].ID_ISSUEREPORT + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
  }
  finish(id: any, Array: any) {
    // start
    console.log(this.DataResreq[Array].START_TIME.split(" "))
    var timecalStart = this.DataResreq[Array].START_TIME.split(" ")

    if (timecalStart[2] == "PM") {
      const [hoursEND, minutesEND, secondsEND] = timecalStart[1].split(':');
      if(hoursEND == 12){
        hoursEND2 = 12
        timecalStart[1] = hoursEND2+":"+minutesEND+":"+secondsEND
        console.log(timecalStart[1])
      }else{
        console.log(this.dateto24(timecalStart[1]))
        timecalStart[1] = this.dateto24(timecalStart[1])
      }
    }
    timecalStart[0] = timecalStart[0].substring(0, timecalStart[0].length - 1);
   
    const [month, day, year] = timecalStart[0].split('/');
    const [hours, minutes, seconds] = timecalStart[1].split(':');

    const date3 = new Date(+year, +month, +day, +hours, +minutes, +seconds);
    console.log(date3); // 👉️ Fri Jun 24 2022 09:30:05

    // End
    console.log(this.DataResreq[Array].END_TIME.split(" "))
    var timecalEND = this.DataResreq[Array].END_TIME.split(" ")
    var hoursEND2
    if (timecalEND[2] == "PM") {
      const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');
      if(hoursEND == 12){
        hoursEND2 = 12
        timecalEND[1] = hoursEND2+":"+minutesEND+":"+secondsEND
        console.log(timecalEND[1])
      }else{
        console.log(this.dateto24(timecalEND[1]))
        timecalEND[1] = this.dateto24(timecalEND[1])
      }
    }
    timecalEND[0] = timecalEND[0].substring(0, timecalEND[0].length - 1);

    const [monthEND, dayEND, yearEND] = timecalEND[0].split('/');
    const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');

    const date4 = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
    console.log(date4); // 👉️ Fri Jun 24 2022 09:30:05
    // calculate
    var numDate = new Date(date4.getTime() - date3.getTime());
    console.log(numDate)
    // 3600000 ms
    this.operationtime = this.msToTime(numDate)
    console.log(this.operationtime)
    this.operationtime2 = this.operationtime.split(':');
    console.log(this.operationtime2[0])

    this.breaktime2 = this.breaktime[Array] / 60
    console.log(this.breaktime2)
    // 1.88
    this.breaktime2 = this.breaktime2.toString();
    this.breaktime2 = this.breaktime2.split('.');
    console.log(this.breaktime2[0])
    // 1 houre
    this.breaktime3 = this.breaktime[Array] % 60
    console.log(this.breaktime3)
    // 50 min
    var min
    var houre
    if(this.operationtime2[0] == 0){
      if (this.operationtime2[1] - this.breaktime3 < 0){
        alert("Hello! I am an alert box!");
      }else{
        min = this.operationtime2[1] - this.breaktime3
      houre = this.operationtime2[0] - this.breaktime2[0]

      min = min.toString();
      if (min.length == 1) {
        min = "0" + min
        this.operationtime3 = houre + ":" + min + ":" + this.operationtime2[2]
        console.log(this.operationtime3)
      } else {
        this.operationtime3 = houre + ":" + min + ":" + this.operationtime2[2]
        console.log(this.operationtime3)
      }
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
        " SET  `BREAK_TIME` = '" + this.breaktime[Array] + "', `OPERATION_TIME` = '" + this.operationtime3 + "' " +
        " WHERE (`ID_BOOKING` = '" + id + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        this.isValidButton3[Array] = false
        location.reload();
      })

      }
    }else{
      if (this.operationtime2[1] - this.breaktime3 < 0) {
        min = this.breaktime3 - this.operationtime2[1]
        console.log(min)
        min = 60 - min
        houre = this.operationtime2[0] - 1
        console.log(min)
        houre = houre - this.breaktime2[0]
        console.log(houre)
  
        min = min.toString();
        if (min.length == 1) {
          min = "0" + min
          this.operationtime3 = houre + ":" + min + ":" + this.operationtime2[2]
          console.log(this.operationtime3)
        } else {
          this.operationtime3 = houre + ":" + min + ":" + this.operationtime2[2]
          console.log(this.operationtime3)
        }
  
      } else {
        min = this.operationtime2[1] - this.breaktime3
        houre = this.operationtime2[0] - this.breaktime2[0]
  
        min = min.toString();
        if (min.length == 1) {
          min = "0" + min
          this.operationtime3 = houre + ":" + min + ":" + this.operationtime2[2]
          console.log(this.operationtime3)
        } else {
          this.operationtime3 = houre + ":" + min + ":" + this.operationtime2[2]
          console.log(this.operationtime3)
        }
      }
      var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `BREAK_TIME` = '" + this.breaktime[Array] + "', `OPERATION_TIME` = '" + this.operationtime3 + "' " +
      " WHERE (`ID_BOOKING` = '" + id + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValidButton3[Array] = false
      location.reload();
    })
    }
  }
  msToTime(s: any) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }

  dateto24(time1: any) {
    var time2 = time1.split(":")
    var time3 = parseInt(time2[0]) + 12
    console.log(time3)
    return (time3 + ":" + time2[1] + ":" + time2[2])
  }

  FacDetail() {
    this.productService.changeMessage(this.DataRes[0].ID)
    const dialogRef = this.matDialog.open(FactoryApproveComponent, {
      disableClose: true,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  // edittime(ID: any) {
  //   this.productService.changeMessage(ID)

  //   const dialogRef = this.matDialog.open(EditOperationtimeComponent, {
  //     disableClose: true,
  //     width: '700px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);

  //   });
  // }
  addtime(ID: any){
      if (this.namelocal != null) {
        this.productService.changeMessage(ID)
        const dialogRef = this.matDialog.open(AddOperationtimeComponent, {
          disableClose: true,
          width: '700px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
  
        });
      } else (
        window.alert("Please login")
      )
    }
    addtimere(ID: any){
      if (this.namelocal != null) {
        this.productService.changeMessage(ID)
        const dialogRef = this.matDialog.open(AddReporttimeComponent, {
          disableClose: true,
          width: '700px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
    
        });
      } else (
        window.alert("Please login")
      )
    }
}

