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

      this.namelocal = localStorage.getItem("NAME");
      this.Codelocal = localStorage.getItem("EMPLOY_CODE");
      this.departmentlocal = localStorage.getItem("DEPARTMENT");

      if (this.namelocal != null) {
        this.isValid = true
        this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
      }

    

      var x
      // var y
      var nameData 
      for (x in this.table) {
        this.month[x] = this.table[x].MONTH;

        nameData = this.table[x].REVI_PAND_ISSUER.split("<");
        this.table[x].REVI_PAND_ISSUER = nameData[0]
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
  onOpenpading(ID: any) {
    this.productService.changeMessage(ID)
    this.router.navigate(['/Paddingreque'])
  }

  Logout(){
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }

  Gomyjob(){
    this.router.navigate(['/Myjob'])
  }
}
