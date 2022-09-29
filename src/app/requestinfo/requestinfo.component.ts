import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';
import { EditinfoComponent } from '../dialog/editinfo/editinfo.component'
import { InfoEditstepComponent } from '../dialog/info-editstep/info-editstep.component';
import { InfoComponent } from '../dialog/edit_reviewer/info/info.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requestinfo',
  templateUrl: './requestinfo.component.html',
  styleUrls: ['./requestinfo.component.scss']
})
export class RequestinfoComponent implements OnInit {
  table: any
  confirmcc = ""
  controlcc = ""

  ComControl = ""
  ccControl1 = ""
  ccControl2 = ""
  Analyzer = ""
  DataRes: any

  message = ""
  finish = ""

  sample1: any
  sample2: any

  DataResQUESTION: any

  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControl4 = new FormControl();
  myControl5 = new FormControl();
  myControl6 = new FormControl();
  myControl7 = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;
  filteredOptions3!: Observable<string[]>;
  filteredOptions4!: Observable<string[]>;

  EMAIL_CC: string[] = [];
  Allocate: string[] = [];

  isValid = false
  Sumresult = true

  loading = true
  userType: any

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  issuercc = ""
  Analycc = ""
  ComAnalyzer = ""
  Check = ""
  ComChack = ""
  chackcc = ""
  Confirm = ""
  comConfirm = ""
  approval = ""
  comapproval = ""
  approvalcc = ""
  summarydetail = ""
  finishDate = ""
  startDate = ""
  Totalcostfinish = 0
  datereceivesam = ""

  isValid1 = false
  isValid2 = false
  isValid3 = false
  isValid4 = false
  isValid5 = false
  isValid6 = false
  validprivate = false
  open = false

  sam1: any
  sam2: any
  time1: any
  time2: any
  time3: any
  time4: any
  timefinish2: any

  score1 = ""
  score2 = ""
  score3 = ""
  score4 = ""
  score5 = ""
  totallscore = 0
  totallscore2 = 0

  reason1: any
  reason2: any
  reason3: any
  reason4: any
  reason5: any

  check1 = true
  check2 = true
  check3 = true
  check4 = true
  check5 = true

  outputCS1: any
  outputCS2: any

  totalhr: any
  Totalcost = 0
  timeofstep: any

  timesum = 0

  DataResAllocation: any
  Allocation: any
  Allocation2: any
  DataResbooking: any

  csvalid = true
  Statusrevise = ""

  dataUpload: any
  dataUploadSETdata: any
  DataResFlie: any

  Interim: any = "["
  Fill_inital: any = "["
  Report: any = "["
  Summary: any = "["

  section = "Fill_inital"
  section1 = "Interim"
  section2 = "Report"
  section3 = "Summary"

  Reportchk = false
  Fill_initalchk = false
  Interimchk = false
  Summarychk = false

  countx = 0

