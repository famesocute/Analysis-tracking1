import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'  

@Component({
  selector: 'app-requestformfill',
  templateUrl: './requestformfill.component.html',
  styleUrls: ['./requestformfill.component.scss']
})
export class RequestformfillComponent implements OnInit {

   
  myControl = new FormControl();
  options: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>', 
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Pichayapak Nantasai <pichayapak.nan@murata.com>' ];
  filteredOptions!: Observable<string[]>;

  Title = ""
  Background = ""
  Purpose =""
  Hypothesis=""
  Analysistype = ""
  IssueDate=""
  Requester=""
  Phone=""
  Department=""
  Product="" 
  RequestTech=""
  Numsample=0
  Sendsampledate=""
  EepectedDate =""
  Piority=""
  Reason="" 
  Lotno=""
  Samplename=""
  Remarks=""
  AnaComment=""
  Dangerous=""
  SamAftertest=""
  Relatedmatters=""
  KeywordCharact=""
  KeywordState=""
  KeywordPheno=""
  NameIssuer=""
  ComIssuer=""
  ccIssuer=""
  NameConfirm=""
  NameControl=""
 
  activate : boolean = false

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

  constructor(public router: Router,private fb:FormBuilder) {
    this.productForm = this.fb.group({  
   
      quantities: this.fb.array([]) ,  
    });  
   }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  // Add input
  quantities() : FormArray {  
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
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }   

    // seach box
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // Navi to Question
  NavQuestion(){
    this.router.navigate(['/Question'])
   }
  //  Retio tool
  getdata(value: any){
    this.Analysistype = value  
  }
  getdatadan(value: any){
    this.Dangerous = value  
  }
  getdataSamAf(value: any){
    this.SamAftertest = value 
  }

  // check box

  other: any // check box other
  comment = "" // ช่อง input other
  AnsMany() {
    this.RequestTech = ""

    // console.log(this.other, this.comment)

    var i
    var count = 0
    
    for (i in this.Tech) {
      count = count + 1
      if (this.Tech[i].check == true) {
        this.RequestTech = this.RequestTech + this.Tech[i].data + ","
      }
    }
  }
  // AnsOther() {
  //   this.RequestTech = this.RequestTech + this.other
  // }


  display(){
    // this.RequestTech = this.RequestTech + this.other
    console.log(this.Title);
    console.log(this.Background);
    console.log(this.Purpose);
    console.log(this.Hypothesis);
    console.log(this.Analysistype);
    console.log(this.Phone);
    console.log(this.Requester);
    console.log(this.Department);
    console.log(this.Product);
    console.log(this.RequestTech);
    console.log(this.Numsample);
    console.log(this.Sendsampledate);
    console.log(this.EepectedDate);
    console.log(this.Piority);
    console.log(this.Reason);
    console.log(this.productForm.value); 
    console.log(this.AnaComment);
    console.log(this.Dangerous);
    console.log(this.SamAftertest);
    console.log(this.KeywordCharact);
    console.log(this.KeywordState);
    console.log(this.KeywordPheno);
    console.log(this.NameIssuer);
    console.log(this.ComIssuer);
    console.log(this.ccIssuer);
    console.log(this.NameConfirm);
    console.log(this.NameControl);
  }

  
}
