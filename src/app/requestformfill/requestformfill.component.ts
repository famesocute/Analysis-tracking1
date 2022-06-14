import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-requestformfill',
  templateUrl: './requestformfill.component.html',
  styleUrls: ['./requestformfill.component.scss']
})
export class RequestformfillComponent implements OnInit {
  table: any

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly : any

  RequestNo = ""
  Title = ""
  Background = ""
  Purpose = ""
  Hypothesis = ""
  Analysistype = ""
  Analysistype2 = ""
  IssueDate = ""
  Requester = ""
  Phone = ""
  Department = ""
  Product = ""
  RequestTech = ""
  RequestTech2 = ""
  Numsample = 0
  Sendsampledate = ""
  EepectedDate = ""
  Piority = ""
  Reason = ""
  Lotno = ""
  Samplename = ""
  Remarks = ""
  AnaComment = ""
  Dangerous = ""
  SamAftertest = ""
  Relatedmatters = ""
  KeywordCharact = ""
  KeywordState = ""
  KeywordPheno = ""
  NameIssuer = ""
  ComIssuer = ""
  ccIssuer1 = ""
  ccIssuer2 = ""
  NameConfirm = ""
  NameControl = "Wanutsanun Hintuang <wanutsanun.hin@murata.com>"
  month = ""

  isValid = false

  loading = true

  EMAIL_CC: string[] = [];

  activate: boolean = false

  Tech =

    [{ data: 'X-ray 2D', check: false },
    { data: 'X-ray 3D', check: false },
    { data: 'SEM-Microscope', check: false },
    { data: 'Cross section', check: false },
    { data: 'Ion-milling', check: false },
    { data: 'VHX', check: false },
    { data: 'Metallurgical Microscope', check: false },
    { data: 'SEM-EDX', check: false },
    { data: 'SEM-Mapping', check: false },
    { data: 'EDXRF', check: false },
    { data: 'CS Analyzer', check: false },
    { data: 'ICP', check: false },
    { data: 'FTIR', check: false },
    { data: 'GCMS', check: false },
    { data: 'DSC', check: false },
    { data: 'TG-DTA', check: false },
    { data: 'Solder wettability', check: false },
    { data: 'Micro-probe', check: false },
    { data: 'Dust monitering', check: false },
    ];

