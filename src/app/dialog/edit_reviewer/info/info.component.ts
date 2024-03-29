import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from '../../../api/product.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  DataRes : any
  message : any
  table : any

  ComIssuer = ""
  NameConfirm = ""
  Check = ""
  Confirm = ""
  approval = ""
  ComAnalyzer = ""
  controlcc = ""
  confirmcc = ""
  analyzer = ""

  ID = ""
  order =""

  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControl4 = new FormControl();
  myControl5 = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;
  filteredOptions3!: Observable<string[]>;
  filteredOptions4!: Observable<string[]>;
  filteredOptions5!: Observable<string[]>;
  EMAIL_CC: string[] = [];

  loading = true

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    var a
    a= this.message.split("||")
    this.ID = a[0]
    this.order = a[1]
    console.log(this.order)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.ID).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      if (this.DataRes[0].REVI_ANASEC_ANAL_COM != null) {
        this.ComAnalyzer = this.DataRes[0].REVI_ANASEC_ANAL_COM;
        }
      if (this.DataRes[0].REVI_ANASEC_CONTROL_CC1 != null) {
          this.controlcc = this.DataRes[0].REVI_ANASEC_CONTROL_CC1.split(",");
       }
       if (this.DataRes[0].REVI_ANASEC_ANAL_CC != null) {
        this.confirmcc = this.DataRes[0].REVI_ANASEC_ANAL_CC.split(",");
      }
      if (this.DataRes[0].REVI_ANASEC_ANAL != null) {
        this.analyzer = this.DataRes[0].REVI_ANASEC_ANAL;
      }
      if (this.DataRes[0].REVI_REAPPROV_CHECK != null) {
        this.Check = this.DataRes[0].REVI_REAPPROV_CHECK;
      }
      if (this.DataRes[0].REVI_REAPPROV_CONFIRM != null) {
        this.Confirm = this.DataRes[0].REVI_REAPPROV_CONFIRM;
      }
      if (this.DataRes[0].REVI_REAPPROV_APPROV != null) {
        this.approval = this.DataRes[0].REVI_REAPPROV_APPROV;
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
    this.filteredOptions4 = this.myControl4.valueChanges.pipe(
      startWith(''),
      map(value => this._filter4(value)),
    );
    this.filteredOptions5 = this.myControl5.valueChanges.pipe(
      startWith(''),
      map(value => this._filter5(value)),
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

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter4(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter5(value: string): string[] {
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
      " SET `REVI_REAPPROV_CHECK` = '" + this.Check + "', `REVI_REAPPROV_CONFIRM` = '" + this.Confirm + "', `REVI_ANASEC_ANAL` = '" + this.analyzer + "', " +
      " `REVI_REAPPROV_APPROV` = '" + this.approval + "', `REVI_ANASEC_ANAL_COM` = '" + this.ComAnalyzer + "',"+
      " `REVI_ANASEC_ANAL_CC` = '" + this.EMAIL_CC + "'"+
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
    })

    if(this.order == '1'){
      var qtest2 = " "+this.Check+";||"+this.EMAIL_CC+"||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data); 
      })
    }else if(this.order == '2'){
      var qtest2 = " "+this.Confirm+";||"+this.EMAIL_CC+"||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data); 
      })
    }else if(this.order == '3'){
      var qtest2 = " "+this.approval+";||"+this.EMAIL_CC+"||Q-Analysis Request Report ->(Approve Report Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve report.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
      console.log(qtest2);
      this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
        console.log(data); 
      })
    }
    
  }
}