  constructor(public router: Router, public productService: ProductService, private matDialog: MatDialog, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.EMAIL_CC[0] = ""
    console.log(this.EMAIL_CC);

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data


      if (this.DataRes[0].STATUS_JOB == 5 || this.DataRes[0].STATUS_JOB == 6 || this.DataRes[0].STATUS_JOB == 7 || this.DataRes[0].STATUS_JOB == 8 || this.DataRes[0].STATUS_JOB == 9 || this.DataRes[0].STATUS_JOB == 10) {
        this.open = true
      } else {
        window.location.href = 'http://163.50.57.95:82/Tracking_Analysis/AnahomeNotcom'
      }

      if (this.DataRes[0].STATUS_JOB == 9) {
        this.validprivate = true
      }

      this.productService.TRACKING_ANALYSIS_SELECT_UPLOAD_LIST_BY_REQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(this.DataRes[0].REQ_NUM)
        console.log(data);
        this.dataUpload = data
        console.log(this.dataUpload);
        var i
        var newdata = "["
        for (i in this.dataUpload) {
          newdata = newdata + '{"SEQ_CONTENT":"' + (parseInt(i) + 1) + '",'
          if ((this.dataUpload[i].FILENAME).substring(this.dataUpload[i].FILENAME.length - 3) == "PNG" || (this.dataUpload[i].FILENAME).substring(this.dataUpload[i].FILENAME.length - 3) == "png") {
            newdata = newdata + '"PROCESS_NAME":"",'
          }
          else {
            newdata = newdata + '"PROCESS_NAME":"' + this.dataUpload[i].FILENAME + '",'
          }
          console.log((this.dataUpload[i].FILENAME).substring(this.dataUpload[i].FILENAME.length - 3))
          newdata = newdata + '"LINK":"http://163.50.57.95:84/' + this.dataUpload[i].LINK + '"},'
        }
        newdata = newdata.substring(0, newdata.length - 1);
        newdata = newdata + "]";
        console.log(newdata)
        if(newdata != "]" ){
        var obj = JSON.parse(newdata);

        console.log(obj)

        this.dataUploadSETdata = obj
      }
      })
      this.productService.TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResFlie = data
        var x
        for (x in this.DataResFlie) {


          if (this.DataResFlie[x].SECTION == "Interim") {

            // this.Interim = this.Interim + '"FILENAME":"' + this.DataResFlie[x].FILENAME + '"},'

            if ((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg") {
              this.Interim = this.Interim + '{"FILENAME":"",'
            }
            else {
              this.Interim = this.Interim + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Interim = this.Interim + '"idupload_list":"' + this.DataResFlie[x].idupload_list + '",'
            this.Interim = this.Interim + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'

          } else if (this.DataResFlie[x].SECTION == "Fill_inital") {

            if ((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg") {
              this.Fill_inital = this.Fill_inital + '{"FILENAME":"",'
            }
            else {
              this.Fill_inital = this.Fill_inital + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Fill_inital = this.Fill_inital + '"idupload_list":"' + this.DataResFlie[x].idupload_list + '",'
            this.Fill_inital = this.Fill_inital + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'
          } else if (this.DataResFlie[x].SECTION == "Report") {

            if ((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg") {
              this.Report = this.Report + '{"FILENAME":"",'
            }
            else {
              this.Report = this.Report + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Report = this.Report + '"idupload_list":"' + this.DataResFlie[x].idupload_list + '",'
            this.Report = this.Report + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'

          } else if (this.DataResFlie[x].SECTION == "Summary") {

            if ((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg") {
              this.Summary = this.Summary + '{"FILENAME":"",'
            }
            else {
              this.Summary = this.Summary + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Summary = this.Summary + '"idupload_list":"' + this.DataResFlie[x].idupload_list + '",'
            this.Summary = this.Summary + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'
          }
        }
        if (this.Interim.length != 1) {
          this.Interim = this.Interim.substring(0, this.Interim.length - 1);
          this.Interim = this.Interim + "]";
          console.log(this.Interim)
          if (this.Interim != "]") {
            var obj = JSON.parse(this.Interim);
            console.log(obj)
            this.Interim = obj
            if (this.Interim != "]") {
              this.Interimchk = true
            }
          }

        }
        if (this.Fill_inital.length != 1) {
          this.Fill_inital = this.Fill_inital.substring(0, this.Fill_inital.length - 1);
          this.Fill_inital = this.Fill_inital + "]";
          console.log(this.Fill_inital)

          if (this.Fill_inital != "]") {
            var obj = JSON.parse(this.Fill_inital);
            console.log(obj)
            this.Fill_inital = obj

            if (this.Fill_inital != "]") {
              this.Fill_initalchk = true
            }
          }
        }
        if (this.Report.length != 1) {
          this.Report = this.Report.substring(0, this.Report.length - 1);
          this.Report = this.Report + "]";
          console.log(this.Report)
          if (this.Report != "]") {
            var obj = JSON.parse(this.Report);
            console.log(obj)
            this.Report = obj
            if (this.Report != "]") {
              this.Reportchk = true
            }
          }
        }
        if (this.Summary.length != 1) {
          this.Summary = this.Summary.substring(0, this.Summary.length - 1);
          this.Summary = this.Summary + "]";
          console.log(this.Summary)
          if (this.Summary != "]") {
            var obj = JSON.parse(this.Summary);
            console.log(obj)
            this.Summary = obj
            if (this.Summary != "]") {
              this.Summarychk = true
            }
          }
        }

      })

      if (this.DataRes[0].REVI_ANASEC_CONTROL_COM != null) {
        this.ComControl = this.DataRes[0].REVI_ANASEC_CONTROL_COM
      }

      if (this.DataRes[0].DATE_RECEIVE_SAM_REAL != null) {
        this.datereceivesam = this.DataRes[0].DATE_RECEIVE_SAM_REAL
      }

      this.Analyzer = this.DataRes[0].REVI_ANASEC_ANAL


      this.issuercc = this.DataRes[0].REVI_PAND_ISSUE_CC.split(",");
      // this.Analycc = this.DataRes[0].REVI_ANASEC_ANAL_CC.split(",");

      if (this.DataRes[0].REVI_ANASEC_ANAL_CC != null) {
        this.confirmcc = this.DataRes[0].REVI_ANASEC_ANAL_CC.split(",");
      }
      if (this.DataRes[0].REVI_REAPPROV_APPROV_CC != null) {
        this.approvalcc = this.DataRes[0].REVI_REAPPROV_APPROV_CC.split(",");
      }
      if (this.DataRes[0].REVI_REAPPROV_CHECK_CC != null) {
        this.chackcc = this.DataRes[0].REVI_REAPPROV_CHECK_CC.split(",");
      }
      if (this.DataRes[0].REVI_ANASEC_CONTROL_CC1 != null) {
        this.controlcc = this.DataRes[0].REVI_ANASEC_CONTROL_CC1.split(",");
      }

      this.summarydetail = this.DataRes[0].SUMMARY_DETAIL
      this.Check = this.DataRes[0].REVI_REAPPROV_CHECK
      this.Confirm = this.DataRes[0].REVI_REAPPROV_CONFIRM
      this.approval = this.DataRes[0].REVI_REAPPROV_APPROV

      if (this.DataRes[0].REVISE_STATUS == 1) {
        this.Statusrevise = "Revising!"
        console.log(this.Statusrevise)
      }

      if (this.DataRes[0].STATUS_JOB != 5) {
        this.Sumresult = false
        console.log("hii")
        if (this.DataRes[0].STATUS_JOB == 6) {
          if (this.DataRes[0].REVI_REAPPROV_CHECK == null || this.DataRes[0].REVI_REAPPROV_CHECK == "") {
            this.isValid2 = false
            this.NoCheckerApprov()
            console.log("hii4")
          } else {
            this.isValid2 = true
            console.log("hii5")
          }
        }
        else if (this.DataRes[0].STATUS_JOB == 7) {
          if (this.DataRes[0].REVI_REAPPROV_CONFIRM == null || this.DataRes[0].REVI_REAPPROV_CONFIRM == "") {
            this.isValid3 = false
            this.NoConfirmApprov()
          } else {
            this.isValid3 = true
          }
        }
        else if (this.DataRes[0].STATUS_JOB == 8) {
          if (this.DataRes[0].REVI_REAPPROV_APPROV == null || this.DataRes[0].REVI_REAPPROV_APPROV == "") {
            this.isValid4 = false
            this.NoApproverApprov()
          } else {
            this.isValid4 = true
          }
        }
        else if (this.DataRes[0].STATUS_JOB == 9) {
          this.isValid5 = true
          console.log("hii3")
        }
        else if (this.DataRes[0].STATUS_JOB == 10) {
          this.isValid6 = true
          this.csvalid = false
        }

      } else {
        this.isValid1 = true
        this.Sumresult = true
        console.log("hii1")
      }

      if (this.DataRes[0].CS_SCORE != null) {
        this.outputCS1 = this.DataRes[0].CS_SCORE.split("[]")
        console.log(this.outputCS1)
        var x
        var a


        this.outputCS2 = "["

        for (x in this.outputCS1) {
          var numfive = 5
          
          a = this.outputCS1[x].split("||")
          this.outputCS2 = this.outputCS2 + '{"score":"' + a[0] + '",'
          this.outputCS2 = this.outputCS2 + '"reason":"' + a[1] + '"},'

          this.totallscore = (parseInt(a[0]) + this.totallscore)
          this.totallscore2 = this.totallscore / 5
          console.log(this.totallscore2)

        }
        this.outputCS2 = this.outputCS2.substring(0, this.outputCS2.length - 1);
        this.outputCS2 = this.outputCS2 + "]";
        console.log(this.outputCS2)

        var obj = JSON.parse(this.outputCS2);
        this.outputCS2 = obj
        console.log(this.outputCS2)

        
     
      }


      this.sample1 = this.DataRes[0].SAM_NAME.split("[]")
      console.log(this.sample1)
      var x
      var a

      this.sample2 = "["

      for (x in this.sample1) {
        a = this.sample1[x].split("||")
        this.sample2 = this.sample2 + '{"Lot_no":"' + a[0] + '",'
        this.sample2 = this.sample2 + '"Sample_name":"' + a[1] + '",'
        this.sample2 = this.sample2 + '"Remarks":"' + a[2] + '"},'

      }
      this.sample2 = this.sample2.substring(0, this.sample2.length - 1);
      this.sample2 = this.sample2 + "]";
      console.log(this.sample2)

      var obj = JSON.parse(this.sample2);
      this.sample2 = obj
      console.log(this.sample2)

      this.productService.TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResQUESTION = data
        console.log(this.DataResQUESTION)
        this.loading = false
      })
      this.productService.TRACKING_ANALYSIS_SELECT_ALLOCATION_ALL().subscribe((data: {}) => {
        console.log(data);
        this.DataResAllocation = data
        console.log(this.DataResAllocation)


        this.sam1 = this.DataRes[0].PRE_ESTI_TECHNIQUE.split("[]")
        console.log(this.sam1)

        var x: any
        var y: any
        var a: any
        var Operation_Charge: any
        var Estimate_Cost: any
        this.sam2 = "["

        console.log(this.DataRes[0].DEP_MENT.substring(3));

        for (x in this.sam1) {
          a = this.sam1[x].split("||")

          console.log(this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0]));
          this.Allocation = this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0])

          for (y in this.DataResAllocation) {

            if (a[0] == this.DataResAllocation[y].EQUIPMENT) {

              if (this.DataRes[0].DEP_MENT.substring(3) == "A0") {
                Operation_Charge = ((a[1] * this.DataResAllocation[y].TIME_PER_PIECE) / 60) * this.DataResAllocation[y].MTXA0
              }
              else {
                Operation_Charge = ((a[1] * this.DataResAllocation[y].TIME_PER_PIECE) / 60) * this.DataResAllocation[y].MTX00
              }
            }

          }
          // Estimate_Cost = parseFloat(Operation_Charge) + parseFloat(this.Allocation.BASIC_CHARGE)
          // console.log(Estimate_Cost)
          // this.Totalcost = this.Totalcost + Estimate_Cost
          // console.log(this.Totalcost)

          this.Allocate[x] = a[0]

            x =  parseInt(x)+1
            this.sam2 = this.sam2 + '{"step":"' + x+ '",'
            this.sam2 = this.sam2 + '"equip":"' + a[0] + '",'
            this.sam2 = this.sam2 + '"quantity":"' + a[1] + '",'
            this.sam2 = this.sam2 + '"basiccharge":"' + this.Allocation.BASIC_CHARGE + '",'
            this.sam2 = this.sam2 + '"operationcharge":"' + Operation_Charge.toFixed(2) + '",'
            this.sam2 = this.sam2 + '"count":"",'
            this.sam2 = this.sam2 + '"estimatecost":0},'
            
          }
    
          this.sam2 = this.sam2.substring(0, this.sam2.length - 1);
          this.sam2 = this.sam2 + "]";
          console.log(this.sam2)
          var obj = JSON.parse(this.sam2);
          this.sam2 = obj
          console.log(this.Allocate)
          console.log(this.sam2)
          var Y
          var Z
          var count = 0
          for (Y in this.Allocate){
            for (Z in this.sam2){
              if((this.sam2[Z].equip).substring(0,2) == this.Allocate[Y].substring(0,2)){
                count = count + 1
                this.sam2[Z].count = count
              }
            }
            console.log(count)
            count = 0
          }
          var Y
          for (Y in this.sam2){
            if(this.sam2[Y].count >= 2){
              this.sam2[Y].basiccharge = 0
            }
          }
        
          for (Y in this.sam2){
            this.sam2[Y].estimatecost = parseFloat(this.sam2[Y].basiccharge) + parseFloat(this.sam2[Y].operationcharge)
            this.Totalcost =  this.Totalcost  +  this.sam2[Y].estimatecost
          }
          console.log(this.sam2)

      

        this.time1 = this.DataRes[0].ESTI_TECHNIQUE.split("[]")
        console.log(this.time1)

        this.time2 = "["
        for (x in this.time1) {

          a = this.time1[x].split("||")

          console.log(this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0]));
          this.Allocation = this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0])

          x = parseInt(x) + 1
          this.timeofstep = this.Allocation.TIME_PER_PIECE * a[1]
          console.log(this.timeofstep)
          this.time2 = this.time2 + '{"step":"' + x + '",'
          this.time2 = this.time2 + '"equip":"' + a[0] + '",'
          this.time2 = this.time2 + '"quantity":"' + a[1] + '",'
          this.time2 = this.time2 + '"timeperpicec":"' + this.Allocation.TIME_PER_PIECE + '",'
          this.time2 = this.time2 + '"standardtime":"' + this.timeofstep + '",'
          this.time2 = this.time2 + '"statusstep":"' + a[2] + '"},'

        }
        this.time3 = this.time2.substring(0, this.time2.length - 1);
        this.time4 = this.time3 + "]";
        console.log(this.time4)
        var obj = JSON.parse(this.time4);
        this.time4 = obj
        console.log(this.time4)

        this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
          console.log(data);
          this.DataResbooking = data
          console.log(this.DataResbooking)

          var z
          var hourschange
          var secchange
          var real_Cost

          this.timefinish2 = "["
          for (x in this.DataResbooking) {

            console.log(this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === this.DataResbooking[x].EQUIPMENT));
            this.Allocation2 = this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === this.DataResbooking[x].EQUIPMENT)

            const [hours, minutes, seconds] = this.DataResbooking[x].OPERATION_TIME.split(':');
            console.log(hours)
            console.log(minutes)
            console.log(seconds)
            var minutes2 = parseInt(minutes)

            hourschange = hours * 60
            secchange = seconds / 60
            console.log(hourschange)
            console.log(secchange)

            this.timesum = hourschange + secchange + minutes2
            console.log(this.timesum)

            for (z in this.DataResAllocation) {

              if (this.DataResbooking[x].EQUIPMENT == this.DataResAllocation[z].EQUIPMENT) {

                if (this.DataRes[0].DEP_MENT.substring(3) == "A0") {
                  Operation_Charge = (this.timesum / 60) * this.DataResAllocation[z].MTXA0
                }
                else {
                  Operation_Charge = (this.timesum / 60) * this.DataResAllocation[z].MTX00
                }
              }
            }
            console.log(Operation_Charge)
            real_Cost = parseFloat(Operation_Charge) + parseFloat(this.Allocation2.BASIC_CHARGE)
            console.log(real_Cost)
            // var real_cost2 = real_Cost.toFixed(2)

            // var real_cost3

            // if (real_cost2 != 'NaN') {
            //   this.Totalcostfinish = this.Totalcostfinish + parseInt(real_cost2)
            //   console.log(this.Totalcostfinish)
            //   real_cost3 = real_cost2
            // } else {
            //   real_cost3 = "0"
            // }

            this.timefinish2 = this.timefinish2 + '{"step":"' + this.DataResbooking[x].STEP_BOOKING + '",'
            this.timefinish2 = this.timefinish2 + '"equip":"' + this.DataResbooking[x].EQUIPMENT + '",'
            this.timefinish2 = this.timefinish2 + '"operationtime":"' + this.DataResbooking[x].OPERATION_TIME + '",'
            this.timefinish2 = this.timefinish2 + '"basiccharge":"' + this.Allocation2.BASIC_CHARGE + '",'
            this.timefinish2 = this.timefinish2 + '"operationcharge":"' + Operation_Charge.toFixed(2) + '",'
            this.timefinish2 = this.timefinish2 + '"cost":"",'
            this.timefinish2 = this.timefinish2 + '"quantity":"' + this.DataResbooking[x].SAMPLE_NUM + '"},'

          }
          this.timefinish2 = this.timefinish2.substring(0, this.timefinish2.length - 1);
          this.timefinish2 = this.timefinish2 + "]";
          console.log(this.timefinish2)

          if (this.timefinish2 != "]") {
            var obj = JSON.parse(this.timefinish2);
            this.timefinish2 = obj
            console.log(this.timefinish2)

            var Y
          var Z
          var count = 0
          for (Y in this.Allocate){
            for (Z in this.timefinish2){
              if((this.timefinish2[Z].equip).substring(0,2) == this.Allocate[Y].substring(0,2)){
                count = count + 1
                this.timefinish2[Z].count = count
              }
            }
            console.log(count)
            count = 0
          }
          var Y
          for (Y in this.timefinish2){
            if(this.timefinish2[Y].count >= 2){
              this.timefinish2[Y].basiccharge = 0
            }
          }
          for (Y in this.timefinish2){
            this.timefinish2[Y].cost = parseFloat(this.timefinish2[Y].basiccharge) + parseFloat(this.timefinish2[Y].operationcharge)
            this.Totalcostfinish =  this.Totalcostfinish  +  this.timefinish2[Y].cost
          }
          }

        })

      })

    })

    this.productService.TRACKING_ANALYSIS_READ_EXCEL().subscribe((data: {}) => {
      this.table = data
      var dataselect = ""
      var x
      for (x in this.table) {
        dataselect = dataselect + this.table[x].DISPLAY_NAME + ' <' + this.table[x].MAIL_ADDRESS + '>,'

      }
      dataselect = dataselect.substring(0, dataselect.length - 1);

      const myArray = dataselect.split(",");

      this.options = myArray
    })



    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value)),
    );
    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value)),
    );
    this.filteredOptions4 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value)),
    );
    this.filteredOptions4 = this.myControl4.valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value)),
    );



    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");
    console.log(this.departmentlocal)

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }
    if (this.departmentlocal == "MTQ00") {
      this.validprivate = true
    }

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  countrow = 0
  addIN() {
    console.log(this.countrow);
    this.countrow = this.countrow + 1
    this.EMAIL_CC[this.countrow] = ""
    console.log(this.EMAIL_CC);

  }
  delete(i: any) {
    this.countrow = this.countrow - 1
    this.EMAIL_CC.splice(i, 1);
    // delete this.EMAIL_CC[i];
    console.log(this.EMAIL_CC)
  }
  onOpenDialogClick() {
    if (this.namelocal != null) {
      this.productService.changeMessage(this.DataRes[0].REQ_NUM + "||" + this.DataRes[0].ID)
      const dialogRef = this.matDialog.open(QuestionComponent, {
        disableClose: true,
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);

      });
    } else (
      window.alert("Please login")
    )

  }
  myFunction() {
    window.open("http://163.50.57.95:82/Tracking_Analysis/Trackingstatus?id=" + this.DataRes[0].ID);
  }
  GoAswer(ID: any) {
    window.location.href = 'http://163.50.57.95:82/Tracking_Analysis/AnswerPage?id=' + ID + '&usertype=' + this.userType
  }
  GoAsweredit(ID: any) {
    window.location.href = 'http://163.50.57.95:82/Tracking_Analysis/AnswerEdit?id=' + ID + '&usertype=' + this.userType
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
  GoBooking() {
    window.open('http://163.50.57.95:82/Tracking_Analysis/BooingEquip?id=' + this.DataRes[0].ID);
  }
  GoAnaNoCom() {
    this.router.navigate(['/AnahomeNotcom'])
  }
  GoEquip(){
    this.router.navigate(['/Equipment'])
  }
  KPI(){
    if(this.departmentlocal == 'MTQ00'){
      this.router.navigate(['/KPIOperation'])
    }else{
        window.alert("Only Q30 member")
   }
  }
  Daily(){
    if(this.departmentlocal == 'MTQ00'){
      this.router.navigate(['/Dailyjob'])
    }else{
        window.alert("Only Q30 member")
   }
  }
  Goedit() {
    this.productService.changeMessage(this.DataRes[0].ID + "||" + this.DataRes[0].REQ_NUM)
    const dialogRef = this.matDialog.open(InfoEditstepComponent, {
      disableClose: true,
      width: '1000px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      this.ngOnInit()
    });
  }

  getdatascore1(value: any) {
    if (value < '4') {
      this.reason1 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason1);

      if (this.reason1 == null || this.reason1 == "") {
        this.check1 = false
        window.alert("คะแนนจะไม่ถูกบันทึก กรุณากรอกเหตุผล")
      } else {
        this.check1 = true
        this.score1 = value

      }
    } else {
      this.reason1 = ""
      this.score1 = value
      this.check1 = true
    }
  }
  getdatascore2(value: any) {
    if (value < '4') {
      this.reason2 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason2);

      if (this.reason2 == null || this.reason2 == "") {
        this.check2 = false
        window.alert("คะแนนจะไม่ถูกบันทึก กรุณากรอกเหตุผล")
      } else {
        this.check2 = true
        this.score2 = value
      }
    } else {
      this.reason2 = ""
      this.score2 = value
      this.check2 = true
    }

  }
  getdatascore3(value: any) {
    if (value < '4') {
      this.reason3 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason3);

      if (this.reason3 == null || this.reason3 == "") {
        this.check3 = false
        window.alert("คะแนนจะไม่ถูกบันทึก กรุณากรอกเหตุผล")
      } else {
        this.check3 = true
        this.score3 = value
      }
    } else {
      this.reason3 = ""
      this.score3 = value
      this.check3 = true
    }

  }
  getdatascore4(value: any) {
    if (value < '4') {
      this.reason4 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason4);

      if (this.reason4 == null || this.reason4 == "") {
        this.check4 = false
        window.alert("คะแนนจะไม่ถูกบันทึก กรุณากรอกเหตุผล")
      } else {
        this.check4 = true
        this.score4 = value
      }
    } else {
      this.reason4 = ""
      this.score4 = value
      this.check4 = true
    }

  }
  getdatascore5(value: any) {
    if (value < '4') {
      this.reason5 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason5);

      if (this.reason5 == null || this.reason5 == "") {
        this.check5 = false
        window.alert("คะแนนจะไม่ถูกบันทึก กรุณากรอกเหตุผล")
      } else {
        this.check5 = true
        this.score5 = value
      }
    } else {
      this.reason5 = ""
      this.score5 = value
      this.check5 = true
    }
  }
  savesummary() {
    if (this.DataRes[0].STATUS_JOB == 6) {
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `SUMMARY_DETAIL` = '" + this.summarydetail + "', `STETUS_PERSON` = '" + this.DataRes[0].REVI_REAPPROV_CHECK + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })

      var qtest2 = " " + this.DataRes[0].REVI_REAPPROV_CHECK + ";||||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Already revised report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else if (this.DataRes[0].STATUS_JOB == 7) {
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `SUMMARY_DETAIL` = '" + this.summarydetail + "', `STETUS_PERSON` = '" + this.DataRes[0].REVI_REAPPROV_CONFIRM + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })

      var qtest2 = " " + this.DataRes[0].REVI_REAPPROV_CONFIRM + ";||||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Already revised report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else if (this.DataRes[0].STATUS_JOB == 8) {
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `SUMMARY_DETAIL` = '" + this.summarydetail + "', `STETUS_PERSON` = '" + this.DataRes[0].REVI_REAPPROV_APPROV + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })

      var qtest2 = " " + this.DataRes[0].REVI_REAPPROV_APPROV + ";||||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Already revised report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    }
  }

  AnalystApprove() {
    if (this.namelocal == this.DataRes[0].REVI_ANASEC_ANAL) {
      if(this.Check != "" ){

      let date: Date = new Date();
      var date2 = date.toLocaleString()

      var finishDate1 = this.finishDate.toLocaleString()
      var finishDate2 = finishDate1.split(",");
      console.log(finishDate2[0])

      var startDate1 = this.startDate.toLocaleString()
      var startDate2 = startDate1.split(",");
      console.log(startDate2[0])
      if (finishDate2[0] != "" && startDate2[0] != "") {

        console.log(this.summarydetail)

        var qtest = ""
        qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
          " SET `STATUS_JOB` = '6', `REVI_REAPPROV_CHECK` = '" + this.Check + "', `REVI_REAPPROV_CONFIRM` = '" + this.Confirm + "', " +
          " `REVI_REAPPROV_APPROV` = '" + this.approval + "', `REVI_ANASEC_ANAL_COM` = '" + this.ComAnalyzer + "', `STETUS_PERSON` = '" + this.Check + "'," +
          " `REVI_ANASEC_ANAL_CC` = '" + this.EMAIL_CC + "', `REVI_ANASEC_ANAL_TIME` = '" + date2 + "'," +
          " `SUMMARY_STRAT` = '" + startDate2[0] + "', `SUMMARY_FINISH` = '" + finishDate2[0] + "', `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
          " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
        console.log(qtest);
        this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
          console.log(data);

          var qtest2 = " " + this.Check + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
          console.log(qtest2);
          this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
            console.log(data);

          })
          window.alert("Already approve")
          location.reload();

        })

      } else {
        window.alert("Please fill expected finish date")
      }
    }else{
      window.alert("Please fill Checker")
    }
    } else {
      window.alert("Only Analyzer Approve")
    }
  }
  NoCheckerApprov() {
    let date: Date = new Date();
      var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '9', `STETUS_PERSON` = '" + this.DataRes[0].REVI_PAND_ISSUER + "', `APPROVE_REPORT_DATE` = '" + date2 + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " " + this.DataRes[0].REVI_PAND_ISSUER + ";||||Q-Analysis Request Report ->(Customer Satisfaction Evaluation Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please give a score.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data);
    })
  }
  CheckerApprov() {
    if (this.namelocal == this.DataRes[0].REVI_REAPPROV_CHECK) {
      let date: Date = new Date();
      var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '7', `REVI_REAPPROV_CHECK_COM` = '" + this.ComChack + "', `REVI_REAPPROV_CHECK_CC` = '" + this.EMAIL_CC + "', " +
        " `REVI_REAPPROV_CHECK_TIME` = '" + date2 + "', `REVISE_STATUS` = '2', `STETUS_PERSON` = '" + this.DataRes[0].REVI_REAPPROV_CONFIRM + "', `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.alert("Already approve")
        location.reload();
      })
      var qtest2 = " " + this.DataRes[0].REVI_REAPPROV_CONFIRM + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else {
      alert('Only Checker Approve')
    }
  }
  CheckerRevise() {
    if (this.namelocal == this.DataRes[0].REVI_REAPPROV_CHECK) {
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `REVISE_STATUS` = '1', `STETUS_PERSON` = '" + this.DataRes[0].REVI_ANASEC_ANAL + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })
      var qtest2 = " " + this.DataRes[0].REVI_ANASEC_ANAL + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please revise report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else {
      alert('Only Checker Approve')
    }
  }

  NoConfirmApprov() {
    let date: Date = new Date();
      var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '9', `STETUS_PERSON` = '" + this.DataRes[0].REVI_PAND_ISSUER + "', `APPROVE_REPORT_DATE` = '" + date2 + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " " + this.DataRes[0].REVI_PAND_ISSUER + ";||||Q-Analysis Request Report ->(Customer Satisfaction Evaluation Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please give a score.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data);
    })
  }

  ConfirmApprov() {
    if (this.namelocal == this.DataRes[0].REVI_REAPPROV_CONFIRM) {
      let date: Date = new Date();
      var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '8', `REVI_REAPPROV_CONFIRM_COM` = '" + this.comConfirm + "', `REVI_REAPPROV_CONFIRM_CC` = '" + this.EMAIL_CC + "', " +
        " `REVI_REAPPROV_CONFIRM_TIME` = '" + date2 + "', `REVISE_STATUS` = '2', `SUMMARY_DETAIL` = '" + this.summarydetail + "', `STETUS_PERSON` = '" + this.DataRes[0].REVI_REAPPROV_APPROV + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.alert("Already approve")
        location.reload();
      })
      var qtest2 = " " + this.DataRes[0].REVI_REAPPROV_APPROV + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else {
      alert('Only Confirm Approve')
    }
  }

  ConfirmRevise() {
    if (this.namelocal == this.DataRes[0].REVI_REAPPROV_CONFIRM) {
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `REVISE_STATUS` = '1', `STETUS_PERSON` = '" + this.DataRes[0].REVI_ANASEC_ANAL + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })
      var qtest2 = " " + this.DataRes[0].REVI_ANASEC_ANAL + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please revise report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else {
      alert('Only Confirm Approve')
    }
  }

  NoApproverApprov() {
    let date: Date = new Date();
      var date2 = date.toLocaleString()
      
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '9', `STETUS_PERSON` = '" + this.DataRes[0].REVI_PAND_ISSUER + "', `APPROVE_REPORT_DATE` = '" + date2 + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " " + this.DataRes[0].REVI_PAND_ISSUER + ";||||Q-Analysis Request Report ->(Customer Satisfaction Evaluation Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please give a score.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data);
    })
  }
  ApproverApprov() {
    if (this.namelocal == this.DataRes[0].REVI_REAPPROV_APPROV) {
      let date: Date = new Date();
      var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '9', `REVI_REAPPROV_APPROV_COM` = '" + this.comapproval + "', `REVI_REAPPROV_APPROV_CC` = '" + this.EMAIL_CC + "', " +
        " `REVI_REAPPROV_APPROV_TIME` = '" + date2 + "', `APPROVE_REPORT_DATE` = '" + date2 + "', `REVISE_STATUS` = '2', `SUMMARY_DETAIL` = '" + this.summarydetail + "', `STETUS_PERSON` = '" + this.DataRes[0].REVI_PAND_ISSUER + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.alert("Already approve")
        location.reload();
      })
      var qtest2 = " " + this.DataRes[0].REVI_PAND_ISSUER + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Customer Satisfaction Evaluation Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please give a score.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else {
      alert('Only Approver Approve')
    }
  }

  ApproverRevise() {
    if (this.namelocal == this.DataRes[0].REVI_REAPPROV_APPROV) {
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `REVISE_STATUS` = '1', `STETUS_PERSON` = '" + this.DataRes[0].REVI_ANASEC_ANAL + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        location.reload();
      })
      var qtest2 = " " + this.DataRes[0].REVI_ANASEC_ANAL + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please revise report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
    } else {
      alert('Only Approver Approve')
    }
  }

  CsApprove() {

    if (this.namelocal == this.DataRes[0].REVI_PAND_ISSUER) {
      window.scrollTo(0, 3500)
    
        var total_score = this.score1 + "||" + this.reason1 + "[]" + this.score2 + "||" + this.reason2 + "[]" + this.score3 + "||" + this.reason3 + "[]" + this.score4 + "||" + this.reason4 + "[]" + this.score5 + "||" + this.reason5
      console.log(total_score)

      let date: Date = new Date();
      var date2 = date.toLocaleString()


      if (this.score1 != "" && this.score2 != "" && this.score3 != "" && this.score4 != "" && this.score5 != "") {
        if (this.check1 == true && this.check2 == true && this.check3 == true && this.check4 == true && this.check5 == true) {
          var qtest = ""
          qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
            " SET `STATUS_JOB` = '10', `CS_SCORE` = '" + total_score + "',`STETUS_PERSON` = '" + this.finish + "', " +
            " `REVI_CS_ISSUE_TIME` = '" + date2 + "' " +
            " WHERE (`ID` = '" + this.DataRes[0].ID + "'); "
          console.log(qtest);
          this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
            console.log(data);
            this.isValid6 = true
            window.alert("สามารถดูราคารวมได้ที่ช่องSummary cost")

            location.reload()
          })
        } else {
          window.alert("กรุณณากรอกคะแนนให้ครบ หรือกรอกเหตุผลหากให้คะแนนต่ำกว่า4")
        }
      } else {
        window.alert("กรุณณากรอกคะแนนให้ครบ หรือกรอกเหตุผลหากให้คะแนนต่ำกว่า4")
      }
      var qtest2 = " " + this.DataRes[0].REVI_ANASEC_ANAL + ";||" + this.EMAIL_CC + "||Q-Analysis Request Report ->(Complete Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data);
      })
   
      
    } else {
      alert('Only Issuer Approve')
    }
  }

  editinfo() {
    if (this.namelocal == this.DataRes[0].REVI_PAND_ISSUER) {
    this.productService.changeMessage(this.DataRes[0].ID)
    const dialogRef = this.matDialog.open(EditinfoComponent, {
      disableClose: true,
      width: '1500px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      this.ngOnInit()
    });
  }else{
    window.alert("Only issuer can edit")
}
  }
  editreviewer(x: any) {
    this.productService.changeMessage(this.DataRes[0].ID + "||" + x)
    const dialogRef = this.matDialog.open(InfoComponent, {
      disableClose: true,
      width: '1500px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      location.reload();
    });
  }
  recordreceived() {
    if (this.namelocal == this.DataRes[0].REVI_ANASEC_ANAL) {

      let text = "Would you confirm received sample? ";
      if (confirm(text) == true) {
        let date: Date = new Date();
        var date2 = date.toLocaleString()
        var date3 = date2.split(",")
        console.log(date3)

        var qtest = ""
        qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
          " SET `DATE_RECEIVE_SAM_REAL` = '" + date3[0] + "' " +
          " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
        console.log(qtest);
        this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
          console.log(data);
          location.reload();
        })
        var qtest2 = " "+this.DataRes[0].REVI_PAND_ISSUER+";||"+this.EMAIL_CC+"||Q-Analysis Request ->(Analysis Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||The request is analyzing.You can see a progress in this page http://163.50.57.95:82/Tracking_Analysis/Trackingstatus?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
      } else {
      }
    } else {
      alert('Only Analyzer Approve')
    }

  }

  deletefile(x: any) {
    this.productService.TRACKING_ANALYSIS_DELETE_FILE(x).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
  }
  Remind() {
    if (this.namelocal == this.DataRes[0].REVI_ANASEC_ANAL) {
    var qtest2 = " " + this.DataRes[0].REVI_PAND_ISSUER + ";||||Q-Analysis Request Report ->(Customer Satisfaction Evaluation Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please give a score.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data);
    })
    window.alert("Send email to issuer")
  }else{
    alert('Only Analyzer click')
  }
}
}

