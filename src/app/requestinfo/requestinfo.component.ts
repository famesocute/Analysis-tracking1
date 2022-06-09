import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requestinfo',
  templateUrl: './requestinfo.component.html',
  styleUrls: ['./requestinfo.component.scss']
})
export class RequestinfoComponent implements OnInit {
  table : any
  confirmcc = ""
  controlcc = ""

  ComControl=""
  ccControl1=""
  ccControl2=""
  Analyzer=""
  DataRes : any

  message = ""

  sample1 : any
  sample2:any

  DataResQUESTION : any
  
  myControl = new FormControl();
  options: string[] = [ ];
  filteredOptions!: Observable<string[]>;

  EMAIL_CC: string[] = [];

  isValid = false

  loading = true
  userType : any

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog,private fb: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.EMAIL_CC[0] = ""
      console.log(this.EMAIL_CC);

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
      this.loading = false
      this.confirmcc = this.DataRes[0].REVI_PAND_CONFIRM_CC1.split(",");
      this.controlcc = this.DataRes[0].REVI_ANASEC_CONTROL_CC1.split(",");
      this.ComControl = this.DataRes[0].REVI_ANASEC_CONTROL_COM
      this.Analyzer = this.DataRes[0].REVI_ANASEC_ANAL

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
        console.log(this.DataResQUESTION)
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
    })

    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    console.log(this.namelocal)

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
    if(this.namelocal != null){
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
    }else (
      window.alert("Please login")
    )
   
  }
  GoEstiCost(){
  
  }
  GoAswer(ID:any){
    window.location.href ='http://localhost:4200/AnswerPage?id='+ID+'&usertype='+this.userType
  }
  GoAsweredit(ID:any){
    window.location.href ='http://localhost:4200/AnswerEdit?id='+ID+'&usertype='+this.userType
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
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
  GoBooking(){
    window.open ('http://localhost:4200/BooingEquip?id='+this.DataRes[0].ID);
  }
// window.open("http://localhost:4200/Steppadding?id="+this.DataRes[0].ID);
// window.location.href ='http://localhost:4200/BooingEquip?id='+this.DataRes[0].ID
}
