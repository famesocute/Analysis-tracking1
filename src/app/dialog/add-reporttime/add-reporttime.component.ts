import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-add-reporttime',
  templateUrl: './add-reporttime.component.html',
  styleUrls: ['./add-reporttime.component.scss']
})
export class AddReporttimeComponent implements OnInit {
  namelocal: any
  Codelocal: any
  departmentlocal: any

  message : any
  DataResreq : any

  startdate = ""
  startT1 = ""
  startT2 = ""
  startT3 = "00"
  enddate = ""
  endT1 = ""
  endT2 = ""
  endT3 = "00"
  type = ""
  type2 = ""
  breaktime : any
  breaktime2: any
  breaktime3: any
  breaktimere2 : any
  breaktimere3 : any

  operationtime2: any
  operationtime3: any
  operationtimere2: any
  operationtimere3: any

  operationtime = ""

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    // this.productService.TRACKING_ANALYSIS_SELECT_TIMEISSUE_REPORT_BYREQ(this.message).subscribe((data: {}) => {
    //   console.log(data);
    //   this.DataResreq = data

    // })
  }
  save(){
    if(this.startdate != "" && this.startT1 != "" && this.startT2 != "" && this.startT3 != "" && this.enddate != "" && this.endT1 != "" && this.endT2 != "" && this.endT3 != "" && this.breaktime != null && this.breaktime != ""  ){
    
        console.log(this.startdate.toLocaleString())
        // 8/5/2022, 12:00:00 AM
        console.log(this.startT1)
        console.log(this.startT2)
        console.log(this.enddate.toLocaleString())
        console.log(this.endT1)
        console.log(this.endT2)
        console.log(this.breaktime)
    // starttime
        var Datestartinput = this.startdate.toLocaleString()
        var Datestartinput2 = Datestartinput.split(' ')
        console.log(Datestartinput2[0])
        // 8/5/2022,
    
        var Timestartinput = this.startT1+":"+this.startT2+":"+this.startT3
        console.log(Timestartinput)
          // 01:10:10
    
        var DatePMS
        var updateS
        if(this.startT1 == "13" || this.startT1 == "14" ||this.startT1 == "15" || this.startT1 == "16" ||this.startT1 == "17" ||this.startT1 == "18" ||this.startT1 == "19" ||this.startT1 == "20" ||this.startT1 == "21" ||this.startT1 == "22" ||this.startT1 == "23" ||this.startT1 == "24"){
          DatePMS = parseInt(this.startT1) - 12
          updateS = DatePMS.toString()+":"+this.startT2+":"+this.startT3+" PM"
        }else{
          DatePMS = this.startT1
          updateS = DatePMS.toString()+":"+this.startT2+":"+this.startT3+" AM"
        }
        var mixstart = Datestartinput2[0]+" "+updateS
        console.log(mixstart)
    
        var Datestartinput3 = Datestartinput2[0].substring(0, Datestartinput2[0].length - 1);
       
        const [month, day, year] = Datestartinput3.split('/');
        const [hours, minutes, seconds] = Timestartinput.split(':');
    
        const datestar = new Date(+year, +month, +day, +hours, +minutes, +seconds);
        console.log(datestar); // 👉️ Fri Jun 24 2022 09:30:05
    
     // endtime
        var Dateendinput = this.enddate.toLocaleString()
        var Dateendinput2 = Dateendinput.split(' ')
        console.log(Dateendinput2[0])
        // 8/5/2022,
    
        var Timeendinput = this.endT1+":"+this.endT2+":"+this.endT3
        console.log(Timeendinput)
          // 01:10:10
    
          var DatePME
          var updateE
          if(this.endT1 == "13" || this.endT1 == "14" ||this.endT1 == "15" || this.endT1 == "16" ||this.endT1 == "17" ||this.endT1 == "18" ||this.endT1 == "19" ||this.endT1 == "20" ||this.endT1 == "21" ||this.endT1 == "22" ||this.endT1 == "23" ||this.endT1 == "24"){
            DatePME = parseInt(this.endT1) - 12
            updateE = DatePME.toString()+":"+this.endT2+":"+this.endT3+" PM"
          }else{
            DatePME = this.endT1
            updateE = DatePME.toString()+":"+this.endT2+":"+this.endT3+" AM"
          }
          var mixend = Dateendinput2[0]+" "+updateE
          console.log(mixend)
    
          var Dateendinput3 = Dateendinput2[0].substring(0, Dateendinput2[0].length - 1);
      
          const [monthEND, dayEND, yearEND] = Dateendinput3.split('/');
          const [hoursEND, minutesEND, secondsEND] = Timeendinput.split(':');
      
          const dateend = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
          console.log(dateend); // 👉️ Fri Jun 24 2022 09:30:05
    
        // calculate
        var numDate = new Date(dateend.getTime() - datestar.getTime());
        console.log(numDate)
    
        this.operationtime = this.msToTime(numDate)
        console.log(this.operationtime)
    
        this.operationtime2 = this.operationtime.split(':');
        console.log(this.operationtime2[0])
    
        this.breaktime2 = this.breaktime / 60
        console.log(this.breaktime2)
        // 1.88
        this.breaktime2 = this.breaktime2.toString();
        this.breaktime2 = this.breaktime2.split('.');
        console.log(this.breaktime2[0])
        // 1 houre
        this.breaktime3 = this.breaktime % 60
        console.log(this.breaktime3)
        // 50 min
        var min
        var houre
        if(this.operationtime2[0] == 0){
          if (this.operationtime2[1] - this.breaktime3 < 0){
            alert("ใส่เวลาbreak time ผิด");
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
            " SET  `BREAK_TIME` = '" + this.breaktime + "',`START_TIME` = '" + mixstart + "', `END_TIME` = '" + mixend + "',`OPERATION_TIME` = '" + this.operationtime3 + "' " +
            " WHERE (`ID_BOOKING` = '" + this.message + "')  ; "
          console.log(qtest);
          this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
            console.log(data);
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
        qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`issue_report` (`REQ_NUM`, `START_TIME`, `END_TIME`, `BREAK_TIME`, `OPERATION_TIME`) VALUES ('" + this.message + "', '" + mixstart + "', '" + mixend + "', '" + this.breaktime + "', '" + this.operationtime3 + "');"

        console.log(qtest);
        this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
          console.log(data);
          location.reload();
        })
        }
      }else{
        alert("Plaese fill all data.")
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
}
