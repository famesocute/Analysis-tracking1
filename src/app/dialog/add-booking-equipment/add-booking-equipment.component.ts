import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { UntypedFormControl } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { map, startWith } from 'rxjs/operators';
import { ProductService } from '../../api/product.service';
@Component({
  selector: 'app-add-booking-equipment',
  templateUrl: './add-booking-equipment.component.html',
  styleUrls: ['./add-booking-equipment.component.scss']
})
export class AddBookingEquipmentComponent implements OnInit {

  constructor( public productService: ProductService) { }

  namelocal: any
  Codelocal: any
  departmentlocal: any
  TITLE: any
  Numsample: any
  startdate: any
  startT1:any
  startT2:any
  enddate = ""
  endT1= ""
  endT2= ""
  operator = ""
  myControl = new FormControl();
  equip = ""
  sample2: any
  message: any
  Equipment: any
  options:string[] = ['Soontree Chaiwut', 'Napapon',
  'Parawee Tassaneekati', 'Panudda Majan', 'Gunyarat Prabhong',
  'Supakan Sriwichai', 'Suticha Pringthai', 'Thanyarat Sukkay',
  'Wanutsanun Hintuang'];

  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message);
    this.Equipment = this.message
    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");

    console.log(this.namelocal);
    console.log( this.Codelocal);
    console.log(this.departmentlocal);
    this.namelocal = this.namelocal.split("<")

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  confirm(){
    var lastregister :any
    this.productService.TRACKING_ANALYSIS_SELECT_URGENT_BOOK().subscribe((data: {}) => {
      console.log(data);
      lastregister = data
      console.log(lastregister[0].REQ_NUMSUB);
      var runnumber
      var runnumber2 = 0
      var runnumberRes = "000001"
  
      runnumber2 = parseInt(lastregister[0].REQ_NUMSUB)
      runnumber = runnumber2 + 1
      var str = "" + runnumber
      var pad = "000000"
      runnumber = pad.substring(0, pad.length - str.length) + str
      console.log(runnumber)


    console.log("TITLE :",this.TITLE);
    console.log("Numsample :",this.Numsample);
    console.log("startT1 :",this.startT1);
    console.log("startT2 :",this.startT2);
    console.log("startdate :",this.startdate);
    console.log("enddate :",this.enddate);
    console.log("endT1 :",this.endT1);
    console.log("endT2 :",this.endT2);
    console.log("operator :",this.operator);

    var startdate2 = this.startdate.toLocaleString()
    var startdate3 = startdate2.split(",")
    var startdate4 = startdate3[0].split("/")
    console.log(startdate4)

    var sumdatestart
    if (startdate4[0].length <= 1) {
      sumdatestart = startdate4[2] + "-0" + startdate4[0]
    }
    else {
      sumdatestart = startdate4[2] + "-" + startdate4[0]
    }
    if (startdate4[1].length <= 1) {
      sumdatestart = sumdatestart + "-0" + startdate4[1]
    }
    else {
      sumdatestart = sumdatestart + "-" + startdate4[1]
    }
    console.log(sumdatestart)

    var enddate2 = this.enddate.toLocaleString()
    console.log(this.enddate)
    var enddate3 = enddate2.split(",")
    var enddate4 = enddate3[0].split("/")
    console.log(enddate4)
    var sumdateend
    if (enddate4[0].length <= 1) {
      sumdateend = enddate4[2] + "-0" + enddate4[0]
    }
    else {
      sumdateend = enddate4[2] + "-" + enddate4[0]
    }
    if (startdate4[1].length <= 1) {
      sumdateend = sumdateend + "-0" + enddate4[1]
    }
    else {
      sumdateend = sumdateend + "-" + enddate4[1]
    }
    console.log(sumdateend)



    var starttime
    var endtime
    starttime = this.startT1 + ":" + this.startT2 + ":00"
    console.log(starttime)
    endtime = this.endT1 + ":" + this.endT2 + ":00"
    console.log(endtime)



      var qtest = ""
      qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`,`TITLE`,`PIC`, `STEP_BOOKING`, `EQUIPMENT`, `SAMPLE_NUM`, " +
      " `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`, `EDITER`) " +
      " VALUES ('URGENT"+runnumber+"','" + this.TITLE + "', '" + this.namelocal[0] + "','', '" + this.Equipment + "', '" + this.Numsample + "', '" + sumdatestart + "', " +
      " '" + starttime + "', '" + sumdateend + "', '" + endtime + "', '" + this.operator + "', '0');"
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      window.alert("บันทึกข้อมูลเรียบร้อยแล้ว")
      window.location.reload()
    })
    })
    

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));

  }
}
