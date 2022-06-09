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
  startdate1 = ""
  enddate1 = ""

  sample1 : any
  sample2 : any

  equipbook = ""
  analyzer = ""

  myControl = new FormControl();
  options: string[] = ['Pornpimon Pengto', 'Soontree Chaiwut','Napapon',
   'Parawee Tassaneekati ', 'Panudda Majan', 'Pichayapak Nantasai', 
   'Supakan Sriwichai ', 'Suticha Pringthai ','Thanyarat Sukkay ',  
   'Wanutsanun Hintuang' ];
  filteredOptions!: Observable<string[]>;
 
  constructor(public router: Router,private route: ActivatedRoute,public productService: ProductService) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      this.analyzer = this.DataRes[0].REVI_ANASEC_ANAL.split("<")

      this.sample1 = this.DataRes[0].ESTI_TECHNIQUE.split("[]")
    console.log(this.sample1)

    var x
    var a
    this.sample2 = "["

    for(x in this.sample1)
    {
      a = this.sample1[x].split("||")
      this.sample2 = this.sample2 + '{"equip":"' + a[0] + '",'
      this.sample2 = this.sample2 + '"Sample_no":"' + a[1] + '"},'
    }

    this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
    this.sample2 =  this.sample2 + "]";
    console.log( this.sample2)
    var obj = JSON.parse( this.sample2);
      this.sample2 = obj
      console.log( this.sample2)

      this.loading = false
    })

    this.namelocal = sessionStorage.getItem("NAME");
    this.Codelocal = sessionStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = sessionStorage.getItem("DEPARTMENT");
    if (this.departmentlocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    } else {
      window.alert("กรุณา login")
      window.location.href ='http://localhost:4200/Requestinfo?id='+this.userType   
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

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
    
    var startdate2 = this.startdate.toLocaleString()
    this.startdate1 = startdate2.substring(0, 8)
    console.log(this.startdate1)

    
    var enddate2 = this.enddate.toLocaleString()
    this.enddate1 = enddate2.substring(0, 8)
    console.log(this.enddate1)

    var qtest = ""
  qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`, `STEP_BOOKING`, `SAMPLE_NUM`, " +
  " `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`) " +
    " VALUES ('"+this.DataRes[0].REQ_NUM +"', '"+this.step +"', '"+this.Numsample +"', '"+this.startdate1 +"', "+
    " '"+this.starttime +"', '"+this.enddate1 +"', '"+this.endtime +"', '"+this.operator +"');"
    console.log(qtest);
  // this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
  //   console.log(data);
  // })
  }
  onChange(deviceValue:any) {
    console.log(deviceValue);
    this.equipbook = deviceValue
    
  }
}
