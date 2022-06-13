import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../api/product.service';
import { ViewChild, AfterViewInit} from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import {DataService} from "./data.service";

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

  step_no =""
  step1 = ""
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
    console.log(date )
    console.log(this.events)
    console.log(this.events2)
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
 
  constructor(public router: Router,private route: ActivatedRoute,public productService: ProductService,private ds: DataService) { 
    this.viewWeek();
  }

  ngOnInit(): void {
    this.events = this.events2;
    this.userType = this.route.snapshot.queryParamMap.get("id");
    console.log(this.userType)

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
    })

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
  qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`REQ_NUM`, `STEP_BOOKING`, `EQUIPMENT`, `SAMPLE_NUM`, " +
  " `DATE_BOOKING_START`, `TIME_BOOKING_START`, `DATE_BOOKING_END`, `TIME_BOOKING_END`, `OPERATER`) " +
    " VALUES ('"+this.DataRes[0].REQ_NUM +"', '"+this.step_no +"', '"+this.step1 +"', '"+this.Numsample +"', '"+this.startdate1 +"', "+
    " '"+this.starttime +"', '"+this.enddate1 +"', '"+this.endtime +"', '"+this.operator +"');"
    console.log(qtest);
    console.log(this.step1);
    console.log(this.equipbook);
  this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
    console.log(data);
    window.alert("บันทึกข้อมูลเรียบร้อยแล้ว")
    window.location.reload()
  })
 
  
  }
  onChange(deviceValue:any) {
    console.log(deviceValue);
    
    var x
    var count = 0
    for(x in this.sample2){
      count = count +1
      if(this.sample2[x].equip == deviceValue){
        this.step_no = "Step"+count
        console.log("Step"+count);
      }
    }
    
    
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
    this.ds.getEvents(from, to).subscribe(result => {
      // this.events = result;
      this.events = this.events2;
      console.log(this.events)
    });
  }

  viewDay():void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek():void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth():void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

getfata(){
  console.log(this.ds.events )
}

}
