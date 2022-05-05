import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-csresult',
  templateUrl: './csresult.component.html',
  styleUrls: ['./csresult.component.scss']
})
export class CSresultComponent implements OnInit {
 
  productForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    
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
