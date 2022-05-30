import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myjob',
  templateUrl: './myjob.component.html',
  styleUrls: ['./myjob.component.scss']
})
export class MyjobComponent implements OnInit {
  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  isValid = false

  loading = true

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.loading = false

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
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


}
