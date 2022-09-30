import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';
import { ApproverStepComponent } from '../dialog/approver-step/approver-step.component';
import { ActivatedRoute } from '@angular/router';
import { EditinfoComponent } from '../dialog/editinfo/editinfo.component'
import { ReEstiStepComponent } from '../dialog/edit_reviewer/re-esti-step/re-esti-step.component'
import { Re2EstiStepComponent } from '../dialog/edit_reviewer/re2-esti-step/re2-esti-step.component'

@Component({
  selector: 'app-esti-step',
  templateUrl: './esti-step.component.html',
  styleUrls: ['./esti-step.component.scss']
})
export class EstiStepComponent implements OnInit {
  table : any
  confirmcc = ""
  controlcc = ""

  ComControl=""
  ccControl1=""
  ccControl2=""
  Analyzer=""
  DataRes : any
  TECHNI = ""
  TECHNI2 = ""

  message = ""

  sample1 : any
  sample2:any

  productForm: FormGroup;

  DataResQUESTION : any
  
  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = [ ];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;

  EMAIL_CC: string[] = [];

  isValid = false
  isValid2 = true
  isvalidGoNaxt = true
  open = false

  loading = true
  userType : any

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  dataUpload : any
  dataUploadSETdata : any
  DataResFlie : any

  Fill_inital :any = "["
  section3 = "Fill_inital"
  Fill_initalchk = false

