import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-anahome-complete',
  templateUrl: './anahome-complete.component.html',
  styleUrls: ['./anahome-complete.component.scss']
})
export class AnahomeCompleteComponent implements OnInit {
  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  table: any
  nextperson : any

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

  constructor(public router: Router, public productService: ProductService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.TRACKING_ANALYSIS_SELECT_ALL_ORDER().subscribe((data: {}) => {
      console.log(data);
      this.table = data
      this.productService.currentMessage.subscribe(message => this.message = message)

      this.namelocal = sessionStorage.getItem("NAME");
      this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
      this.departmentlocal = sessionStorage.getItem("DEPARTMENT");

      if (this.namelocal != null) {
        this.isValid = true
        this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
      }
      var x
      var nameData
      var nameData2

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
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("EMPLOY_CODE");
    sessionStorage.removeItem("DEPARTMENT");
    location.reload();
  }

  Gomyjob() {
    this.router.navigate(['/Myjob'])
  }
  Gonotcom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  GoAnaNoCom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  pending(){
    this.router.navigate(['/Analyrequehome'])
  }
  Opennextpage(ID: any, STATUS_JOB: any) {
    console.log(STATUS_JOB)

    if (STATUS_JOB == '1') {
      window.location.href ='http://localhost:4200/Paddingreque?id='+ID    
    } else if (STATUS_JOB == '2') {
      window.location.href ='http://localhost:4200/Estistep?id='+ID   
    }
    else if (STATUS_JOB == '3') {
      window.location.href ='http://localhost:4200/Estistep?id='+ID  
    }
    else if (STATUS_JOB == '4'||STATUS_JOB == '0') {
      window.location.href ='http://localhost:4200/Esticost?id='+ID  
    }
    else if (STATUS_JOB == '5' ) {
      window.location.href ='http://localhost:4200/Requestinfo?id='+ID  
    }
    else if (STATUS_JOB == '6'||STATUS_JOB == '7'||STATUS_JOB == '8'||STATUS_JOB == '9'||STATUS_JOB == '10'  ) {
      window.location.href ='http://localhost:4200/Requestinfo?id='+ID  
    }
  }
}
