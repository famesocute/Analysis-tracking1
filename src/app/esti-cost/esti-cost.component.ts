import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../question/question.component';
import { EstistepEditComponent } from '../dialog/estistep-edit/estistep-edit.component'
import { ActivatedRoute } from '@angular/router';
import { EditinfoComponent } from '../dialog/editinfo/editinfo.component'

@Component({
  selector: 'app-esti-cost',
  templateUrl: './esti-cost.component.html',
  styleUrls: ['./esti-cost.component.scss']
})
export class EstiCostComponent implements OnInit {

  table : any
  confirmcc = ""
  controlcc = ""
  reasondecline : any

  ComControl=""
  ccControl1=""
  ccControl2=""
  Analyzer=""
  DataRes : any
  DataResAllocation : any
 Allocation : any

  message = ""

  sample1 : any
  sample2:any
  sam1 : any
  sam2 : any

  DataResQUESTION : any
  
  myControl = new FormControl();
  options: string[] = [ ];
  filteredOptions!: Observable<string[]>;

  EMAIL_CC: string[] = [];

  isValid = false
  isvalideditstep = true
  open = false

  loading = true
  userType : any

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  totalhr : any
  Totalcost = 0

  dataUpload : any
  dataUploadSETdata : any
  DataResFlie : any

  Fill_inital :any = "["
  section3 = "Fill_inital"
  Fill_initalchk = false

  constructor(public router: Router,  public productService: ProductService,private matDialog: MatDialog,private fb: FormBuilder,private route: ActivatedRoute) { 
   
  }

  ngOnInit(): void {

    this.EMAIL_CC[0] = ""
      console.log(this.EMAIL_CC);

      this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)
    // this.userType = this.message

      this.userType = this.route.snapshot.queryParamMap.get("id");
      console.log(this.userType)
   
    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      if(this.DataRes[0].STATUS_JOB == 4 || this.DataRes[0].STATUS_JOB == 0){
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

      if(this.DataRes[0].STATUS_JOB == 4){
        this.isvalideditstep = true
      }else if(this.DataRes[0].STATUS_JOB == 0){
        this.isvalideditstep = false
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

        this.productService.TRACKING_ANALYSIS_SELECT_ALLOCATION_ALL().subscribe((data: {}) => {
          console.log(data);
          this.DataResAllocation = data
          console.log(this.DataResAllocation)
  

          this.sam1 = this.DataRes[0].PRE_ESTI_TECHNIQUE.split("[]")
          console.log(this.sam1)

          var x :any
          var y : any
          var a : any
          var Operation_Charge : any
          var Estimate_Cost:any
          this.sam2 = "["
          console.log( this.DataRes[0].DEP_MENT.substring(3));

          for (x in this.sam1) {
            a = this.sam1[x].split("||")

            console.log( this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0]));
            this.Allocation = this.DataResAllocation.find((item: { EQUIPMENT: any; }) => item.EQUIPMENT === a[0])

            for(y in this.DataResAllocation){
              
              if (a[0] == this.DataResAllocation[y].EQUIPMENT){
              
                if(this.DataRes[0].DEP_MENT.substring(3) == "A0"){
                  Operation_Charge = ((a[1] * this.DataResAllocation[y].TIME_PER_PIECE)/60)*this.DataResAllocation[y].MTXA0
                }
                else{
                  Operation_Charge = ((a[1] * this.DataResAllocation[y].TIME_PER_PIECE)/60)*this.DataResAllocation[y].MTX00
                }
              }

            }
            Estimate_Cost = parseFloat(Operation_Charge) + parseFloat(this.Allocation.BASIC_CHARGE)
            console.log(Estimate_Cost)
            this.Totalcost =  this.Totalcost  +  Estimate_Cost
            console.log(this.Totalcost)

            x =  parseInt(x)+1
            this.sam2 = this.sam2 + '{"step":"' + x+ '",'
            this.sam2 = this.sam2 + '"equip":"' + a[0] + '",'
            this.sam2 = this.sam2 + '"quantity":"' + a[1] + '",'
            this.sam2 = this.sam2 + '"basiccharge":"' + this.Allocation.BASIC_CHARGE + '",'
            this.sam2 = this.sam2 + '"operationcharge":"' + Operation_Charge.toFixed(2) + '",'
            this.sam2 = this.sam2 + '"estimatecost":"' + Estimate_Cost.toFixed(2) + '"},'
            
          }
    
          this.sam2 = this.sam2.substring(0, this.sam2.length - 1);
          this.sam2 = this.sam2 + "]";
          console.log(this.sam2)
          var obj = JSON.parse(this.sam2);
          this.sam2 = obj
          console.log(this.sam2)
        }) 
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

    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }
    console.log(this.namelocal)


    
  }
  private _filter(value: string): string[] {
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
  onOpenDialogClickeditstep(){
    this.productService.changeMessage(this.DataRes[0].ID)
    const dialogRef = this.matDialog.open(EstistepEditComponent, {
      disableClose : true,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log(result );

    var qtest2 = " "+this.DataRes[0].REVI_PAND_CONFIRM+";||||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Esticost?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })

    location.reload()
    }); 
  }
  GoRequeinfo(){
    if(this.namelocal == this.DataRes[0].REVI_PAND_CONFIRM){
    let date: Date = new Date();
    var date2 = date.toLocaleString()

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET  `STATUS_JOB` = '5', `ESTI_COST_TIME` = '"+ date2 +"',`ESTI_TECHNIQUE` = '"+ this.DataRes[0].PRE_ESTI_TECHNIQUE +"',`STETUS_PERSON` = '"+ this.DataRes[0].REVI_ANASEC_ANAL +"'  " +
      " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
      this.router.navigate(['/Analyrequehome']) 
    })
 
    var qtest2 = " "+this.DataRes[0].REVI_ANASEC_ANAL+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }else(
    alert('Only Confirm Approve')
  )
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
  decline(){
    if(this.namelocal == this.DataRes[0].REVI_PAND_CONFIRM){ 

    this.reasondecline = prompt('Why are you deline? ');
      console.log(this.reasondecline);
      if(this.reasondecline == null || this.reasondecline == ""){
        window.alert("Please give a reason")
      }else{
        this.isvalideditstep = false
        var qtest = ""
         qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
           " SET  `STATUS_JOB` = '0',`STETUS_PERSON` = '"+ this.DataRes[0].REVI_ANASEC_ANAL +"',`REASON_DELINE` = '"+ this.reasondecline +"' " +
           " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
         console.log(qtest);
         this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
           console.log(data);
           location.reload();
       })
     
       var qtest2 = " "+this.DataRes[0].REVI_ANASEC_ANAL+";||"+this.EMAIL_CC+"||Quality Analysis Request Report ->"+this.DataRes[0].TITLE+"||Please click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Esticost?id="+this.DataRes[0].ID+" "
       console.log(qtest2);
       this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
         console.log(data);

       })
      }
      }else{
        window.alert("Only Confirm Decline")
      }
    
}
editinfo(){
  
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
}
deletefile(x:any){
  this.productService.TRACKING_ANALYSIS_DELETE_FILE(x).subscribe((data: {}) => {
    console.log(data);
    location.reload();
  })
}
}
