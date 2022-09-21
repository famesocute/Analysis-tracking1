import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-dailyjob',
  templateUrl: './dailyjob.component.html',
  styleUrls: ['./dailyjob.component.scss']
})
export class DailyjobComponent implements OnInit {
  Datechoose = ""
  DatechooseZ = ""
  DataEquip: any
  Datajob: any
  DataResAllocation: any
  DataResbooking: any
  DataResbookingreq: any

  Allocation: any
  timeofstep: any
  time1: any

  jobtoday: any
  timesum = 0
  start = ""

  forfinish2 = false
  jobtodaychk = false

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.TRACKING_ANALYSIS_SELECT_ALLOCATION_ALL().subscribe((data: {}) => {
      console.log(data);
      this.DataResAllocation = data
    })
    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
      console.log(data);
      this.DataResbooking = data
    })

  }
  onChangedate() {
    this.Datechoose = this.Datechoose.toLocaleString()
    console.log(this.Datechoose)

    var Datechoose2 = this.Datechoose.split(",")
    var Datechoose3 = Datechoose2[0].split("/")
    console.log(Datechoose3)
    var sumDatechoose
    if (Datechoose3[0].length <= 1) {
      sumDatechoose = Datechoose3[2] + "-0" + Datechoose3[0]
    }
    else {
      sumDatechoose = Datechoose3[2] + "-" + Datechoose3[0]
    }
    if (Datechoose3[1].length <= 1) {
      sumDatechoose = sumDatechoose + "-0" + Datechoose3[1]
    }
    else {
      sumDatechoose = sumDatechoose + "-" + Datechoose3[1]
    }
    console.log(sumDatechoose)

    this.productService.TRACKING_ANALYSIS_SELECT_EQUIP_JOBDUTY(sumDatechoose).subscribe((data: {}) => {
      this.DataEquip = data
      console.log(this.DataEquip);
    })
  }
  onChangedate2() {
    this.DatechooseZ = this.DatechooseZ.toLocaleString()
    console.log(this.DatechooseZ)
    var Datechoose2 = this.DatechooseZ.split(",")
    console.log(Datechoose2[0])
    var chkfinish = false
    this.productService.TRACKING_ANALYSIS_SELECT_JOB_JOBDUTY(Datechoose2[0]).subscribe((data: {}) => {
      this.Datajob = data
      console.log(this.Datajob);
      this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
      this.DataResbookingreq = data
      console.log(data);
      var name
      

      var x: any
      var y
      var z
      this.jobtoday = "["
      var forfinish = false

      for (x in this.Datajob) {
        const result = this.DataResbookingreq.filter((a: { REQ_NUM: string; }) => a.REQ_NUM === this.Datajob[x].REQ_NUM);
        console.log(result)

        this.time1 = this.Datajob[x].ESTI_TECHNIQUE.split("[]")

        var timeofstep3 = 0

        for (y in this.time1) {
          var a = this.time1[y].split("||")

          console.log(this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0]));
          this.Allocation = this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0])

          this.timeofstep = this.Allocation.TIME_PER_PIECE * a[1]
          timeofstep3 = timeofstep3 + this.timeofstep
          console.log(timeofstep3)
          forfinish = true
        }
        // this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(this.Datajob[x].REQ_NUM).subscribe((data: {}) => {
        //   console.log(data);
        //   this.DataResbookingreq = data

          var hourschange
          var secchange
          var lasttime = 0
          var lasttime2 = 0

          for (z in result) {
            console.log(result[z].OPERATION_TIME)
            var timez = result[z].OPERATION_TIME.split(":")
            console.log(timez)
            if (result[z].OPERATION_TIME != 0) {
              
              console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
              lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
              lasttime2 = lasttime/60
              // const [hours, minutes, seconds] = this.DataResbookingreq[z].OPERATION_TIME.split(':');
              // console.log(hours)
              // console.log(minutes)
              // console.log(seconds)
              // var minutes2 = parseInt(minutes)

              // hourschange = hours * 60
              // secchange = seconds / 60
              // console.log(hourschange)
              // console.log(secchange)

              // this.timesum = this.timesum + hourschange + secchange + minutes2
              // console.log(this.timesum)
            }
            if (this.DataResbookingreq[0].START_TIME != null) {
              this.start = this.DataResbookingreq[0].START_TIME
              console.log(this.start)
            }
          }
          console.log(lasttime2)
          this.timesum = lasttime2
          lasttime2 = 0
          console.log(this.timesum )
        // })
        console.log(this.Datajob.length, parseInt(x) + 1)
        if(this.Datajob.length == parseInt(x)+1){
          forfinish = true
        }
        // var timesum2 = this.timesum
        // console.log(timesum2)
        // console.log("timesum2")
            var theme = this.Datajob[x].TITLE.substring(0, 70)
            console.log("timesum2xxxxxx")
            var current
            if (this.Datajob[x].STATUS_JOB == 5) {
              current = 'Analysing'
            } else if (this.Datajob[x].STATUS_JOB == 6 || this.Datajob[x].STATUS_JOB == 7 || this.Datajob[x].STATUS_JOB == 8) {
              current = 'Approve report'
            } else if (this.Datajob[x].STATUS_JOB == 9) {
              current = 'CS'
            } else if (this.Datajob[x].STATUS_JOB == 10) {
              current = 'complete'
            } else if (this.Datajob[x].STATUS_JOB == 1 || this.Datajob[x].STATUS_JOB == 2 || this.Datajob[x].STATUS_JOB == 3 || this.Datajob[x].STATUS_JOB == 4) {
              current = 'pending'
            }

            var Datesubmit
            if (this.Datajob[x].STATUS_JOB == 6) {
              Datesubmit = this.Datajob[x].REVI_REAPPROV_CHECK_TIME
            } else if (this.Datajob[x].STATUS_JOB == 7) {
              Datesubmit = this.Datajob[x].REVI_REAPPROV_CONFIRM_TIME
            } else if (this.Datajob[x].STATUS_JOB == 8) {
              Datesubmit = this.Datajob[x].REVI_REAPPROV_APPROV_TIME
            } else if (this.Datajob[x].STATUS_JOB == 9 || this.Datajob[x].STATUS_JOB == 10 || this.Datajob[x].STATUS_JOB == 11) {
              if (this.Datajob[x].REVI_REAPPROV_APPROV_TIME != null) {
                Datesubmit = this.Datajob[x].REVI_REAPPROV_APPROV_TIME
              } else if (this.Datajob[x].REVI_REAPPROV_CONFIRM_TIME != null) {
                Datesubmit = this.Datajob[x].REVI_REAPPROV_CONFIRM_TIME
              } else if (this.Datajob[x].REVI_REAPPROV_CHECK_TIME != null) {
                Datesubmit = this.Datajob[x].REVI_REAPPROV_CHECK_TIME
              }
            } else {
              Datesubmit = ""
            }
            this.jobtoday = this.jobtoday + '{"receiveddate":"' + this.Datajob[x].DATE_RECEIVE_SAM_REAL + '",'
            this.jobtoday = this.jobtoday + '"priority":"' + this.Datajob[x].PIORITY + '",'
            this.jobtoday = this.jobtoday + '"type":"' + this.Datajob[x].ANA_TYPE + '' + this.Datajob[x].ANA_TYPE2 + '",'
            this.jobtoday = this.jobtoday + '"department":"' + this.Datajob[x].DEP_MENT + '",'
            this.jobtoday = this.jobtoday + '"product":"' + this.Datajob[x].PRODUCT + '",'
            this.jobtoday = this.jobtoday + '"theme":"' + theme + '",'
            this.jobtoday = this.jobtoday + '"due":"' + this.Datajob[x].FINISH_DATE + '",'
            this.jobtoday = this.jobtoday + '"pic":"' + this.Datajob[x].REVI_ANASEC_ANAL + '",'
            this.jobtoday = this.jobtoday + '"numsam":"' + this.Datajob[x].NUM_SAMPLE + '",'
            this.jobtoday = this.jobtoday + '"standardtime":"' + timeofstep3 + '",'
            this.jobtoday = this.jobtoday + '"real":"' + this.timesum.toFixed(2) + '",'
            this.jobtoday = this.jobtoday + '"Currentstatus":"' + current + '",'
            this.jobtoday = this.jobtoday + '"Approver":"' + this.Datajob[x].STETUS_PERSON + '",'
            this.jobtoday = this.jobtoday + '"submitreport":"' + this.Datajob[x].REVI_ANASEC_ANAL_TIME + '",'
            this.jobtoday = this.jobtoday + '"approvereport":"' + Datesubmit + '",'
            this.jobtoday = this.jobtoday + '"holiday":"' + this.Datajob[x].HOLIDAY + '"},'
      }
      this.jobtoday = this.jobtoday.substring(0, this.jobtoday.length - 1);
      this.jobtoday = this.jobtoday + "]";
      console.log(this.jobtoday)
      if (this.jobtoday != "]") {
        var obj = JSON.parse(this.jobtoday);
        this.jobtoday = obj
        console.log(this.jobtoday)
      }
      else {
        this.jobtoday = []
      }





      })
    })
  }
  sumtime(timelast : any,time1 : any,time2 : any,time3 : any){

    time1 = time1 * 3600
    time2 = time2 * 60
    timelast = parseInt(timelast) + parseInt(time1) + parseInt(time2) + parseInt(time3)

    return(timelast)
  }
}
