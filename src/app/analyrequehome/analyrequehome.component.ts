import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AnalyrequehomeListComponent } from '../dialog/analyrequehome-list/analyrequehome-list.component';


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
      }


      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));

      var x
      var y
      var nameData
      for (x in this.table) {
        this.month[x] = this.table[x].MONTH;

        nameData = this.table[x].REVI_PAND_ISSUER.split("<");
        this.name[x] = nameData[0]
      }


      console.log(this.month);
      console.log(this.dep2);



      this.month = [...new Set(this.month)];
      var count = 0
      for (y in this.month) {
        for (x in this.table) {
          console.log(this.table[x].MONTH);
          if (this.month[y] == this.table[x].MONTH) {
            this.dep2[y][count] = this.table[x].DEP_MENT
            count = count + 1
          }
        }
        count = 0
      }
      var i
      var z
      var t
      for (i in this.dep2) {
        this.dep2[i] = [...new Set(this.dep2[i])];
      }
      console.log(this.Sheet);
      console.log(this.month);
      console.log(this.dep2);

      var dataselect = "["
      var deparray = ["MT100", "MT300", "MT400", "MT500", "MT600", "MT700", "MT800", "MT900", "SGA"]
      var name = this.table[0].REVI_PAND_ISSUER.split("<");

      var Chk: any


      for (x in this.month) {
        for (y in this.dep2[x]) {
          dataselect = dataselect + "["
          for (z in this.table) {

            if (this.table[z].MONTH == this.month[x] && this.table[z].DEP_MENT == this.dep2[x][y]) {
              dataselect = dataselect + '{"REQ_NUM":"' + this.table[z].REQ_NUM + '",'
              dataselect = dataselect + '"TITLE":"' + this.table[z].TITLE + '",'
              dataselect = dataselect + '"REVI_PAND_ISSUER":"' + name[z] + '"},'

            }
          }
          dataselect = dataselect.substring(0, dataselect.length - 1);
          dataselect = dataselect + "],"
        }

      }


      dataselect = dataselect.substring(0, dataselect.length - 1);
      dataselect = dataselect + "]";
      console.log(dataselect)

      var obj = JSON.parse(dataselect);
      this.Sheet = obj
      console.log(this.Sheet)


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
}