  productForm: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, public productService: ProductService) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
      quantitiesCC: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.EMAIL_CC[0] = ""
    console.log(this.EMAIL_CC);

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
    
    this.quantities().push(this.newQuantity());

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    if (this.departmentlocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    } else {
      window.alert("กรุณา login")
      this.router.navigate(['/Analyrequehome'])
    }

    this.loading = false
  }

  // Add input
  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      Lotno: '',
      Samplename: '',
      Remarks: '',
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }



  // seach box
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));

  }

  // seach controler

  // Navi to Question
  NavQuestion() {
    this.router.navigate(['/Question'])
  }
  //  Retio tool
  getdata(value: any) {
    this.Analysistype = value
  }
  getdatadan(value: any) {
    this.Dangerous = value
  }
  getdataSamAf(value: any) {
    this.SamAftertest = value
  }

  // check box

  other: any // check box other
  comment = "" // ช่อง input other
  AnsMany() {
    this.RequestTech = ""


    var i
    var count = 0

    for (i in this.Tech) {
      count = count + 1
      if (this.Tech[i].check == true) {
        this.RequestTech = this.RequestTech + this.Tech[i].data + ","
      }
    }
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
    console.log(this.EMAIL_CC)
  }
  display() {
    var DatereceiveSam = ""
    var Sendsampledate2 = this.Sendsampledate.toLocaleString()
    DatereceiveSam = Sendsampledate2.substring(0, 9)
    console.log(DatereceiveSam)

    var DateEepectSam = ""
    var DateEepectSam2 = this.EepectedDate.toLocaleString()
    DateEepectSam = DateEepectSam2.substring(0, 9)
    console.log(DateEepectSam)

    var val2 = ""
    for (var val in this.productForm.value.quantities) {
      console.log(val); // prints values: 10, 20, 30, 40
      val2 = val2 + this.productForm.value.quantities[val].Lotno + "||" + this.productForm.value.quantities[val].Samplename + "||" + this.productForm.value.quantities[val].Remarks + "[]"
    }
    val2 = val2.substring(0, val2.length - 2);
    console.log(val2)
    var qtest = ""
    qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`data_all` " +
      "(`STATUS_JOB`,`STETUS_PERSON`,`REQ_NUM`,`MONTH`, `TITLE`, `BACKGRUD`, `PURPOSE`, `HYPO`, `ANA_TYPE`,`ANA_TYPE2`, `ISSUE_DATE`, " +
      "`REQ_TER`, `PHONE`, `DEP_MENT`, `PRODUCT`, `ATTACH_FILE`, `REQ_ANA_TECHNI`,`REQ_ANA_TECHNI2`, `NUM_SAMPLE`" +
      ", `SEND_SAM_DATE`, `FINISH_DATE`, `PIORITY`, `REASON`,  `SAM_NAME`, " +
      "`COMM_SAM_INFOR`, `DANGER`, `SAM_AF_TEST`, `RELATE_MAT`, `KEY_CHARA`, `KEY_STATE`, " +
      "`KEY_PHENO`, `QUESTION`, `REVI_PAND_ISSUER`, `REVI_PAND_CONFIRM`, `REVI_ANASEC_CONTROL`, " +
      "`REVI_ANASEC_ANAL`, `REVI_REAPPROV_CHECK`, `REVI_REAPPROV_CONFIRM`, `REVI_REAPPROV_APPROV`," +
      "`REVI_CS_ISSUE`, `REVI_COMPLET_CLOSE`,`REVI_PAND_ISSUE_COM`,`REVI_PAND_ISSUE_CC`) " +
      " VALUES ('1','" + this.NameConfirm + "','" + this.RequestNo + "', '" + this.month + "', '" + this.Title + "', '" + this.Background + "', '" + this.Purpose + "', '" + this.Hypothesis + "', '" + this.Analysistype + "'," +
      " '" + this.Analysistype2 + "', '" + this.IssueDate + "', '" + this.namelocal + "', '" + this.Phone + "', '" + this.departmentlocal + "', '" + this.Product + "','1', '" + this.RequestTech + "', '" + this.RequestTech2 + "'," +
      " '" + this.Numsample + "', '" + DatereceiveSam + "', '" + DateEepectSam + "', '" + this.Piority + "', '" + this.Reason + "', '" + val2 + "'," +
      " '" + this.AnaComment + "', '" + this.Dangerous + "', '" + this.SamAftertest + "', '" + this.Relatedmatters + "', '" + this.KeywordCharact + "', '" + this.KeywordState + "', '" + this.KeywordPheno + "', " +
      " '', '" + this.namelocal + "', '" + this.NameConfirm + "','" + this.NameControl + "','','','','','','','" + this.ComIssuer + "','" + this.EMAIL_CC + "'  );"
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
    })

  }

  NewregisterNum() {
    var MonthRes: any

    var runnumberRes: any

    var runnumberNew: any
    var fame
    this.productService.TRACKING_ANALYSIS_SELECT_GET_LAST_MONTH().subscribe((data: {}) => {

      console.log(data);

      MonthRes = data;

      let date: Date = new Date();

      var date2 = date.toLocaleString()
      this.IssueDate = date2

      var years = date2.substring(7, 9)

      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const d = new Date();
      this.month = months[d.getMonth()];

      console.log(date2);
      console.log(years);

      var date3: any

      if (date2.substring(0, 2) == "10") {

        date3 = "X"

      }

      else if (date2.substring(0, 2) == "11") {

        date3 = "Y"

      }

      else if (date2.substring(0, 2) == "12") {

        date3 = "X"

      }

      else {

        date3 = date2.substring(0, 1)

      }
      console.log("Month = " + date3);

      console.log(MonthRes[0].MONTH);

      var runnumber2

      var runnumber


      if (date3 == MonthRes[0].MONTH) {

        console.log("num = num + 001 ");



        this.productService.TRACKING_ANALYSIS_SELECT_SUBSTRING_REQ_NUM().subscribe((data: {}) => {

          console.log(data);

          runnumberRes = data

          runnumber2 = parseInt(runnumberRes[0].LASTNUM)

          runnumber = runnumber2 + 1

          var str = "" + runnumber

          var pad = "000"

          runnumber = pad.substring(0, pad.length - str.length) + str

          console.log(runnumber)

          var Department2

          Department2 = this.departmentlocal.substring(2, 5)
          console.log(Department2)
          runnumberNew = "R" + Department2 + years + date3 + runnumber

          //R300224001

          console.log(runnumberNew);
          console.log(runnumberNew.length);
          this.RequestNo = runnumberNew

          if (runnumberNew.length == 10) {
            console.log("True");
            fame = true
            this.display()
          }
          else {
            fame = false
          }
        })

      }

      else {

        console.log("Num =  001 ");

        runnumber = "001"

        var Department2

        Department2 = this.departmentlocal.substring(2, 5)
        console.log(Department2)
        runnumberNew = "R" + Department2 + years + date3 + runnumber

        //R300224001

        console.log(runnumberNew);
        console.log(runnumberNew.length);
        this.RequestNo = runnumberNew

        if (runnumberNew.length == 10) {
          console.log("True");
          fame = true
          this.display()
        }
        else {
          fame = false
        }
      }
    })

    this.router.navigate(['/Analyrequehome'])
  }

  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  Logout(){
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("EMPLOY_CODE");
    sessionStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
  }

}
