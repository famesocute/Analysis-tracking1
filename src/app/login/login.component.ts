import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Employcode: any
  Password: any

  table: any

  constructor(public router: Router, public productService: ProductService) { }

  ngOnInit(): void {
  }
  Gosignup() {
    this.router.navigate(['/Signup'])
  }
  login() {
    this.productService.TRACKING_ANALYSIS_CHKPASS_LOGIN(this.Employcode, this.Password).subscribe((data: {}) => {
      console.log(data);
      this.table = data
      if (this.table[0].ID != 0) {
        sessionStorage.setItem("NAME", this.table[0].NAME);
        sessionStorage.setItem("EMPLOY_CODE", this.table[0].EMPLOY_CODE);
        sessionStorage.setItem("DEPARTMENT", this.table[0].DEPARTMENT);
        this.router.navigate(['/Analyrequehome'])
      } else {
        window.alert("Wrong enployee code or password.")
      }


    })

  }

}
