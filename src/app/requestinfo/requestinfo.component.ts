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

  sample1: any
  sample2: any

  DataResQUESTION: any

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  EMAIL_CC: string[] = [];

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
  SendDate = ""
  finishDate = ""

  isValid1 = false
  isValid2 = false
  isValid3 = false
  isValid4 = false
  isValid5 = false
  isValid6 = false
  validprivate = false

  sam1: any
  sam2: any
  time1: any
  time2: any

  score1 =""
  score2 =""
  score3 =""
  score4 =""
  score5 =""

  reason1 : any
  reason2 : any
  reason3 : any
  reason4 : any
  reason5 : any

 check1 = true
 check2 = true
 check3 = true
 check4 = true
 check5 = true

 outputCS1 : any
 outputCS2 : any

  totalhr: any
  Totalcost = 0
  timeofstep: any

  DataResAllocation: any
  Allocation: any

  csvalid = true
  Statusrevise = ""

  dataUpload : any
  dataUploadSETdata : any
  DataResFlie : any

  Interim :any = "["
  Fill_inital :any = "["
  Report :any = "["
  Summary :any = "["

  section1 = "Interim"
  section2 = "Report"
  section3 = "Summary"


  constructor(public router: Router, public productService: ProductService, private matDialog: MatDialog, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.EMAIL_CC[0] = ""
    console.log(this.EMAIL_CC);

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      if(this.DataRes[0].STATUS_JOB == 9){
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
          newdata = newdata + '{"SEQ_CONTENT":"' + (parseInt(i)+1) + '",'
          if((this.dataUpload[i].FILENAME).substring(this.dataUpload[i].FILENAME.length - 3) == "PNG" || (this.dataUpload[i].FILENAME).substring(this.dataUpload[i].FILENAME.length - 3) == "png"){
            newdata = newdata + '"PROCESS_NAME":"",'  
          }
          else{  
            newdata = newdata + '"PROCESS_NAME":"' + this.dataUpload[i].FILENAME + '",'
          }
          console.log((this.dataUpload[i].FILENAME).substring(this.dataUpload[i].FILENAME.length - 3))
          newdata = newdata + '"LINK":"http://163.50.57.95:84/' + this.dataUpload[i].LINK + '"},'
        }
        newdata = newdata.substring(0, newdata.length - 1);
        newdata = newdata + "]";
      console.log(newdata)
  
      var obj = JSON.parse(newdata);
  
      console.log(obj)
  
      this.dataUploadSETdata = obj
  
      })
      this.productService.TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResFlie = data
        var x 
        for(x in this.DataResFlie){
          if(this.DataResFlie[x].SECTION == "Interim"){
            
            // this.Interim = this.Interim + '"FILENAME":"' + this.DataResFlie[x].FILENAME + '"},'

            if((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png"|| (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg"){
              this.Interim = this.Interim + '{"FILENAME":"",'  
            }
            else{  
              this.Interim = this.Interim + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Interim = this.Interim + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'

          }else if(this.DataResFlie[x].SECTION == "Fill_inital"){

            if((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png"|| (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg"){
              this.Fill_inital = this.Fill_inital + '{"FILENAME":"",'  
            }
            else{  
              this.Fill_inital = this.Fill_inital + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Fill_inital = this.Fill_inital + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'

          }else if(this.DataResFlie[x].SECTION == "Report"){

            if((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png"|| (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg"){
              this.Report = this.Report + '{"FILENAME":"",'  
            }
            else{  
              this.Report = this.Report + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Report = this.Report + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'

          }else if(this.DataResFlie[x].SECTION == "Summary"){

            if((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png"|| (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg"){
              this.Summary = this.Summary + '{"FILENAME":"",'  
            }
            else{  
              this.Summary = this.Summary + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Summary = this.Summary + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'
          }
        }
        if(this.Interim.Fill_inital != 1){
        this.Interim = this.Interim.substring(0, this.Interim.length - 1);
        this.Interim = this.Interim + "]";
         console.log(this.Interim)
          var obj = JSON.parse(this.Interim);
          console.log(obj)
          this.Interim = obj
        }
          if(this.Report.Fill_inital != 1){
      this.Fill_inital = this.Fill_inital.substring(0, this.Fill_inital.length - 1);
      this.Fill_inital = this.Fill_inital + "]";
     console.log(this.Fill_inital)
     var obj = JSON.parse(this.Fill_inital);
      console.log(obj)
      this.Fill_inital = obj
          }
      if(this.Report.length != 1){
        this.Report = this.Report.substring(0, this.Report.length - 1);
        this.Report = this.Report + "]";
        console.log(this.Report)
        var obj = JSON.parse(this.Report);
         console.log(obj)
         this.Report = obj
      }
      if(this.Summary.length != 1){
        this.Summary = this.Summary.substring(0, this.Summary.length - 1);
        this.Summary = this.Summary + "]";
        console.log(this.Summary)
        var obj = JSON.parse(this.Summary);
         console.log(obj)
         this.Summary = obj
      }
    
     

      })

      if (this.DataRes[0].REVI_ANASEC_CONTROL_COM != null) {
        this.ComControl = this.DataRes[0].REVI_ANASEC_CONTROL_COM
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

      if(this.DataRes[0].REVISE_STATUS == 1){
        this.Statusrevise = "Revising!"
        console.log(this.Statusrevise)
      }

      this.loading = false

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

      if (this.DataRes[0].CS_SCORE != null){
      this.outputCS1 = this.DataRes[0].CS_SCORE.split("[]")
      console.log(this.outputCS1)
      var x
      var a


      this.outputCS2 = "["

      for (x in this.outputCS1) {
        a = this.outputCS1[x].split("||")
        this.outputCS2 = this.outputCS2 + '{"score":"' + a[0] + '",'
        this.outputCS2 = this.outputCS2 + '"reason":"' + a[1] + '"},'

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
          Estimate_Cost = parseFloat(Operation_Charge) + parseFloat(this.Allocation.BASIC_CHARGE)
          console.log(Estimate_Cost)
          this.Totalcost = this.Totalcost + Estimate_Cost
          console.log(this.Totalcost)

          x = parseInt(x) + 1
          this.sam2 = this.sam2 + '{"step":"' + x + '",'
          this.sam2 = this.sam2 + '"equip":"' + a[0] + '",'
          this.sam2 = this.sam2 + '"quantity":"' + a[1] + '",'
          this.sam2 = this.sam2 + '"basiccharge":"' + this.Allocation.BASIC_CHARGE + '",'
          this.sam2 = this.sam2 + '"operationcharge":"' + Operation_Charge.toFixed(2) + '",'
          this.sam2 = this.sam2 + '"estimatecost":"' + Estimate_Cost.toFixed(2) + '"},'

        }
        this.sam2 = this.sam2.substring(0, this.sam2.length - 1);
        this.sam2 = this.sam2 + "]";
        console.log(this.sam2)
        var obj = JSON.parse(this.sam2);
        this.sam2 = obj
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
        this.time2 = this.time2.substring(0, this.time2.length - 1);
        this.time2 = this.time2 + "]";
        console.log(this.time2)
        var obj = JSON.parse(this.time2);
        this.time2 = obj
        console.log(this.time2)

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

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    console.log(this.departmentlocal)

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }
    if(this.departmentlocal == "MTQ00"){
      this.validprivate = true
    }
    
  }
  private _filter(value: string): string[] {
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

        this.ngOnInit()
      });
    } else (
      window.alert("Please login")
    )

  }
  myFunction() {
    window.open("http://localhost:4200/Trackingstatus?id=" + this.DataRes[0].ID);
  }
  GoAswer(ID: any) {
    window.location.href = 'http://localhost:4200/AnswerPage?id=' + ID + '&usertype=' + this.userType
  }
  GoAsweredit(ID: any) {
    window.location.href = 'http://localhost:4200/AnswerEdit?id=' + ID + '&usertype=' + this.userType
  }
  Goanalysishome() {
    this.router.navigate(['/Analyrequehome'])
  }
  Logout() {
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
  GoBooking() {
    window.open('http://localhost:4200/BooingEquip?id=' + this.DataRes[0].ID);
  }
  GoAnaNoCom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  Goedit() {
    this.productService.changeMessage(this.DataRes[0].ID+"||"+this.DataRes[0].REQ_NUM)
    const dialogRef = this.matDialog.open(InfoEditstepComponent, {
      disableClose: true,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      this.ngOnInit()
    });
  }

  getdatascore1(value: any){
    if(value < '4'){
      this.reason1 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason1);

      if(this.reason1 == null || this.reason1 == ""){
        this.check1 = false
          window.alert("????????????????????????????????????????????????????????? ????????????????????????????????????????????????")
      }else{
        this.check1 = true
        this.score1=value
        
      }
    }else{
      this.reason1 = ""
      this.score1=value
    }
  }
  getdatascore2(value: any){
    if(value < '4'){
      this.reason2 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason2);

      if(this.reason2 == null || this.reason2 == ""){
        this.check2 = false
          window.alert("????????????????????????????????????????????????????????? ????????????????????????????????????????????????")
      }else{
        this.check2 = true
        this.score2 = value
      }
    }else{
      this.reason2 = ""
      this.score2=value
    }
    
  }
  getdatascore3(value: any){
    if(value < '4'){
      this.reason3 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason3);

      if(this.reason3 == null || this.reason3 == ""){
        this.check3 = false
          window.alert("????????????????????????????????????????????????????????? ????????????????????????????????????????????????")
      }else{
        this.check3 = true
        this.score3 = value
      }
    }else{
      this.reason3 = ""
      this.score3=value
    }
   
  }
  getdatascore4(value: any){
    if(value < '4'){
      this.reason4 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason4);

      if(this.reason4 == null || this.reason4 == ""){
        this.check4 = false
          window.alert("????????????????????????????????????????????????????????? ????????????????????????????????????????????????")
      }else{
        this.check4 = true
        this.score4 = value
      }
    }else{
      this.reason4 = ""
      this.score4=value
    }
    
  }
  getdatascore5(value: any){
    if(value < '4'){
      this.reason5 = prompt('Why is it under 3 points(please you give a reason) ');
      console.log(this.reason5);

      if(this.reason5 == null || this.reason5 == ""){
        this.check5 = false
          window.alert("????????????????????????????????????????????????????????? ????????????????????????????????????????????????")
      }else{
        this.check5 = true
        this.score5 = value
      }
    }else{
      this.reason5 = ""
      this.score5=value
    }
  }
  savesummary(){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
  }

  AnalystApprove() {
    if(this.namelocal == this.DataRes[0].REVI_ANASEC_ANAL){ 
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var SendDate1 = this.SendDate.toLocaleString()
    var SendDate2 = SendDate1.split(",");
    console.log(SendDate2[0])
    var finishDate1 = this.finishDate.toLocaleString()
    var finishDate2 = finishDate1.split(",");
    console.log(finishDate2[0])

    console.log(this.summarydetail)

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '6', `REVI_REAPPROV_CHECK` = '" + this.Check + "', `REVI_REAPPROV_CONFIRM` = '" + this.Confirm + "', " +
      " `REVI_REAPPROV_APPROV` = '" + this.approval + "', `REVI_ANASEC_ANAL_COM` = '" + this.ComAnalyzer + "',"+
      " `REVI_ANASEC_ANAL_CC` = '" + this.EMAIL_CC + "', `REVI_ANASEC_ANAL_TIME` = '" + date2 + "',"+
      " `SUMMARY_SEND` = '" + SendDate2[0] + "', `SUMMARY_FINISH` = '" + finishDate2[0] + "', `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })

    var qtest2 = " "+this.DataRes[0].REVI_REAPPROV_CHECK+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }
  NoCheckerApprov() {
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '7' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_REAPPROV_CONFIRM+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  CheckerApprov() {
    if(this.namelocal == this.DataRes[0].REVI_REAPPROV_CHECK){ 
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '7', `REVI_REAPPROV_CHECK_COM` = '" + this.ComChack + "', `REVI_REAPPROV_CHECK_CC` = '" + this.EMAIL_CC + "', " +
      " `REVI_REAPPROV_CHECK_TIME` = '" + date2 + "', `REVISE_STATUS` = '2', `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_REAPPROV_CONFIRM+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }
  CheckerRevise(){
    if(this.namelocal == this.DataRes[0].REVI_REAPPROV_CHECK){ 
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `REVISE_STATUS` = '1' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_ANASEC_ANAL+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }

  NoConfirmApprov() {
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '8' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_REAPPROV_APPROV+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }

  ConfirmApprov() {
    if(this.namelocal == this.DataRes[0].REVI_REAPPROV_CONFIRM){ 
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '8', `REVI_REAPPROV_CONFIRM_COM` = '" + this.comConfirm + "', `REVI_REAPPROV_CONFIRM_CC` = '" + this.EMAIL_CC + "', " +
      " `REVI_REAPPROV_CONFIRM_TIME` = '" + date2 + "', `REVISE_STATUS` = '2', `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_REAPPROV_APPROV+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }

  ConfirmRevise(){
    if(this.namelocal == this.DataRes[0].REVI_REAPPROV_CONFIRM){ 
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `REVISE_STATUS` = '1' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_ANASEC_ANAL+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }

  NoApproverApprov() {
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '9' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_PAND_ISSUER+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  ApproverApprov() {
    if(this.namelocal == this.DataRes[0].REVI_REAPPROV_APPROV){ 
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '9', `REVI_REAPPROV_APPROV_COM` = '" + this.comapproval + "', `REVI_REAPPROV_APPROV_CC` = '" + this.EMAIL_CC + "', " +
      " `REVI_REAPPROV_APPROV_TIME` = '" + date2 + "', `REVISE_STATUS` = '2', `SUMMARY_DETAIL` = '" + this.summarydetail + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_PAND_ISSUER+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }

  ApproverRevise(){
    if(this.namelocal == this.DataRes[0].REVI_REAPPROV_APPROV){ 
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `REVISE_STATUS` = '1' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
    var qtest2 = " "+this.DataRes[0].REVI_ANASEC_ANAL+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }

  CsApprove() {
    if(this.namelocal == this.DataRes[0].REVI_PAND_ISSUER){ 
var total_score = this.score1+"||"+this.reason1+"[]"+this.score2+"||"+this.reason2+"[]"+this.score3+"||"+this.reason3+"[]"+this.score4+"||"+this.reason4+"[]"+this.score5+"||"+this.reason5
console.log(total_score)

let date: Date = new Date();
    var date2 = date.toLocaleString()

   
    if(this.score1 != "" && this.score2 != "" && this.score3 != "" && this.score4 != "" && this.score5 != ""){
      if(this.check1 == true && this.check2 == true && this.check3 == true && this.check4 == true && this.check5 == true ){
        var qtest = ""
        qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
          " SET `STATUS_JOB` = '10', `CS_SCORE` = '" + total_score + "', " +
          " `REVI_CS_ISSUE_TIME` = '" + date2 + "' " +
          " WHERE (`ID` = '" + this.DataRes[0].ID + "'); "
        console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      this.isValid6 = true
      location.reload()
    })
    }else{
      window.alert("??????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????4")
    }
    }else{
      window.alert("??????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????4")
    }
    var qtest2 = " "+this.DataRes[0].REVI_ANASEC_ANAL+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://localhost:4200/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }
  editinfo(){
  
    this.productService.changeMessage(this.DataRes[0].ID)
      const dialogRef = this.matDialog.open(EditinfoComponent, {
        disableClose : true,
        width: '1500px',
        height: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result );

      this.ngOnInit()
      });
}
editreviewer(x:any){
  this.productService.changeMessage(this.DataRes[0].ID+ "||"+x)
  const dialogRef = this.matDialog.open(InfoComponent, {
    disableClose : true,
    width: '1500px',
    height: '700px'
  });
  dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  console.log(result );

  location.reload();
  });
}
recordreceived(){
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
  } else {
  }

}
}

