import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})

export class EditBookingComponent implements OnInit {
  step1 = ""
  Dataeditbook: any
  message = ""
  startdate1: any
  enddate1: any

  myControl = new FormControl();
  options: string[] = ['Pornpimon Pengto', 'Soontree Chaiwut', 'Napapon',
    'Parawee Tassaneekati ', 'Panudda Majan', 'Pichayapak Nantasai',
    'Supakan Sriwichai ', 'Suticha Pringthai ', 'Thanyarat Sukkay ',
    'Wanutsanun Hintuang'];
  filteredOptions!: Observable<string[]>;

  operator = ""
  startT1 = ""
  startT2 = ""
  endT1 = ""
  endT2 = ""

  startT11 = ""
  endT11 = ""
  starttime = ""
  endtime = ""

  namelocal: any
  nameonly = ""

  constructor(public productService: ProductService) { }

  ngOnInit(): void {

    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    this.namelocal = sessionStorage.getItem("NAME");
    this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.Dataeditbook = data


      this.startdate1 = this.Dataeditbook[0].DATE_BOOKING_START
      this.enddate1 = this.Dataeditbook[0].DATE_BOOKING_END


      this.startT11 = this.Dataeditbook[0].TIME_BOOKING_START.split(":")
      this.startT1 = this.startT11[0]
      this.startT2 = this.startT11[1]

      this.endT11 = this.Dataeditbook[0].TIME_BOOKING_END.split(":")
      this.endT1 = this.endT11[0]
      this.endT2 = this.endT11[1]

      this.operator = this.Dataeditbook[0].OPERATER
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

  //UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` SET `DATE_BOOKING_START` = '2022-06-17', `TIME_BOOKING_START` = '11:00:00', `DATE_BOOKING_END` = '2022-06-18', `TIME_BOOKING_END` = '12:00:00', `OPERATER` = 'Pornpimon Pengt', `EDITER` = 'Pichayapak Nantasa' WHERE (`ID_BOOKING` = '32');
  Update() {
    console.log(this.startdate1)
    var checkChange = this.startdate1.toLocaleString().search("-")
    console.log(checkChange)
    if (checkChange == -1) {
      var startdate2 = this.startdate1.toLocaleString()
      var startdate3 = startdate2.split(",")
      var startdate4 = startdate3[0].split("/")


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
      this.startdate1 = sumdatestart
      console.log(this.startdate1)
    }


    console.log(this.enddate1)
    var checkChange2 = this.enddate1.toLocaleString().search("-")
    console.log(checkChange2)
    if (checkChange2 == -1) {
      var enddate2 = this.enddate1.toLocaleString()
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
      if (enddate4[1].length <= 1) {
        sumdateend = sumdateend + "-0" + enddate4[1]
      }
      else {
        sumdateend = sumdateend + "-" + enddate4[1]
      }
      this.enddate1 = sumdateend
      console.log(this.enddate1)
    }



    this.starttime = this.startT1 + ":" + this.startT2 + ":00"
    console.log(this.starttime)
    this.endtime = this.endT1 + ":" + this.endT2 + ":00"
    console.log(this.endtime)

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET `DATE_BOOKING_START` = '" + this.startdate1 + "', `TIME_BOOKING_START` = '" + this.starttime + "', `DATE_BOOKING_END` = '" + this.enddate1 + "', " +
      " `TIME_BOOKING_END` = '" + this.endtime + "', `OPERATER` = '" + this.operator + "', `EDITER` = '" + this.nameonly + "' " +
      " WHERE (`ID_BOOKING` = '" + this.message + "')  ; "
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data); 
    }) 
  }

}

