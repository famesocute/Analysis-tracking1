import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';


@Component({
  selector: 'app-paddingreque',
  templateUrl: './paddingreque.component.html',
  styleUrls: ['./paddingreque.component.scss']
})
export class PaddingrequeComponent implements OnInit {
  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  isValid = false

  table : any

  ComConfirm=""
  ccConfirm=""
  DataRes : any
  DataResQUESTION : any
  message = ""


  sample1 : any
  sample2 : any

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  EMAIL_CC: string[] = [];

  loading = true

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.EMAIL_CC[0] = ""
    console.log(this.EMAIL_CC);

    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)
    // this.message = "123"

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
      this.loading = false
      this.ComConfirm = this.DataRes[0].REVI_PAND_CONFIRM_COM
      this.ccConfirm = this.DataRes[0].REVI_PAND_CONFIRM_CC1
      
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

      this.productService.TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResQUESTION = data
        console.log(this.DataResQUESTION);

      })
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
     
    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

   onOpenDialogClick(){
    this.productService.changeMessage(this.DataRes[0].REQ_NUM + "||"+this.DataRes[0].ID)
      const dialogRef = this.matDialog.open(QuestionComponent, {
        disableClose : true,
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result );

      this.ngOnInit()
      });
    
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
  }
  GoAswer(ID:any){
    this.productService.changeMessage(ID + "|| " + this.message)
    this.router.navigate(['/AnswerPage']) 
  }
  GoAsweredit(ID:any){
    this.productService.changeMessage(ID + "|| " + this.message)
    this.router.navigate(['/AnswerEdit']) 
  }

  GoEstiStep(){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    console.log(this.DataRes[0].REVI_ANASEC_CONTROL)
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `STATUS_JOB` = '2',`STETUS_PERSON` = '" + this.DataRes[0].REVI_ANASEC_CONTROL + "',`REVI_PAND_CONFIRM_COM` = '" + this.ComConfirm + "', " +
      " `REVI_PAND_CONFIRM_CC1` = '"+ this.EMAIL_CC +"', `REVI_ANASEC_CONTROL_TIME` = '"+ date2 +"' " +
      "  WHERE (`ID` = '"+this.DataRes[0].ID+"'); " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
    })
    this.router.navigate(['/Analyrequehome']) 
    this.productService.changeMessage(this.DataRes[0].ID)
   
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

   myFunction() {
    window.open("http://localhost:4200/Steppadding?id="+this.DataRes[0].ID);
  }
  Logout(){
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("EMPLOY_CODE");
    sessionStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  
}