  checklotno = true

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog,private fb: FormBuilder,private route: ActivatedRoute) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
   }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.EMAIL_CC[0] = ""
      console.log(this.EMAIL_CC);
   
    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      if(this.DataRes[0].STATUS_JOB == 2 ||this.DataRes[0].STATUS_JOB == 3){
        this.open = true
      }else{
        window.location.href ='http://163.50.57.95:82/Tracking_Analysis/AnahomeNotcom'
      }
      

      if (this.DataRes[0].REVI_PAND_CONFIRM_CC1 != null) {
      this.confirmcc = this.DataRes[0].REVI_PAND_CONFIRM_CC1.split(",");
      }
      if (this.DataRes[0].REVI_ANASEC_CONTROL_CC1 != null) {
        this.controlcc = this.DataRes[0].REVI_ANASEC_CONTROL_CC1.split(",");
      }
      if (this.DataRes[0].REVI_ANASEC_CONTROL_COM != null) {
        this.ComControl = this.DataRes[0].REVI_ANASEC_CONTROL_COM
      }
      if (this.DataRes[0].REVI_ANASEC_ANAL != null) {
        this.Analyzer = this.DataRes[0].REVI_ANASEC_ANAL
      }
      if (this.DataRes[0].REQ_ANA_TECHNI2 != null) {
        this.TECHNI2 = this.DataRes[0].REQ_ANA_TECHNI2
      }
      if (this.DataRes[0].REQ_ANA_TECHNI != null) {
        this.TECHNI = this.DataRes[0].REQ_ANA_TECHNI
      }
      if (this.DataRes[0].STATUS_JOB == '3'){
        this.isValid2 = false
      }
      if (this.DataRes[0].STATUS_JOB == '3'){
        this.isvalidGoNaxt = false
      }

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
    
      this.productService.TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.DataResFlie = data
        var x 
        for(x in this.DataResFlie){
          if(this.DataResFlie[x].SECTION == "Fill_inital"){

            if((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "PNG" || (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "png"|| (this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3) == "jpg"){
              this.Fill_inital = this.Fill_inital + '{"FILENAME":"",'  
            }
            else{  
              this.Fill_inital = this.Fill_inital + '{"FILENAME":"' + this.DataResFlie[x].FILENAME + '",'
            }
            console.log((this.DataResFlie[x].FILENAME).substring(this.DataResFlie[x].FILENAME.length - 3))
            this.Fill_inital = this.Fill_inital + '"idupload_list":"' + this.DataResFlie[x].idupload_list + '",' 
            this.Fill_inital = this.Fill_inital + '"LINK":"http://163.50.57.95:84/' + this.DataResFlie[x].LINK + '"},'
          }
        }
        if(this.Fill_inital.length != 1){
          this.Fill_inital = this.Fill_inital.substring(0, this.Fill_inital.length - 1);
          this.Fill_inital = this.Fill_inital + "]";
          console.log(this.Fill_inital)

          if(this.Fill_inital != "]"){
          var obj = JSON.parse(this.Fill_inital);
           console.log(obj)
           this.Fill_inital = obj

          if(this.Fill_inital != "]"){
            this.Fill_initalchk = true
          }
        }
        
        }
        this.loading = false
      }) 
    })
 
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

    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value)),
    );

    this.quantities().push(this.newQuantity());

    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

   onOpenDialogClick(){
    if (this.namelocal != null) {
      this.productService.changeMessage(this.DataRes[0].REQ_NUM + "||" + this.DataRes[0].ID)
      const dialogRef = this.matDialog.open(QuestionComponent, {
        disableClose: true,
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);

      });
    } else (
      window.alert("Please login")
    )
  }
  save(){
    if(this.namelocal == this.DataRes[0].REVI_ANASEC_CONTROL){
      if(this.Analyzer != ""){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET `STATUS_JOB` = '3', `STETUS_PERSON` = '" + this.Analyzer + "', `REVI_ANASEC_ANAL` = '" + this.Analyzer + "', " +
        " `REVI_ANASEC_CONTROL_COM` = '" + this.ComControl + "', `REVI_ANASEC_CONTROL_CC1` = '"+ this.EMAIL_CC +"', `REVI_ANASEC_CONTROL_TIME` = '"+ date2 +"' " +
        " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data); 
      }) 
      
    
      var qtest2 = " "+this.Analyzer+";||"+this.EMAIL_CC+"||Q-Analysis Request ->(Estimate Step Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please estimate step. Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Estistep?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })

      this.productService.changeMessage(this.DataRes[0].ID)
      const dialogRef = this.matDialog.open(ApproverStepComponent, {
        disableClose : true,
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result );

      this.isValid2 = false
      this.isvalidGoNaxt = false

      this.ngOnInit()
      });
    }else{
      alert('Please fill analyzer name')
    }
    }else{
      alert('Only Controller Approve')
    }
  }

  GoEstiCost(){
    if(this.namelocal == this.DataRes[0].REVI_ANASEC_ANAL){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    console.log(this.productForm.value.quantities)

    var val2 = ""
    for (var val in this.productForm.value.quantities) {
      console.log(val);


      if(this.productForm.value.quantities[val].Technique == ''){
        window.alert("Please fill technique at least 1 technique")
        this.checklotno = false
        break;
      }else{
        this.checklotno = true
      }

      val2 = val2 + this.productForm.value.quantities[val].Technique + "||" + this.productForm.value.quantities[val].Samplenumber +"||" + "initial" +"[]"
    }
    val2 = val2.substring(0, val2.length - 2);
    console.log(val2)

    if(this.checklotno == true){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET  `PRE_ESTI_TECHNIQUE` = '" + val2 + "',`ESTI_STEP_TIME` = '" + date2 + "',`STETUS_PERSON` = '" + this.DataRes[0].REVI_PAND_ISSUER + "', `STATUS_JOB` = '4' " +
      " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
      this.router.navigate(['/Analyrequehome']) 
    })

    var qtest2 = " "+this.DataRes[0].REVI_PAND_ISSUER+";||"+this.EMAIL_CC+";"+this.DataRes[0].REVI_PAND_CONFIRM+"||Q-Analysis Request ->(Estimate Cost Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please approve estimate cost. Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Esticost?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }
  }else{
    alert('Only Analyst Approve')
  }
  }
  GoAswer(ID:any){
    window.location.href ='http://163.50.57.95:82/Tracking_Analysis/AnswerPage?id='+ID+'&usertype='+this.userType
  }
  GoAsweredit(ID:any){
    window.location.href ='http://163.50.57.95:82/Tracking_Analysis/AnswerEdit?id='+ID+'&usertype='+this.userType
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
  }
  GoAnaNoCom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  GoEquip(){
    this.router.navigate(['/Equipment'])
  }
  KPI(){
    if(this.departmentlocal == 'MTQ00'){
      this.router.navigate(['/KPIOperation'])
    }else{
        window.alert("Only Q30 member")
   }
  }
  Daily(){
    if(this.departmentlocal == 'MTQ00'){
      this.router.navigate(['/Dailyjob'])
    }else{
        window.alert("Only Q30 member")
   }
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

  // Add input
  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      Technique: '',
      Samplenumber: '',

    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  Logout(){
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  myFunction() {
    window.open("http://163.50.57.95:82/Tracking_Analysis/Steppadding?id="+this.DataRes[0].ID);
  }
  editinfo(){
    if (this.namelocal == this.DataRes[0].REVI_PAND_ISSUER || this.namelocal == this.DataRes[0].REVI_ANASEC_ANAL) {
    this.productService.changeMessage(this.DataRes[0].ID)
      const dialogRef = this.matDialog.open(EditinfoComponent, {
        disableClose : true,
        width: '1500px',
        height: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result );

      this.ngOnInit()
      });
    }else{
      window.alert("ํYou can't edit this request")
 }
    
}
editreviewer1(){
  this.productService.changeMessage(this.DataRes[0].ID)
  const dialogRef = this.matDialog.open(ReEstiStepComponent, {
    disableClose : true,
    width: '1500px',
    height: '700px'
  });
  dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  console.log(result );

  location.reload();
  });
}
editreviewer2(){
  this.productService.changeMessage(this.DataRes[0].ID)
  const dialogRef = this.matDialog.open(Re2EstiStepComponent, {
    disableClose : true,
    width: '1500px',
    height: '700px'
  });
  dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  console.log(result );

  location.reload();
  });
}
deletefile(x:any){
  this.productService.TRACKING_ANALYSIS_DELETE_FILE(x).subscribe((data: {}) => {
    console.log(data);
    location.reload();
  })
}
}
