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
      for (x in this.table) {
        nameData = this.table[x].REVI_PAND_ISSUER.split("<");
        this.table[x].REVI_PAND_ISSUER = nameData[0]
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

  Opennextpage(ID: any, STATUS_JOB: any) {
    console.log(STATUS_JOB)

    if (STATUS_JOB == '1') {
      this.productService.changeMessage(ID)
      this.router.navigate(['/Paddingreque'])
    } else if (STATUS_JOB == '2') {
      this.productService.changeMessage(ID)
      this.router.navigate(['/Estistep'])
    }
    else if (STATUS_JOB == '3') {
      this.productService.changeMessage(ID)
      this.router.navigate(['/Estistep'])
    }
    else if (STATUS_JOB == '4') {
      this.productService.changeMessage(ID)
      this.router.navigate(['/Esticost'])
    }
  }
}
