import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from '../../../api/product.service';

@Component({
  selector: 'app-re-esti-step',
  templateUrl: './re-esti-step.component.html',
  styleUrls: ['./re-esti-step.component.scss']
})
export class ReEstiStepComponent implements OnInit {
  DataRes : any
  message : any
  table : any

  ComIssuer = ""
  NameConfirm = ""
  ComConfirm = ""

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  EMAIL_CC: string[] = [];

  loading = true

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      if (this.DataRes[0].REVI_PAND_ISSUE_COM != null) {
        this.ComIssuer = this.DataRes[0].REVI_PAND_ISSUE_COM;
      }
      if (this.DataRes[0].REVI_PAND_CONFIRM_COM != null) {
        this.ComConfirm = this.DataRes[0].REVI_PAND_CONFIRM_COM;
      }

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
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.loading = false
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  edit(){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `REVI_PAND_CONFIRM_COM` = '" + this.ComConfirm + "',`REVI_PAND_CONFIRM_CC1` = '" + this.EMAIL_CC + "',`STETUS_PERSON` = '" + this.ComConfirm + "' " +
      "  WHERE (`ID` = '"+this.DataRes[0].ID+"'); " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
    })

    var qtest2 = " "+this.DataRes[0].REVI_PAND_CONFIRM+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
}
