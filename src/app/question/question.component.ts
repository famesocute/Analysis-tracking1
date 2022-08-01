import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import { SendmailQuestionComponent } from "../dialog/sendmail-question/sendmail-question.component"

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
  DataRes : any

  isValid = false

  EMAIL_CC: string[] = [];

  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;

  constructor( private fb: FormBuilder, public router: Router, private location: Location, public productService: ProductService,private matDialog: MatDialog ) { }
  
ngOnInit(): void {
  this.Questioner = localStorage.getItem("NAME");
  
  this.productService.currentMessage.subscribe(message => this.message = message)
  console.log(this.message)

  this.EMAIL_CC[0] = ""
      console.log(this.EMAIL_CC);

  var a
  a= this.message.split("||")
  this.RequestNo = a[0]
  this.ID = a[1]

  this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(a[1]).subscribe((data: {}) => {
    console.log(data);
    this.DataRes = data
  })

  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
  );
  this.filteredOptions2 = this.myControl2.valueChanges.pipe(
    startWith(''),
    map(value => this._filter2(value)),
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
private _filter2(value: string): string[] {
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
    
    this.productService.changeMessage(this.geterQution+'||'+this.EMAIL_CC+'||'+this.DataRes[0].TITLE+'||'+this.DataRes[0].ID)
    const dialogRef = this.matDialog.open(SendmailQuestionComponent, {
      disableClose : true,
      width: '500px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result );

    location.reload();
    });
  })
}
goback(){
  
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
