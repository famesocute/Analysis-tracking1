import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-esti-cost',
  templateUrl: './esti-cost.component.html',
  styleUrls: ['./esti-cost.component.scss']
})
export class EstiCostComponent implements OnInit {

  ComConfirm=""
  ccConfirm=""
  DataRes : any

  
  myControl = new FormControl();
  options: string[] = [ ];
  filteredOptions!: Observable<string[]>;

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog) { }

  ngOnInit(): void {
    
    this.productService.TRACKING_ANALYSIS_SELECT_ALL().subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
   onOpenDialogClick(){
    this.matDialog.open(QuestionComponent,{
      width : '500px'})
    
  }
  GoAswer(){
    this.router.navigate(['/AnswerPage']) 
  }

}
