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
  table : any

  Employeecode=""
  Department=""
  Name=""
  Password=""

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(public productService: ProductService , public router: Router) { }

  ngOnInit(): void {
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
        console.log(this.options)
    })

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
  

