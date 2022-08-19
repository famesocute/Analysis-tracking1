import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, AfterViewInit } from "@angular/core";
import { ProductService } from '../api/product.service';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import { DataService2 } from "./data.service";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  loading = true

  isValid = false

  namelocal: any
  Codelocal: any
  departmentlocal: any
  nameonly: any

  DataBooking: any
  newDate: any
  newDate2: any
  sample1: any
  sample2: any

  namequip = ""

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

  constructor(public router: Router,private ds: DataService2,private route: ActivatedRoute,public productService: ProductService) { 
    this.viewWeek();
  }

  ngOnInit(): void {
    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
    }
    this.loading = false

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
      console.log(data);
      this.DataBooking = data
    })
  }
  GoAnaNoCom(){
    this.router.navigate(['/AnahomeNotcom'])
  }
  Logout(){
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMPLOY_CODE");
    localStorage.removeItem("DEPARTMENT");
    location.reload();
  }
  Gologin() {
    this.router.navigate(['/Login'])
  }
  GoSignup() {
    this.router.navigate(['/Signup'])
  }
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

  onChange(deviceValue: any) {
    console.log(deviceValue);
    this.namequip = deviceValue
    console.log(this.namequip)

    var booking = "["
    var count = 0
    var x
    var y
    for (x in this.DataBooking) {
      console.log(this.DataBooking[x].EQUIPMENT);
      if (deviceValue == "Ion-milling" || deviceValue == "Cross-milling" || deviceValue == "X-ray2D" || deviceValue == "X-ray3D" || deviceValue == "X-ray reflow"|| deviceValue == "EDXRF" || deviceValue == "EDXRF_RoHS") 
      {
        if ((this.DataBooking[x].EQUIPMENT == "Ion-milling" || this.DataBooking[x].EQUIPMENT == "Cross-milling") && (deviceValue == "Ion-milling"|| deviceValue == "Cross-milling")) {
          this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
          this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END
          console.log(this.newDate)
          console.log(this.newDate2)
          count = count + 1
          booking = booking + '{"id":"' + count + '",'
          booking = booking + '"start":"' + this.newDate + '",'
          booking = booking + '"end":"' + this.newDate2 + '",'
          booking = booking + '"text":"' + this.DataBooking[x].PIC + '"},'
          console.log(booking)
        }
        if ((this.DataBooking[x].EQUIPMENT == "X-ray2D" || this.DataBooking[x].EQUIPMENT == "X-ray3D" || this.DataBooking[x].EQUIPMENT == "X-ray reflow")&& (deviceValue == "X-ray2D"||deviceValue == "X-ray3D"|| deviceValue == "X-ray reflow")) {
          this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
          this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END
          console.log(this.newDate)
          console.log(this.newDate2)
          count = count + 1
          booking = booking + '{"id":"' + count + '",'
          booking = booking + '"start":"' + this.newDate + '",'
          booking = booking + '"end":"' + this.newDate2 + '",'
          booking = booking + '"text":"' + this.DataBooking[x].PIC + '"},'
          console.log(booking)
        }
        if ((this.DataBooking[x].EQUIPMENT == "EDXRF" || this.DataBooking[x].EQUIPMENT == "EDXRF_RoHS")&& (deviceValue == "EDXRF"||deviceValue == "EDXRF_RoHS")) {
          this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
          this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END
          console.log(this.newDate)
          console.log(this.newDate2)
          count = count + 1
          booking = booking + '{"id":"' + count + '",'
          booking = booking + '"start":"' + this.newDate + '",'
          booking = booking + '"end":"' + this.newDate2 + '",'
          booking = booking + '"text":"' + this.DataBooking[x].PIC + '"},'
          console.log(booking)
        }
      }
      else {
        if (deviceValue == this.DataBooking[x].EQUIPMENT) {
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

    }
    if (booking != "[") {
      booking = booking.substring(0, booking.length - 1);
      booking = booking + "]";
      console.log(booking)
      var obj = JSON.parse(booking);
      this.events = obj
      console.log(this.events)
    }
    else{
      this.events = []
    }
    console.log(this.events)
  }
}
