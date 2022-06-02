import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-booing-equip',
  templateUrl: './booing-equip.component.html',
  styleUrls: ['./booing-equip.component.scss']
})
export class BooingEquipComponent implements OnInit{

  isValid = false
  table: any

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly : any

  loading = true

  userType : any
  DataRes : any

  step = ""
  Numsample = ""
  startdate = ""
  starttime = ""
  enddate = ""
  endtime = ""
  operator = ""

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
 
  constructor(public router: Router,private route: ActivatedRoute,public productService: ProductService) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })
    this.productService.TRACKING_ANALYSIS_READ_EXCEL().subscribe((data: {}) => {
      console.log(data);
      this.table = data
      var dataselect = ""
      var x
      for (x in this.table) {
        dataselect = dataselect + this.table[x].DISPLAY_NAME + ' <' + this.table[x].MAIL_ADDRESS + '>,'

      }
      dataselect = dataselect.substring(0, dataselect.length - 1);

      const myArray = dataselect.split(",");

      this.options = myArray
      console.log(this.options)
    })

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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.loading = false
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));

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
  confirm(){
    console.log(this.step)
    console.log(this.Numsample)
    console.log(this.startdate)
    console.log(this.starttime)
    console.log(this.enddate)
    console.log(this.endtime)
    console.log(this.operator)

    // INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`, `STEP_BOOKING`, `SAMPLE_NUM`, `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`) VALUES ('fd', 'dg', 'g', 'g', 'dfg', 'df', 'dg', 'dg');

  //   var qtest = ""
  // qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`, `STEP_BOOKING`, `SAMPLE_NUM`, " +
  // " `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`) " +
  //   " VALUES ('"+this.DataRes[0].REQ_NUM +"', 'dg', 'g', 'g', 'dfg', 'df', 'dg', 'dg');"

  // this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
  //   console.log(data);

  // })
  }
}
