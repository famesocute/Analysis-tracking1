import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss']
})
export class AnswerEditComponent implements OnInit {
  message = ""
  Questiondata: any
  DataRes : any

  ANSWER_SENT_TO = ""
  ANSWER_DETAIL = ""
  ANSWER_CC1_SENT_TO = ""
  ANSWER_CC2_SENT_TO = ""
  ANSWER_DATE = ""
  STATUS_QUESTION = "Answered"
  AnswerDate = ""

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  table: any
  loading = true

  ID_Q: any
  ID_p: any
  userType : any

  isValid = false
  isValidanswer = false

  EMAIL_CC: string[] = [];

  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;

  constructor(public router: Router, public productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ID_p = this.route.snapshot.queryParamMap.get("usertype");
    console.log(this.ID_p)
    this.ID_Q = this.route.snapshot.queryParamMap.get("id");
    console.log(this.ID_Q)

    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");
    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }

    this.EMAIL_CC[0] = ""
    console.log(this.EMAIL_CC);

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.ID_p).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })

    this.productService.TRACKING_ANALYSIS_SELECT_QUESTION_BY_ID(this.ID_Q).subscribe((data: {}) => {
      console.log(data);
      this.Questiondata = data
      this.ANSWER_DETAIL = this.Questiondata[0].ANSWER_DETAIL
      this.ANSWER_SENT_TO= this.Questiondata[0].ANSWER_SENT_TO
      this.ANSWER_CC1_SENT_TO= this.Questiondata[0].ANSWER_CC1_SENT_TO
      this.ANSWER_CC2_SENT_TO= this.Questiondata[0].ANSWER_CC2_SENT_TO
      this.loading = false
    })

    this.productService.TRACKING_ANALYSIS_READ_EXCEL().subscribe((data: {}) => {
      console.log(data);
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
    
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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


  Logout() {
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }

  countrow = 0
  addIN(){
    console.log(this.countrow);
    this.countrow = this.countrow + 1
    this.EMAIL_CC[this.countrow] = ""
    console.log(this.EMAIL_CC);
  }
  delete(i:any){
    this.countrow = this.countrow - 1
    this.EMAIL_CC.splice(i, 1);
    // delete this.EMAIL_CC[i];
    console.log(this.EMAIL_CC)
  }
  NavAnapadding() {
    let date: Date = new Date();
    var date2 = date.toLocaleString()
    this.AnswerDate = date2
    this.ANSWER_DATE = date2.substring(0, 9)

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`question` SET `ANSWER_DETAIL` = '" + this.ANSWER_DETAIL + "', " +
      "`ANSWER_SENT_TO` = '" + this.ANSWER_SENT_TO + "', `ANSWER_CC1_SENT_TO` = '" + this.EMAIL_CC + "', " +
      " `ANSWER_DATE` = '" + this.ANSWER_DATE + "'," +
      " `STATUS_QUESTION` = '" + this.STATUS_QUESTION + "' WHERE (`ID` = '" + this.ID_Q + "');"
      
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {

      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/AnahomeNotcom'
       
    var qtest2 = " "+this.ANSWER_SENT_TO+";||"+this.EMAIL_CC+"||Q-Analysis Request ->(Answer Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/AnswerPage?id="+this.Questiondata[0].ID+"&usertype="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
    console.log(data);    
    
    })
    })
  }

}
