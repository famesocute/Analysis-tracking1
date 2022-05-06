import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';



@Component({
  selector: 'app-esti-step',
  templateUrl: './esti-step.component.html',
  styleUrls: ['./esti-step.component.scss']
})
export class EstiStepComponent implements OnInit {
  ComControl=""
  ccControl = ""
  Analyzer=""
  DataRes : any

  productForm: FormGroup;
  
  myControl = new FormControl();
  options: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>', 
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Pichayapak Nantasai <pichayapak.nan@murata.com>' ];
  filteredOptions!: Observable<string[]>;

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog,private fb: FormBuilder) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
   }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.productService.TRACKING_ANALYSIS_SELECT_ALL().subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })
    this.quantities().push(this.newQuantity());
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
   onOpenDialogClick(){
    this.matDialog.open(QuestionComponent,{
      width : '500px'})
    
  }
  GoEstiCost(){
    this.router.navigate(['/Esticost']) 
  }
  
  GoAswer(){
    this.router.navigate(['/AnswerPage']) 
  }

  // Add input
  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      Lotno: '',
      Samplename: '',

    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  // Event fired after view is initialized
 
  display(){
    console.log(this.productForm.value.quantities)
  }

}
