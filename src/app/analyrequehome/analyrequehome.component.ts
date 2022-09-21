import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-analyrequehome',
  templateUrl: './analyrequehome.component.html',
  styleUrls: ['./analyrequehome.component.scss']
})
export class AnalyrequehomeComponent implements OnInit {
  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  table: any
  nextperson : any
  DataRessaerch : any

  panelOpenState = false;
  month: any = []
  name: any = []
  dep: any = [[]]
  dep2: any = [[], [], [], [], [], [], [], [], [], [], [], []]
  Sheet: any = []

  loading = true
  test = 0
  message = ""
  isValid = false

  searchre = ""
  thismonth : any

  public demo1TabIndex = 1;

  value = 'Clear me';

  constructor(public router: Router, public productService: ProductService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    // window.location.reload()

    this.productService.TRACKING_ANALYSIS_SELECT_ALL_ORDER_1().subscribe((data: {}) => {
      console.log(data);
      this.table = data
      this.productService.currentMessage.subscribe(message => this.message = message)

      var d = new Date();
      this.thismonth = d.getMonth();
      console.log(this.thismonth);

      this.demo1TabIndex = this.thismonth

      this.namelocal = localStorage.getItem("NAME");
      this.Codelocal = localStorage.getItem("EMPLOY_CODE");
      this.departmentlocal = localStorage.getItem("DEPARTMENT");

      if (this.namelocal != null) {
        this.isValid = true
        this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
      }
      var x
      var nameData

      for (x in this.table) {
        nameData = this.table[x].REVI_PAND_ISSUER.split("<");
        this.table[x].REVI_PAND_ISSUER = nameData[0]

        nameData = this.table[x].STETUS_PERSON.split("<");
        this.table[x].STETUS_PERSON = nameData[0]

        if (this.table[x].TITLE.length >= 40) {
          this.table[x].TITLE = this.table[x].TITLE.substring(0, 40) + " ..."
        }
      }
      this.loading = false
    })

  }

  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }

  addform() {
    this.router.navigate(['/Requestformfill'])
  }
  Logout() {
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }

  Gomyjob() {
    this.router.navigate(['/Myjob'])
  }
  Gonotcom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  Gocomplete(){
    this.router.navigate(['/AnahomeComplete'])
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
  
  Opennextpage(ID: any, STATUS_JOB: any) {
    console.log(STATUS_JOB)

    if (STATUS_JOB == '1') {
      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Paddingreque?id='+ID    
    } else if (STATUS_JOB == '2') {
      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Estistep?id='+ID   
    }
    else if (STATUS_JOB == '3') {
      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Estistep?id='+ID  
    }
    else if (STATUS_JOB == '4'||STATUS_JOB == '0') {
      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Esticost?id='+ID  
    }
    else if (STATUS_JOB == '5' ) {
      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id='+ID  
    }
    else if (STATUS_JOB == '6'||STATUS_JOB == '7'||STATUS_JOB == '8'||STATUS_JOB == '9'||STATUS_JOB == '10'  ) {
      window.location.href ='http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id='+ID  
    }
  }
  Search(){
    if(this.searchre != ""){
    this.productService.TRACKING_ANALYSIS_SELECT_SEARCH_BY_REQ(this.searchre).subscribe((data: {}) => {
      console.log(data);
      this.DataRessaerch = data
      console.log(this.DataRessaerch);

      var x
      var nameData2

      for (x in this.DataRessaerch) {
        nameData2 = this.DataRessaerch[x].REVI_PAND_ISSUER.split("<");
        this.DataRessaerch[x].REVI_PAND_ISSUER = nameData2[0]

        nameData2 = this.DataRessaerch[x].STETUS_PERSON.split("<");
        this.DataRessaerch[x].STETUS_PERSON = nameData2[0]

        if (this.DataRessaerch[x].TITLE.length >= 40) {
          this.DataRessaerch[x].TITLE = this.DataRessaerch[x].TITLE.substring(0, 40) + " ..."
        }
      }

    })
  }else{
    this.DataRessaerch = []
  }
}
}
