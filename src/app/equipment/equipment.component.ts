import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, AfterViewInit } from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import { DataService } from "./data.service";

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

  constructor(public router: Router,private ds: DataService,private route: ActivatedRoute) { 
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
}
