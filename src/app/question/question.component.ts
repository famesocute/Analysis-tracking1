import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ProductService } from '../api/product.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  table : any
  message =""
  ID =""
RequestNo = ""

  geterQution = ""
  CCgeterQution1 = ""
  CCgeterQution2 = ""
  Questioner : any
  Q_issueDate = ""
  Q_question = ""

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly : any

  isValid = false

  EMAIL_CC: string[] = [];

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor( private fb: FormBuilder, public router: Router, private location: Location, public productService: ProductService ) { }
  
ngOnInit(): void {
  this.Questioner = sessionStorage.getItem("NAME");
  
  this.productService.currentMessage.subscribe(message => this.message = message)
  console.log(this.message)

  this.EMAIL_CC[0] = ""
      console.log(this.EMAIL_CC);

  var a
  a= this.message.split("||")
  this.RequestNo = a[0]
  this.ID = a[1]

  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
  );

  this.productService.TRACKING_ANALYSIS_READ_EXCEL().subscribe((data: {}) => {
    console.log(data);
    this.table = data
    var dataselect = ""
    var x
      for(x in this.table){
          dataselect = dataselect +  this.table[x].DISPLAY_NAME + ' <'+  this.table[x].MAIL_ADDRESS +'>,'  
        
      }
      dataselect = dataselect.substring(0, dataselect.length - 1);

      const myArray = dataselect.split(",");

      this.options = myArray
  })
}
  private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

confirm(){
  let date: Date = new Date();
      var date2 = date.toLocaleString()
       this.Q_issueDate = date2.substring(0, 9)

  var qtest = ""
  qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`question` (`REQ_NUM`,`QUESTIONER`, `QUESTION_DETAIL`, `QUESTION_SENT_TO`, `QUESTION_CC1_SENT_TO`, `QUESTION_DATE`) " +
    " VALUES ('" + this.RequestNo + "', '" + this.Questioner + "', '" + this.Q_question + "', '" + this.geterQution + "', '" + this.EMAIL_CC + "', '" + this.Q_issueDate + "' );"

  this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
    console.log(data);

  })
  this.productService.changeMessage(this.ID)
}
goback(){
  this.productService.changeMessage(this.ID)
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

}
