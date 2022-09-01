import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from '../../../api/product.service';

@Component({
  selector: 'app-pendding',
  templateUrl: './pendding.component.html',
  styleUrls: ['./pendding.component.scss']
})
export class PenddingComponent implements OnInit {
  DataRes : any
  message : any
  table : any

  ComIssuer = ""
  NameConfirm = ""
  NameControl = ""

  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;
  EMAIL_CC: string[] = [];

  loading = true

  myControl3 = new FormControl();
  options3: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Parawee Tassaneekati <parawee.tas@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>',
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Supakan Sriwichai <supakan.sriwi@murata.com>', 'Panudda Majan <panudda.maj@murata.com>',
    'Pichayapak Nantasai <pichayapak.nan@murata.com>'];
  filteredOptions3!: Observable<string[]>;

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
      if(this.DataRes[0].REVI_ANASEC_CONTROL != null){
         this.NameControl = this.DataRes[0].REVI_ANASEC_CONTROL;
      }if(this.DataRes[0].REVI_PAND_CONFIRM != null){
        this.NameConfirm = this.DataRes[0].REVI_PAND_CONFIRM;
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
            this.loading = false
        })    
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value)),
    );
    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter3(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options3.filter(option3 => option3.toLowerCase().includes(filterValue));

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
    // UPDATE `mtq10_project_tracking_analysis`.`data_all` SET `REVI_PAND_CONFIRM` = 'Pichayapak Nantsffsai <pichayapak.nan@murata.com>', `REVI_PAND_ISSUE_COM` = 'sdf', `REVI_PAND_ISSUE_CC` = 'Wanutsanun Hiasdang <wanutsanun.hin@murata.com>,' WHERE (`ID` = '143');
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `REVI_PAND_ISSUE_COM` = '" + this.ComIssuer + "',`STETUS_PERSON` = '" + this.NameConfirm + "',`REVI_PAND_ISSUE_CC` = '" + this.EMAIL_CC + "',`REVI_PAND_CONFIRM` = '" + this.NameConfirm + "',`REVI_ANASEC_CONTROL` = '" + this.NameControl + "' " +
      "  WHERE (`ID` = '"+this.DataRes[0].ID+"'); " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
    })

    var qtest2 = " "+this.NameConfirm+";||"+this.EMAIL_CC+"||Q-Analysis Request ->(Approve Request Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve request.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Paddingreque?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }

}
