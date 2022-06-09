import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {

  message = ""
  Questiondata: any

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

  ID_Q: any
  ID_p: any

  isValid = false
  isValidanswer = false

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(public router: Router, public productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }

    this.ID_p = this.route.snapshot.queryParamMap.get("usertype");
    console.log(this.ID_p)
    this.ID_Q = this.route.snapshot.queryParamMap.get("id");
    console.log(this.ID_Q)

    // this.productService.currentMessage.subscribe(message => this.message = message)
    // console.log(this.message)
    // var a
    // a = this.message.split("||")
    // this.ID_Q = a[0]
    // this.ID_p = a[1]

    this.productService.TRACKING_ANALYSIS_SELECT_QUESTION_BY_ID(this.ID_Q).subscribe((data: {}) => {
      console.log(data);
      this.Questiondata = data
      this.ANSWER_DETAIL = this.Questiondata[0].ANSWER_DETAIL
      this.ANSWER_SENT_TO= this.Questiondata[0].ANSWER_SENT_TO
      this.ANSWER_CC1_SENT_TO= this.Questiondata[0].ANSWER_CC1_SENT_TO
      this.ANSWER_CC2_SENT_TO= this.Questiondata[0].ANSWER_CC2_SENT_TO
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
      console.log(this.options)
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    // if (this.Questiondata[0].STATUS_QUESTION == "'Answered'") {
    //   this.isValid = true
    // }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  Gobefore() {
    // this.productService.changeMessage(this.ID_p)
    history.back()
    // window.location.href ='http://localhost:4200/Paddingreque?id='+this.ID_p 
  }

  Logout() {
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("EMPLOY_CODE");
    sessionStorage.removeItem("DEPARTMENT");
    location.reload();
  }


}
