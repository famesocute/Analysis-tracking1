import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';  
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common'


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  geterQution=""
  CCgeterQution =""
  Questioner=""
  Q_issueDate=""
  Q_question=""

  myControl = new FormControl();
  options: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>', 
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Pichayapak Nantasai <pichayapak.nan@murata.com>' ];
  filteredOptions!: Observable<string[]>;

  constructor(private fb:FormBuilder,public router: Router,private location: Location) { 

  } 

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  NavAnaformfill(){
    this.router.navigate(['/Requestformfill'])
   }
 

}
