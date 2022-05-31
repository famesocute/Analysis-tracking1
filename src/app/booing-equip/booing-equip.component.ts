import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booing-equip',
  templateUrl: './booing-equip.component.html',
  styleUrls: ['./booing-equip.component.scss']
})
export class BooingEquipComponent implements OnInit{

  isValid = false

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly : any
 
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    if (this.departmentlocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    } else {
      window.alert("กรุณา login")
      this.router.navigate(['/Requestinfo'])
    }
  }

  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
  Logout(){
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("EMPLOY_CODE");
    sessionStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Goanalysishome(){
    this.router.navigate(['/Analyrequehome']) 
  }
}
