import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';



@Component({
  selector: 'app-paddingreque',
  templateUrl: './paddingreque.component.html',
  styleUrls: ['./paddingreque.component.scss']
})
export class PaddingrequeComponent implements OnInit {

  ComConfirm=""
  ccConfirm=""
  DataRes : any
 
  
  myControl = new FormControl();
  options: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>', 
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Pichayapak Nantasai <pichayapak.nan@murata.com>' ];
  filteredOptions!: Observable<string[]>;

  constructor(public router: Router,  public productService: ProductService) {
   }
   
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.productService.TRACKING_ANALYSIS_SELECT_DATA().subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  display(){
     console.log(this.ComConfirm);
     console.log(this.ccConfirm);
   }
}

