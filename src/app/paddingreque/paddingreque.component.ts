import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';


@Component({
  selector: 'app-paddingreque',
  templateUrl: './paddingreque.component.html',
  styleUrls: ['./paddingreque.component.scss']
})
export class PaddingrequeComponent implements OnInit {
  table : any

  ComConfirm=""
  ccConfirm1=""
  ccConfirm2=""
  DataRes : any
  message = ""
 
  
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;



  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog) {
   }
   loading = true
  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
   
    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
      this.loading = false
     
    })

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
        console.log(this.options)
    })
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
     
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  display(){
     console.log(this.ComConfirm);
     console.log(this.ccConfirm1);
     console.log(this.ccConfirm2);
   }
   onOpenDialogClick(){
    this.matDialog.open(QuestionComponent,{
      width : '500px'})
    
  }
  GoAswer(){
    this.router.navigate(['/AnswerPage']) 
  }
  GoEstiStep(){
    var qtest = ""
    qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`data_all` " +
      "(`REVI_PAND_CONFIRM_COM`,`REVI_PAND_CONFIRM_CC1`,`REVI_PAND_CONFIRM_CC2`) " +
      " VALUES ('" + this.ComConfirm + "', '" + this.ccConfirm1 + "', '" + this.ccConfirm2 + "' );"
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
    })
    this.router.navigate(['/Estistep']) 
  }

}

