import { Component, OnInit } from '@angular/core';
import { ProductService } from '../api/product.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  Employeecode=""
  Department=""
  Name=""
  Password=""

  myControl = new FormControl();
  options: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>',
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Pichayapak Nantasai <pichayapak.nan@murata.com>'];
  filteredOptions!: Observable<string[]>;

  constructor(public productService: ProductService , public router: Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
    
  }

display(){
  var qtest = ""
    qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`user_login`"+
    " (`EMPLOY_CODE`, `NAME`, `DEPARTMENT`, `PASSWORD`)"+
    " VALUES ('"+this.Employeecode+"', '"+this.Name+"', '"+this.Department+"', '"+this.Password+"');"
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
    })

    this.router.navigate(['/Login'])
  }
}
