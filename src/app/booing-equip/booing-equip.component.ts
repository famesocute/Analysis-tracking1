import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../api/product.service';
import { ViewChild, AfterViewInit } from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import { DataService } from "./data.service";
import { MatDialog } from '@angular/material/dialog';
import { EditBookingComponent } from '../dialog/edit-booking/edit-booking.component';


@Component({
  selector: 'app-booing-equip',
  templateUrl: './booing-equip.component.html',
  styleUrls: ['./booing-equip.component.scss']
})
export class BooingEquipComponent implements OnInit {

  isValid = false
  table: any

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  loading = true

  userType: any
  DataRes: any
  DataBooking: any
  DataResreq: any
  Datastepcheck : any

  step_no = ""
  step1 = ""
  Numsample = ""
  startdate = ""
  starttime = ""
  enddate = ""
  endtime = ""
  operator = ""
  startdate1: any
  enddate1 = ""
  startT1 = ""
  startT2 = ""
  endT1 = ""
  endT2 = ""

  sample1: any
  sample2: any
  equip = ""

  equipbook = ""
  analyzer = ""
  bookingtable = ""
  newDate: any
  newDate2: any

  SelectedZZZ = ""
  step_before1 = ""

  myControl = new FormControl();
  options: string[] = ['Pornpimon Pengto', 'Soontree Chaiwut', 'Napapon',
    'Parawee Tassaneekati ', 'Panudda Majan', 'Pichayapak Nantasai',
    'Supakan Sriwichai ', 'Suticha Pringthai ', 'Thanyarat Sukkay ',
    'Wanutsanun Hintuang'];
  filteredOptions!: Observable<string[]>;

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
    console.log(date)
    console.log(this.events)
    // console.log(this.events2)
  }

  configDay: DayPilot.CalendarConfig = {
  };

  configWeek: DayPilot.CalendarConfig = {

    viewType: "Week",
    onTimeRangeSelected: async (args) => {
      // show booked time
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 3");

      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,

      }));
    }
  };

  configMonth: DayPilot.MonthConfig = {

  };

  constructor(public router: Router, private route: ActivatedRoute, public productService: ProductService, private ds: DataService,private matDialog: MatDialog) {
    this.viewWeek();
  }

  ngOnInit(): void {
    // this.events = this.events2;

    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
      console.log(data);
      this.DataBooking = data
      this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
        console.log(data);
        this.DataRes = data
  
        this.analyzer = this.DataRes[0].REVI_ANASEC_ANAL.split("<")
  
        this.sample1 = this.DataRes[0].ESTI_TECHNIQUE.split("[]")
        console.log(this.sample1)
  
        var x
        var a
        this.sample2 = "["
  
        for (x in this.sample1) {
          a = this.sample1[x].split("||")
          this.sample2 = this.sample2 + '{"equip":"' + a[0] + '",'
          this.sample2 = this.sample2 + '"Sample_no":"' + a[1] + '"},'
        }
  
        this.sample2 = this.sample2.substring(0, this.sample2.length - 1);
        this.sample2 = this.sample2 + "]";
        console.log(this.sample2)
        var obj = JSON.parse(this.sample2);
        this.sample2 = obj
        console.log(this.sample2)
        this.SelectedZZZ = this.sample2[0].equip
        console.log(this.SelectedZZZ)


        this.namelocal = localStorage.getItem("NAME");
        this.Codelocal = localStorage.getItem("EMPLOY_CODE");
        this.departmentlocal = localStorage.getItem("DEPARTMENT");
        if (this.departmentlocal != null) {
          this.isValid = true
          this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
        } else {
          window.alert("กรุณา login")
          window.location.href = 'http://163.50.57.95:82/Tracking_Analysis/Requestinfo?id=' + this.userType
        }
    
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );

        this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
          console.log(data);
          this.DataResreq = data
  
          var booking = "["
          var count = 0
          var x
          var y
          console.log(this.sample2);
          for (y in this.sample2) {
  
            for (x in this.DataBooking) {

              if(this.sample2[y].equip == this.DataBooking[x].EQUIPMENT){
              // const [month, day, year] = this.DataBooking[x].DATE_BOOKING_START.split("/");
              // const newDate = `${year}-${month}-${day}T${this.DataBooking[x].TIME_BOOKING_START}`
              // console.log(newDate)
  
              // const [ month2,day2, year2] = this.DataBooking[x].DATE_BOOKING_END.split("/");
              // const newDate2 = `${year2}-${month2}-${day2}T${this.DataBooking[x].TIME_BOOKING_END}`
              // console.log(newDate2)
              this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
              this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END

              this.DataBooking[x].PIC = this.DataBooking[x].PIC +"("+ this.DataBooking[x].EQUIPMENT +")"+this.DataBooking[x].TITLE
  
              console.log(this.newDate)
              console.log(this.newDate2)
              count = count + 1
              booking = booking + '{"id":"' + count + '",'
              booking = booking + '"start":"' + this.newDate + '",'
              booking = booking + '"end":"' + this.newDate2 + '",'
  
              booking = booking + '"text":"'+this.DataBooking[x].PIC+' "},'
              }
             
            }
  
          }
          booking = booking.substring(0, booking.length - 1);
          booking = booking + "]";
          console.log(booking)
          var obj = JSON.parse(booking);
          this.events = obj
          console.log(this.events)
         
        })
        this.loading = false
      })

    })


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
  Logout() {
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Goanalysishome() {
    this.router.navigate(['/Analyrequehome'])
  }
  confirm() {
  var step_before_check
    var step_no2 = this.step_no.substring(4)
    console.log(step_no2)

    var step_before = parseInt(step_no2)-1
    this.step_before1 = step_before.toLocaleString()
    console.log(this.step_before1)
    var step_before2 = "Step" + this.step_before1   
    console.log(step_before2)
    console.log(this.DataRes[0].REQ_NUM)

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_STEP_REQ(this.DataRes[0].REQ_NUM,step_before2).subscribe((data: {}) => {
     console.log(data);
     this.Datastepcheck = data


     if(step_no2 == "1"){

      this.starttime = this.startT1 + ":" + this.startT2 + ":00"
      console.log(this.starttime)
      this.endtime = this.endT1 + ":" + this.endT2 + ":00"
      console.log(this.endtime)
  
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
      this.startdate1 = sumdatestart
      console.log(this.startdate1)
      // 
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
      this.enddate1 = sumdateend
      console.log(this.enddate1)
  
      this.DataRes[0].TITLE = this.DataRes[0].TITLE.substring(0,30)
      console.log(this.DataRes[0].TITLE)
  
      this.analyzer = this.DataRes[0].REVI_ANASEC_ANAL.substring(0, this.namelocal.indexOf('<'));
  
      var qtest = ""
      qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`,`TITLE`,`PIC`, `STEP_BOOKING`, `EQUIPMENT`, `SAMPLE_NUM`, " +
        " `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`, `EDITER`) " +
        " VALUES ('" + this.DataRes[0].REQ_NUM + "','" + this.DataRes[0].TITLE + "', '" + this.analyzer + "','" + this.step_no + "', '" + this.step1 + "', '" + this.Numsample + "', '" + this.startdate1 + "', " +
        " '" + this.starttime + "', '" + this.enddate1 + "', '" + this.endtime + "', '" + this.operator + "', '" + this.nameonly + "');"
      console.log(qtest);
      console.log(this.step1);
      console.log(this.equipbook);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.alert("บันทึกข้อมูลเรียบร้อยแล้ว")
        window.location.reload()
      })
    }
    else if(step_no2 > "1" && this.Datastepcheck != ''){

    this.starttime = this.startT1 + ":" + this.startT2 + ":00"
    console.log(this.starttime)
    this.endtime = this.endT1 + ":" + this.endT2 + ":00"
    console.log(this.endtime)

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
    this.startdate1 = sumdatestart
    console.log(this.startdate1)
    // 
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
    this.enddate1 = sumdateend
    console.log(this.enddate1)

    this.DataRes[0].TITLE = this.DataRes[0].TITLE.substring(0,30)
    console.log(this.DataRes[0].TITLE)

    this.analyzer = this.DataRes[0].REVI_ANASEC_ANAL.substring(0, this.namelocal.indexOf('<'));

    var qtest = ""
    qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`,`TITLE`,`PIC`, `STEP_BOOKING`, `EQUIPMENT`, `SAMPLE_NUM`, " +
      " `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`, `EDITER`) " +
      " VALUES ('" + this.DataRes[0].REQ_NUM + "','" + this.DataRes[0].TITLE + "', '" + this.analyzer + "','" + this.step_no + "', '" + this.step1 + "', '" + this.Numsample + "', '" + this.startdate1 + "', " +
      " '" + this.starttime + "', '" + this.enddate1 + "', '" + this.endtime + "', '" + this.operator + "', '" + this.nameonly + "');"
    console.log(qtest);
    console.log(this.step1);
    console.log(this.equipbook);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      window.alert("บันทึกข้อมูลเรียบร้อยแล้ว")
      window.location.reload()
    })
  }
  else{
    window.alert("กรุณาจองเครื่องมือstepก่อนหน้านี้")
  }

    })

    // this.DataResreq[0].STEP_BOOKING.substring(4)
  }
  onChange(deviceValue: any) {
    console.log(deviceValue);
    var booking = "["
    var count = 0
    var x
    var y
      for (x in this.DataBooking) {
        console.log(this.DataBooking[x].EQUIPMENT);
        if(deviceValue == this.DataBooking[x].EQUIPMENT){
        // const [month, day, year] = this.DataBooking[x].DATE_BOOKING_START.split("/");
        // const newDate = `${year}-${month}-${day}T${this.DataBooking[x].TIME_BOOKING_START}`
        // console.log(newDate)

        // const [ month2,day2, year2] = this.DataBooking[x].DATE_BOOKING_END.split("/");
        // const newDate2 = `${year2}-${month2}-${day2}T${this.DataBooking[x].TIME_BOOKING_END}`
        // console.log(newDate2)
        this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
        this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END

        console.log(this.newDate)
        console.log(this.newDate2)
        count = count + 1
        booking = booking + '{"id":"' + count + '",'
        booking = booking + '"start":"' + this.newDate + '",'
        booking = booking + '"end":"' + this.newDate2 + '",'

        booking = booking + '"text":"' + this.DataBooking[x].PIC + '"},'
        }
       
      }
      if(booking != "["){
        booking = booking.substring(0, booking.length - 1);
        booking = booking + "]";
        console.log(booking)
        var obj = JSON.parse(booking);
        this.events = obj
        console.log(this.events)
      }
   

    var x
    var count = 0
    for (x in this.sample2) {
      count = count + 1
      if (this.sample2[x].equip == deviceValue) {
        this.step_no = "Step" + count
        console.log(this.step_no);
      }
    }


  }
  Delete(ID:any){
    // DELETE FROM `mtq10_project_tracking_analysis`.`booking_equipment` WHERE (`ID_BOOKING` = '32');
    var qtest = ""
    qtest = qtest + "DELETE FROM `mtq10_project_tracking_analysis`.`booking_equipment` WHERE (`ID_BOOKING` = '"+ID+"');"
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      window.alert("ลบข้อมูลเรียบร้อยแล้ว")
      window.location.reload()
    })
  }

  // ngAfterViewInit(): void {
  //   this.loadEvents();
  // }

  events2: any[] = [
    {
      id: "1",
      start: DayPilot.Date.today().addHours(10),
      end: DayPilot.Date.today().addHours(12),
      text: "Event 1",

    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(13),
      end: DayPilot.Date.today().addHours(15),
      text: "Event 2",

    }
  ]
  loadEvents(): void {

    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    console.log(this.events)
    // this.ds.getEvents(from, to).subscribe(result => {
    //   // this.events = result;
    //   this.events = this.events2;
    //   console.log(this.events)
    // });
  }

  viewDay(): void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  getfata() {
    console.log(this.ds.events)
  }
  onOpenDialogClick(ID:any){
    this.productService.changeMessage(ID)
      const dialogRef = this.matDialog.open(EditBookingComponent, {
        disableClose : true,
        width: '1000px',
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result );

      this.ngOnInit()
      });

}
GoAnaNoCom(){
  this.router.navigate(['/AnahomeNotcom'])
}

}
