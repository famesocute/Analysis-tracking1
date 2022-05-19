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

  isValid = false

  table : any

  ComControl=""
  ccControl1=""
  ccControl2=""
  Analyzer=""
  DataRes : any

  message = ""

  sample1 : any
  sample2:any

  productForm: FormGroup;
  
  myControl = new FormControl();
  options: string[] = [ ];
  filteredOptions!: Observable<string[]>;

  loading = true

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog,private fb: FormBuilder) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
   }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
   
    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
      this.loading = false
      
      this.sample1 = this.DataRes[0].SAM_NAME.split("[]")
      console.log(this.sample1)
      var x
      var a

      this.sample2 = "["

      for(x in this.sample1)
      {
        a = this.sample1[x].split("||")
        this.sample2 = this.sample2 + '{"Lot_no":"' + a[0] + '",'
        this.sample2 = this.sample2 + '"Sample_name":"' + a[1] + '",'
        this.sample2 = this.sample2 + '"Remarks":"' +a[2] + '"},'

      }
      this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
      this.sample2 =  this.sample2 + "]";
      console.log( this.sample2)

      var obj = JSON.parse( this.sample2);
      this.sample2 = obj
      console.log( this.sample2)
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
  save(){
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `REVI_ANASEC_ANAL` = '" + this.Analyzer + "',`REVI_ANASEC_CONTROL_COM` = '" + this.ComControl + "', `REVI_ANASEC_CONTROL_CC1` = '"+ this.ccControl1 +"', " +
        " `REVI_ANASEC_CONTROL_CC2` = '" + this.ccControl2 + "' WHERE (`ID` = '"+this.DataRes[0].ID+"'); " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data); 
      }) 
      this.productService.changeMessage(this.DataRes[0].ID)

      this.isValid = true
  }

  GoEstiCost(){
    this.router.navigate(['/Esticost']) 
  }
  
  GoAswer(){
    this.router.navigate(['/AnswerPage']) 
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
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
