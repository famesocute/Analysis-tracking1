import { Component, OnInit } from '@angular/core';
import { ProductService } from '../api/product.service';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-summaryresult',
  templateUrl: './summaryresult.component.html',
  styleUrls: ['./summaryresult.component.scss']
})
export class SummaryresultComponent implements OnInit {
  DataRes : any
  table : any

  confirmcc =""
  controlcc = ""
  Analycc = ""
  ComAnalyzer = ""
  Check = ""
  ComChack = ""
  chackcc = ""
  Confirm = ""
  comConfirm = ""
  Confirmcc = ""
  approval = ""
  comapproval = ""
  approvalcc = ""

  loading = true

  isValid1 = false
  isValid2 = false
  isValid3 = false
  isValid4 = false
  isValid5 = false
  isValid6 = false

  EMAIL_CC: string[] = [];

  myControl = new FormControl();
  options: string[] = [ ];
  filteredOptions!: Observable<string[]>;
  
  constructor(public productService: ProductService) { 
   }

  ngOnInit(): void {
    this.EMAIL_CC[0] = ""
      console.log(this.EMAIL_CC);

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(127).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      this.approvalcc = this.DataRes[0].REVI_REAPPROV_APPROV_CC.split(",");
      this.chackcc = this.DataRes[0].REVI_REAPPROV_CHECK_CC.split(",");
      this.Analycc = this.DataRes[0].REVI_ANASEC_ANAL_CC.split(",");
      this.confirmcc = this.DataRes[0].REVI_ANASEC_ANAL_CC.split(",");
      this.controlcc = this.DataRes[0].REVI_ANASEC_CONTROL_CC1.split(",");
      this.loading = false

      if(this.DataRes[0].STATUS_JOB == 5){
      this.isValid1 = true
      }
      else if(this.DataRes[0].STATUS_JOB == 6){
        if (this.DataRes[0].REVI_REAPPROV_CHECK == null || this.DataRes[0].REVI_REAPPROV_CHECK == "") {
          this.isValid2 = false
          this.NoCheckerApprov()
        }else {
          this.isValid2 = true
        }
        }
        else if(this.DataRes[0].STATUS_JOB == 7){        
          if (this.DataRes[0].REVI_REAPPROV_CONFIRM == null || this.DataRes[0].REVI_REAPPROV_CONFIRM == "") {
            this.isValid3 = false
            this.NoConfirmApprov()
          }else {
            this.isValid3 = true
          }
          }
          else if(this.DataRes[0].STATUS_JOB == 8){        
            if (this.DataRes[0].REVI_REAPPROV_APPROV == null || this.DataRes[0].REVI_REAPPROV_APPROV == "") {
              this.isValid4 = false
              this.NoApproverApprov()
            }else {
              this.isValid4 = true
            }
            }
          else if(this.DataRes[0].STATUS_JOB == 9){        
                this.isValid5 = true
          }
          else if(this.DataRes[0].STATUS_JOB == 10){        
            this.isValid6 = true
      }
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.productService.TRACKING_ANALYSIS_READ_EXCEL().subscribe((data: {}) => {
     
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
  AnalystApprove(){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '6', `REVI_REAPPROV_CHECK` = '" + this.Check + "', `REVI_REAPPROV_CONFIRM` = '" + this.Confirm + "', " +
        " `REVI_REAPPROV_APPROV` = '" + this.approval + "', `REVI_ANASEC_ANAL_COM` = '"+ this.ComAnalyzer +"', `REVI_ANASEC_ANAL_CC` = '"+ this.EMAIL_CC +"', `REVI_ANASEC_ANAL_TIME` = '"+ date2 +"' " +
        " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data); 
        location.reload();
      }) 
  }
  NoCheckerApprov(){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '7' " +
      " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
      location.reload();
    }) 
  }
  CheckerApprov(){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '7', `REVI_REAPPROV_CHECK_COM` = '" + this.ComChack + "', `REVI_REAPPROV_CHECK_CC` = '" + this.EMAIL_CC + "', " +
        " `REVI_REAPPROV_CHECK_TIME` = '" + date2 + "' " +
        " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data); 
        location.reload();
      }) 
  }

  NoConfirmApprov(){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '8' " +
      " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
      location.reload();
    }) 
  }

  ConfirmApprov(){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '8', `REVI_REAPPROV_CONFIRM_COM` = '" + this.comConfirm + "', `REVI_REAPPROV_CONFIRM_CC` = '" + this.EMAIL_CC + "', " +
        " `REVI_REAPPROV_CONFIRM_TIME` = '" + date2 + "' " +
        " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data); 
        location.reload();
      })
  }

  NoApproverApprov(){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '9' " +
      " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
      location.reload();
    }) 
  }
  ApproverApprov(){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '9', `REVI_REAPPROV_APPROV_COM` = '" + this.comapproval + "', `REVI_REAPPROV_APPROV_CC` = '" + this.EMAIL_CC + "', " +
        " `REVI_REAPPROV_APPROV_TIME` = '" + date2 + "' " +
        " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data); 
        location.reload();
      })
  }
  CsApprove(){
    
  }

}
