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
import { MatDialog } from '@angular/material/dialog';
import { EditBookingComponent } from '../dialog/edit-booking/edit-booking.component'
import { AddBookingEquipmentComponent } from '../dialog/add-booking-equipment/add-booking-equipment.component'
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
  DateWeek: any

  // TableDateWeek = [[{"Analyzer":"Analyzer",
  //                   "Department":"Department",
  //                   "Request_No":"Request No.",
  //                   "Title":"Title",
  //                   "Number_Sample":"Number_Sample",
  //                   "Start_date_time":"Start_date_time",
  //                   "End_date_time":"End_date_time",
  //                   "Operation_by":"Operation_by"},
  //                   {"Analyzer":"Analyzer",
  //                   "Department":"Department",
  //                   "Request_No":"Request No.",
  //                   "Title":"Title",
  //                   "Number_Sample":"Number_Sample",
  //                   "Start_date_time":"Start_date_time",
  //                   "End_date_time":"End_date_time",
  //                   "Operation_by":"Operation_by"}],
  //                   [{"Analyzer":"Analyzer",
  //                   "Department":"Department",
  //                   "Request_No":"Request No.",
  //                   "Title":"Title",
  //                   "Number_Sample":"Number_Sample",
  //                   "Start_date_time":"Start_date_time",
  //                   "End_date_time":"End_date_time",
  //                   "Operation_by":"Operation_by"}],[],[],[],[],[]]

  TableDateWeek: any



  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];
  events2: any;

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
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    console.log(unixTimestamp+"000");
    this.setfirstWeek(unixTimestamp+"000")
    var getses = sessionStorage.getItem("EQUIPMENT_SAVE")
    this.onChange(getses)
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

  constructor(public router: Router, private ds: DataService2, private route: ActivatedRoute, public productService: ProductService, private matDialog: MatDialog) {
    this.viewWeek();
  }

  ngOnInit(): void {
    sessionStorage.setItem("EQUIPMENT_SAVE","")
    this.namelocal = localStorage.getItem("NAME");
    this.Codelocal = localStorage.getItem("EMPLOY_CODE");
    this.departmentlocal = localStorage.getItem("DEPARTMENT");

    if (this.namelocal != null) {
      this.isValid = true
      this.nameonly = this.namelocal.substring(0, this.namelocal.indexOf('<'));
      this.nameonly = this.nameonly.trim();
      console.log(this.nameonly);
    }

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
      console.log(data);
      this.DataBooking = data
      // this.setfirstWeek()
      this.TableDateWeek = [[]]
      this.loading = false
    })
  }

  setfirstWeek(d: any) {
    // const d = Date.now();
    console.log(d);

    // 👇️ clone date object, so we don't mutate it
    const date = new Date(parseInt(d));
    var datenowchk = date.getDate()

    const day = date.getDay(); // 👉️ get day of week
    console.log(date.getDate());


    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const d2 = new Date(date.setDate(diff));
    console.log(d2.getDate() - 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d3 = new Date(parseInt(d));
    let month = months[d3.getMonth()];
    this.DateWeek = d2.getDate() - 1 + " " + month + " " + date.getFullYear()
    console.log(this.DateWeek);
    var DateWeek2 = "["
    var x = 0
    var datelastchk = 0
    datelastchk = d2.getDate() - 1

    console.log(datenowchk - (d2.getDate() - 1));


    if (datenowchk - (d2.getDate() - 1) < 0) {
      console.log(true);

      for (let i = 0; i < 7; i++) {
        console.log((d2.getDate() - 1) + i);
        if (month == "January") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' December ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "February") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' January ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "March") {
          if (((d2.getDate() - 1) + i) <= 28) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' February ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "April") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' March ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "May") {
          if (((d2.getDate() - 1) + i) <= 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' April ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "June") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' May ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "July") {
          if (((d2.getDate() - 1) + i) <= 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' June ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "August") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' July ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "September") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' August ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "October") {
          if (((d2.getDate() - 1) + i) <= 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' September ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "November") {
          if (((d2.getDate() - 1) + i) <= 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' October ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-' + (i - (x) + 1) + '"},'
            }


          }
        }
        else if (month == "December") {
          if (((d2.getDate() - 1) + i) <= 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' November ' + date.getFullYear() + '",'
            if (((d2.getDate() - 1) + i) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + (i - (x) + 1) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((i - (x) + 1) < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-0' + (i - (x) + 1) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-' + (i - (x) + 1) + '"},'
            }
          }
        }
      }
    }
    else {
      console.log(false);
      for (let i = 0; i < 7; i++) {
        console.log((d2.getDate() - 1) + i);
        if (month == "January") {
          if (((d2.getDate() - 1) + i) > 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' February ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-' + (x) + '"},'
            }

          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "February") {
          if (((d2.getDate() - 1) + i) > 28) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' March ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-02-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "March") {
          if (((d2.getDate() - 1) + i) > 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' April ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-03-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "April") {
          if (((d2.getDate() - 1) + i) > 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' May ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-04-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "May") {
          if (((d2.getDate() - 1) + i) > 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' June ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-05-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "June") {
          if (((d2.getDate() - 1) + i) > 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' July ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-06-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "July") {
          if (((d2.getDate() - 1) + i) > 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' August ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-07-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "August") {
          if (((d2.getDate() - 1) + i) > 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' September ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-08-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "September") {
          if (((d2.getDate() - 1) + i) > 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' October ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'

            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-09-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "October") {
          if (((d2.getDate() - 1) + i) > 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' November ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-10-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }

        else if (month == "November") {
          if (((d2.getDate() - 1) + i) > 30) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' December ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-11-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
        else if (month == "December") {
          if (((d2.getDate() - 1) + i) > 31) {
            x = x + 1
            DateWeek2 = DateWeek2 + '{"Date":"' + (x) + ' January ' + (date.getFullYear() + 1) + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-0' + (x) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-01-' + (x) + '"},'
            }
          }
          else {
            DateWeek2 = DateWeek2 + '{"Date":"' + ((d2.getDate() - 1) + i) + ' ' + month + ' ' + date.getFullYear() + '",'
            if ((d2.getDate() - 1) + i < 10) {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-0' + ((d2.getDate() - 1) + i) + '"},'
            }
            else {
              DateWeek2 = DateWeek2 + '"Date2":"' + date.getFullYear() + '-12-' + ((d2.getDate() - 1) + i) + '"},'
            }
          }
        }
      }
    }

    if (DateWeek2 != "[") {
      DateWeek2 = DateWeek2.substring(0, DateWeek2.length - 1);
      DateWeek2 = DateWeek2 + "]";
      console.log(DateWeek2)
      var obj = JSON.parse(DateWeek2);
      this.DateWeek = obj
    }
    else {
      this.DateWeek = []
    }
    console.log(this.DateWeek)

  }


  setTable7Day() {
    var x: any
    var y: any
    var table = "["
    var count = 0
    console.log(this.events2)
    for (x in this.DateWeek) {
      table = table + "["
      for (y in this.events2) {



        console.log(this.events2[y].start.substring(0, 10))
        console.log(this.DateWeek[x].Date2)
        // console.log(this.events2[y])
        if (this.events2[y] != null) {

          if (this.events2[y].start.substring(0, 10) == this.DateWeek[x].Date2) {
            console.log(this.events2[y].ID_BOOKING)

            count = count + 1
            const first = this.DataBooking.find((obj: { ID_BOOKING: any; }) => {
              return obj.ID_BOOKING === this.events2[y].ID_BOOKING;
            });
            console.log(first);
            if (first) {
              console.log(first);
            };
            table = table + '{"id":"' + count + '",'
            table = table + '"Department":"' + count + '",'
            table = table + '"Title":"' + first.TITLE + '",'
            table = table + '"Request_No":"' + first.REQ_NUM + '",'
            table = table + '"Number_Sample":"' + first.SAMPLE_NUM + '",'
            table = table + '"Start":"' + first.DATE_BOOKING_START + '",'
            table = table + '"End":"' + first.DATE_BOOKING_END + '",'
            table = table + '"ID_BOOKING":"' + first.ID_BOOKING + '",'
            table = table + '"PIC":"' + first.PIC.trim() + '",'
            table = table + '"Operation":"' + first.OPERATER + '"},'
          }
        }

      }
      if (table.substring(table.length - 1, table.length) != "[") {
        table = table.substring(0, table.length - 1);
      }
      table = table + "],"
    }

    if (table != "[") {
      table = table.substring(0, table.length - 1);
      table = table + "]";
      console.log(table)
      var obj = JSON.parse(table);
      console.log(obj)
      this.TableDateWeek = obj
    }
    else {
      this.TableDateWeek = []
    }
    console.log(this.TableDateWeek)

  }

  GoAnaNoCom() {
    this.router.navigate(['/AnahomeNotcom'])
  }
  Logout() {
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
    var getses = sessionStorage.getItem("EQUIPMENT_SAVE")
    if (getses == deviceValue){

    }
    else{
      sessionStorage.setItem("EQUIPMENT_SAVE",deviceValue)
    }
   
    console.log(deviceValue);
    this.namequip = deviceValue
    console.log(this.namequip)

    var booking = "["
    var count = 0
    var x
    var y
    for (x in this.DataBooking) {
      console.log(this.DataBooking[x].EQUIPMENT);
      if (deviceValue == "Ion-milling" || deviceValue == "Cross-milling" || deviceValue == "X-ray2D" || deviceValue == "X-ray3D" || deviceValue == "X-ray reflow" || deviceValue == "EDXRF" || deviceValue == "EDXRF_RoHS") {
        if ((this.DataBooking[x].EQUIPMENT == "Ion-milling" || this.DataBooking[x].EQUIPMENT == "Cross-milling") && (deviceValue == "Ion-milling" || deviceValue == "Cross-milling")) {
          this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
          this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END
          console.log(this.newDate)
          console.log(this.newDate2)
          count = count + 1
          booking = booking + '{"id":"' + count + '",'
          booking = booking + '"start":"' + this.newDate + '",'
          booking = booking + '"end":"' + this.newDate2 + '",'
          booking = booking + '"ID_BOOKING":"' + this.DataBooking[x].ID_BOOKING + '",'
          booking = booking + '"text":"' + this.DataBooking[x].PIC + '"},'
          console.log(booking)
        }
        if ((this.DataBooking[x].EQUIPMENT == "X-ray2D" || this.DataBooking[x].EQUIPMENT == "X-ray3D" || this.DataBooking[x].EQUIPMENT == "X-ray reflow") && (deviceValue == "X-ray2D" || deviceValue == "X-ray3D" || deviceValue == "X-ray reflow")) {
          this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
          this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END
          console.log(this.newDate)
          console.log(this.newDate2)
          count = count + 1
          booking = booking + '{"id":"' + count + '",'
          booking = booking + '"start":"' + this.newDate + '",'
          booking = booking + '"end":"' + this.newDate2 + '",'
          booking = booking + '"ID_BOOKING":"' + this.DataBooking[x].ID_BOOKING + '",'
          booking = booking + '"text":"' + this.DataBooking[x].PIC + '"},'
          console.log(booking)
        }
        if ((this.DataBooking[x].EQUIPMENT == "EDXRF" || this.DataBooking[x].EQUIPMENT == "EDXRF_RoHS") && (deviceValue == "EDXRF" || deviceValue == "EDXRF_RoHS")) {
          this.newDate = this.DataBooking[x].DATE_BOOKING_START + "T" + this.DataBooking[x].TIME_BOOKING_START
          this.newDate2 = this.DataBooking[x].DATE_BOOKING_END + "T" + this.DataBooking[x].TIME_BOOKING_END
          console.log(this.newDate)
          console.log(this.newDate2)
          count = count + 1
          booking = booking + '{"id":"' + count + '",'
          booking = booking + '"start":"' + this.newDate + '",'
          booking = booking + '"end":"' + this.newDate2 + '",'
          booking = booking + '"ID_BOOKING":"' + this.DataBooking[x].ID_BOOKING + '",'
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
          booking = booking + '"ID_BOOKING":"' + this.DataBooking[x].ID_BOOKING + '",'
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
      this.events2 = this.events
      console.log(this.events)
    }
    else {
      this.events = []
    }
    this.setTable7Day()
    console.log(this.events)

  }
  onOpenDialogClick(ID_BOOKING: string) {
    this.productService.changeMessage(ID_BOOKING)
    const dialogRef = this.matDialog.open(EditBookingComponent, {
      disableClose: true,
      width: '1200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  delete(ID_BOOKING: string) {
    // confirm("Press a button!\nEither OK or Cancel.");
    let text;
    if (confirm("ยืนยันที่จะลบข้อมูลหรือไม่!") == true) {
      text = "You pressed OK!";
      var qtest = ""
      qtest = qtest + "DELETE FROM `mtq10_project_tracking_analysis`.`booking_equipment` WHERE (`ID_BOOKING` = '" + ID_BOOKING + "');"
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
        window.alert("ลบข้อมูลเรียบร้อยแล้ว")
        window.location.reload()
      })

    } else {

      text = "You canceled!";
    }
    console.log(text)

  }

  onOpenAadd_BOOKING() {
    // this.productService.changeMessage(ID_BOOKING)
    // window.open('http://163.50.57.95:82/Tracking_Analysis/BooingEquip?id=' + ID_BOOKING);
    if (this.namequip != '') {
      this.productService.changeMessage(this.namequip)
      const dialogRef = this.matDialog.open(AddBookingEquipmentComponent, {

        // disableClose: true,
        width: '1000px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
    else {
      window.alert("โปรดเลือก Equipment")
    }

  }
}
