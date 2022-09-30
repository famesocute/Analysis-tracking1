import { Component, OnInit } from '@angular/core';
import { auto } from '@popperjs/core';
import { ProductService } from '../api/product.service';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-kpi-operation',
  templateUrl: './kpi-operation.component.html',
  styleUrls: ['./kpi-operation.component.scss']
})
export class KPIOperationComponent implements OnInit {
  loading = true

  cs_point: any
  point: any
  StartAnalze: any
  date3: any
  date4: any
  date5: any
  period: any
  CStotal = 0
  Request_CS = 0
  approve_report = 0

  overdue = 0
  Gooddue = 0

  Re_per_day = 0
  Out_per_day = 0
  StartAnalze_time = ""

  // 1  2-3  >3
  period_type: any = [0, 0, 0, 0, 0, 0, 0, 0,]

  oper_time: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  Totalpoint: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // 300 400 500 600 700 800 900 6A0 9A0 SGA
  Total_fac: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  count1_total = 0
  count1 = 0
  Aver1 = 0
  count2_total = 0
  count2 = 0
  Aver2 = 0
  count3_total = 0
  count3 = 0
  Aver3 = 0
  count4_total = 0
  count4 = 0
  Aver4 = 0
  count5_total = 0
  count5 = 0
  Aver5 = 0
  count6_total = 0
  count6 = 0
  Aver6 = 0
  count7_total = 0
  count7 = 0
  Aver7 = 0
  count8_total = 0
  count8 = 0
  Aver8 = 0

  Month = ""
  Year = ""
  DataKPI: any
  DataResbookingreq: any

  JobCa_complaint = 0
  JobCa_defect = 0
  JobCa_evaluate_Mat = 0
  JobCa_evaluate_Product = 0
  JobCa_evaluate_Process = 0
  JobCa_project = 0
  JobCa_NC = 0
  JobCa_RoSH = 0
  JobCa_other = 0
  TotalJobCatagorize = 0

  // 300 400 500 600 700 800 900 6A0 9A0 SGA
  ReEachFac_Com: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_defect: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_Mat_evaluate: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_Product_evaluate: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_Process_evaluate: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_RoSH: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_NC: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ReEachFac_other: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // 300 400 500 600 700 800 900 6A0 9A0 SGA
  Normal: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Urgent: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  Total_re = 0
  Total_output_re = 0
  Total_Normal = 0
  Total_Urgent = 0

  Wanut_COm = 0
  Wanut_defect = 0
  Wanut_Mat_evaluate = 0
  Wanut_Product_evaluate = 0
  Wanut_Process_evaluate = 0
  Wanut_RoSH = 0
  Wanut_NC = 0
  Wanut_other = 0
  Suti_COm = 0
  Suti_defect = 0
  Suti_Mat_evaluate = 0
  Suti_Product_evaluate = 0
  Suti_Process_evaluate = 0
  Suti_RoSH = 0
  Suti_NC = 0
  Suti_other = 0
  Para_COm = 0
  Para_defect = 0
  Para_Mat_evaluate = 0
  Para_Product_evaluate = 0
  Para_Process_evaluate = 0
  Para_RoSH = 0
  Para_NC = 0
  Para_other = 0
  Thanya_COm = 0
  Thanya_defect = 0
  Thanya_Mat_evaluate = 0
  Thanya_Product_evaluate = 0
  Thanya_Process_evaluate = 0
  Thanya_RoSH = 0
  Thanya_NC = 0
  Thanya_other = 0
  Supa_COm = 0
  Supa_defect = 0
  Supa_Mat_evaluate = 0
  Supa_Product_evaluate = 0
  Supa_Process_evaluate = 0
  Supa_RoSH = 0
  Supa_NC = 0
  Supa_other = 0
  Panud_COm = 0
  Panud_defect = 0
  Panud_Mat_evaluate = 0
  Panud_Product_evaluate = 0
  Panud_Process_evaluate = 0
  Panud_RoSH = 0
  Panud_NC = 0
  Panud_other = 0
  Gunya_COm = 0
  Gunya_defect = 0
  Gunya_Mat_evaluate = 0
  Gunya_Product_evaluate = 0
  Gunya_Process_evaluate = 0
  Gunya_RoSH = 0
  Gunya_NC = 0
  Gunya_other = 0
  Soon_COm = 0
  Soon_defect = 0
  Soon_Mat_evaluate = 0
  Soon_Product_evaluate = 0
  Soon_Process_evaluate = 0
  Soon_RoSH = 0
  Soon_NC = 0
  Soon_other = 0

  // 300 400 500 600 700 800 900 6A0 9A0 SGA
  Wanut: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Suti: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Para: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Thanya: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Supa: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Panud: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Gunya: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  Soon: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  chartOptions1: any
  chartOptions2: any
  chartOptions3: any
  chartOptions4: any
  chartOptions5: any
  chartOptions6: any
  chartOptions7: any
  chartOptions8: any
  jsonData: any

  exportActive: boolean = false;

  Month2 = "7"
  Year2 = "2022"
  DataKPI_EQUIP: any
  OUTPUT_JOB: any

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.loading = false
    this.JobCatagorize()
    this.RequestEachFactory()
    this.Piority()
    this.Analyzer_cata()
    this.Analyzer_fac()
    this.Cspoint()
    this.Machine_ser()


  }

  Reset() {
    location.reload();
  }
  sumtime(timelast: any, time1: any, time2: any, time3: any) {

    time1 = time1 * 3600
    time2 = time2 * 60
    timelast = parseInt(timelast) + parseInt(time1) + parseInt(time2) + parseInt(time3)

    return (timelast)
  }


  Search() {
    console.log();
    this.productService.TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR_BOOKING(this.Year, this.getMonthFromString(this.Month)).subscribe((data: {}) => {
      this.DataKPI_EQUIP = data
      console.log(this.DataKPI_EQUIP);
      var a
      var lasttime = 0
      var lasttime2 = 0
      for (a in this.DataKPI_EQUIP) {
        console.log(this.DataKPI_EQUIP[a].EQUIPMENT)
        if (this.DataKPI_EQUIP[a].EQUIPMENT == "SEM") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[0] = this.oper_time[0] + lasttime


          }
          lasttime = 0

        }
        else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Cutting") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[1] = this.oper_time[1] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Polishing") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[2] = this.oper_time[2] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "RESIN_MOLDING") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[3] = this.oper_time[3] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Ion-milling" || this.DataKPI_EQUIP[a].EQUIPMENT == "Cross-milling") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[4] = this.oper_time[4] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "VHX") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[5] = this.oper_time[5] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Metallurgical") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[6] = this.oper_time[6] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "EDXRF_RoHS" || this.DataKPI_EQUIP[a].EQUIPMENT == "EDXRF") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[7] = this.oper_time[7] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "ICP") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[8] = this.oper_time[8] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "C_SAM") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[9] = this.oper_time[9] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "CS Analyzer") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[10] = this.oper_time[10] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "FTIR") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[11] = this.oper_time[11] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "GCMS") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[12] = this.oper_time[12] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "DSC") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[13] = this.oper_time[13] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "TG-DTA") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[14] = this.oper_time[14] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Solderwet") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[15] = this.oper_time[15] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Micro-probe") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[16] = this.oper_time[16] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "FE-SEM") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[17] = this.oper_time[17] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "HPLC") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[18] = this.oper_time[18] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "CE") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[19] = this.oper_time[19] + lasttime
          }
          lasttime = 0

        } else if (this.DataKPI_EQUIP[a].EQUIPMENT == "X-ray2D" || this.DataKPI_EQUIP[a].EQUIPMENT == "X-ray3D" || this.DataKPI_EQUIP[a].EQUIPMENT == "X-ray reflow") {

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime, timez[0], timez[1], timez[2]))
            lasttime = this.sumtime(lasttime, timez[0], timez[1], timez[2])
            lasttime = lasttime / 3600
            console.log(lasttime)
            this.oper_time[21] = this.oper_time[21] + lasttime
          }
          lasttime = 0

        }

      }
      this.Machine_ser()
      console.log(this.oper_time[0])
      console.log(this.oper_time)

    })
    // Total Out put per date
    this.productService.TRACKING_ANALYSIS_SELECT_KPI_OUTPUT_JOB(this.Year, this.getMonthFromString(this.Month)).subscribe((data: {}) => {
      this.OUTPUT_JOB = data
      console.log(this.OUTPUT_JOB);
      var x: any
      for (x in this.OUTPUT_JOB) {
        this.Total_output_re = this.Total_output_re + 1

      }

    })


    this.productService.TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR(this.Year, this.Month).subscribe((data: {}) => {
      this.DataKPI = data
      console.log(this.DataKPI);

      this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
        this.DataResbookingreq = data
        console.log(this.DataResbookingreq);

        var i: any
        var x: any

        for (i in this.DataKPI) {

// Operation day
          this.StartAnalze = this.DataResbookingreq.find((item: { REQ_NUM: any; }) => item.REQ_NUM === this.DataKPI[i].REQ_NUM)
          console.log(this.StartAnalze)

          if (this.StartAnalze == "undefined" || this.StartAnalze == undefined) {
            console.log('Good')
          } else {
            console.log(this.StartAnalze.START_TIME)


            if (this.StartAnalze.START_TIME == "" || this.StartAnalze.START_TIME == "null" || this.StartAnalze.START_TIME == 0 || this.StartAnalze.START_TIME == null) {
            } else {
              var timecalStart = this.StartAnalze.START_TIME.split(" ")
              if (timecalStart[2] == "PM") {
                var hoursEND2
                const [hoursEND, minutesEND, secondsEND] = timecalStart[1].split(':');
                if (hoursEND == 12) {
                  hoursEND2 = 12
                  timecalStart[1] = hoursEND2 + ":" + minutesEND + ":" + secondsEND
                  console.log(timecalStart[1])
                } else {
                  console.log(this.dateto24(timecalStart[1]))
                  timecalStart[1] = this.dateto24(timecalStart[1])
                }
              }
              timecalStart[0] = timecalStart[0].substring(0, timecalStart[0].length - 1);

              const [month, day, year] = timecalStart[0].split('/');
              const [hours, minutes, seconds] = timecalStart[1].split(':');

              this.date3 = new Date(+year, +month, +day, +hours, +minutes, +seconds);
              console.log(this.date3); // 👉️ Fri Jun 24 2022 09:30:05
            }  
          }

          // End
          if (this.DataKPI[i].APPROVE_REPORT_DATE == "" || this.DataKPI[i].APPROVE_REPORT_DATE == null) {

          } else {
            this.approve_report = this.approve_report + 1

            console.log(this.DataKPI[i].APPROVE_REPORT_DATE);
            var timecalEND = this.DataKPI[i].APPROVE_REPORT_DATE.split(" ")
            if (timecalEND[2] == "PM") {
              var hoursEND2
              const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');
              if (hoursEND == 12) {
                hoursEND2 = 12
                timecalEND[1] = hoursEND2 + ":" + minutesEND + ":" + secondsEND
                console.log(timecalEND[1])
              } else {
                console.log(this.dateto24(timecalEND[1]))
                timecalEND[1] = this.dateto24(timecalEND[1])
              }
            }
            timecalEND[0] = timecalEND[0].substring(0, timecalEND[0].length - 1);

            const [monthEND, dayEND, yearEND] = timecalEND[0].split('/');
            const [hoursEND, minutesEND, secondsEND] = timecalEND[1].split(':');

            this.date4 = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
            console.log(this.date4); // 👉️ Fri Jun 24 2022 09:30:05
            // calculate
            var numDate = new Date(this.date4.getTime() - this.date3.getTime());
            console.log(numDate)
            // 3600000 ms
            this.period = this.msToTime(numDate)
            console.log(this.period)

            const [hours, minutes, seconds] = this.period.split(':');
            var total = (hours * 60) + parseInt(minutes)
            console.log(total)

            if (total <= 1440) {
              this.period_type[0] = this.period_type[0] + 1
              console.log(this.period_type[0])
            } else if (total > 1440 && total <= 4320) {
              this.period_type[1] = this.period_type[1] + 1
              console.log(this.period_type[1])
            } else if (total > 4320) {
              this.period_type[2] = this.period_type[2] + 1
              console.log(this.period_type[2])
            }

// PS ratio
           if (this.DataKPI[i].FINISH_DATE == "" || this.DataKPI[i].FINISH_DATE == null) {

          } else {
            console.log(this.DataKPI[i].FINISH_DATE);
            const timecalEND = "23:00:00"

            const [monthEND, dayEND, yearEND] = this.DataKPI[i].FINISH_DATE.split('/');
            const [hoursEND, minutesEND, secondsEND] = timecalEND.split(':');

            this.date5 = new Date(+yearEND, +monthEND, +dayEND, +hoursEND, +minutesEND, +secondsEND);
            console.log(this.date5); // 👉️ Fri Jun 24 2022 09:30:05
            // calculate
            var numDate = new Date(this.date5.getTime() - this.date4.getTime());
            console.log(numDate)
            // 3600000 ms
            this.period = this.msToTime(numDate)
            console.log(this.period)

            var result =  this.period.substring(0,1);
            if(result == "-"){
              console.log("Bad")
              this.overdue = this.overdue + 1
            }else{
              console.log("Good")
              this.Gooddue = this.Gooddue + 1
            }
          }

          }
           
          // Total request
          this.Total_re = this.Total_re + 1

          //Total normal request and urgent request
          if (this.DataKPI[i].PIORITY == 'Normal') { this.Total_Normal = this.Total_Normal + 1 }
          else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Total_Urgent = this.Total_Urgent + 1 }

          console.log(this.DataKPI[i].APPROVE_REPORT_DATE)


          // Cs point
          if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[7] = this.Totalpoint[7] + point2
                console.log(this.Totalpoint[7])

                this.count8 = parseInt(x) + 1
                console.log(this.count8)
              }
              this.Request_CS = this.Request_CS + 1
              this.count8_total = this.count8_total + this.count8
              console.log(this.count8_total)
              this.Aver8 = this.Totalpoint[7] / this.count8_total
              console.log(this.Aver8)
            }

          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
            console.log(this.DataKPI[i].CS_SCORE)

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[0] = this.Totalpoint[0] + point2
                console.log(this.Totalpoint[0])

                this.count1 = parseInt(x) + 1
                console.log(this.count1)
              }
              this.Request_CS = this.Request_CS + 1
              this.count1_total = this.count1_total + this.count1
              console.log(this.count1_total)
              this.Aver1 = this.Totalpoint[0] / this.count1_total
              console.log(this.Aver1)
            }

          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[1] = this.Totalpoint[1] + point2
                console.log(this.Totalpoint[1])

                this.count2 = parseInt(x) + 1
                console.log(this.count2)
              }
              this.Request_CS = this.Request_CS + 1
              this.count2_total = this.count2_total + this.count2
              console.log(this.count2_total)
              this.Aver2 = this.Totalpoint[1] / this.count2_total
              console.log(this.Aver2)
            }


          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[2] = this.Totalpoint[2] + point2
                console.log(this.Totalpoint[2])

                this.count3 = parseInt(x) + 1
                console.log(this.count3)
              }
              this.Request_CS = this.Request_CS + 1
              this.count3_total = this.count3_total + this.count3
              console.log(this.count3_total)
              this.Aver3 = this.Totalpoint[2] / this.count3_total
              console.log(this.Aver3)
            }

          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[3] = this.Totalpoint[3] + point2
                console.log(this.Totalpoint[3])

                this.count4 = parseInt(x) + 1
                console.log(this.count4)
                // this.count4_total = this.count4_total + count4
                // console.log(this.count4_total)
              }
              this.Request_CS = this.Request_CS + 1
              this.count4_total = this.count4_total + this.count4
              console.log(this.count4_total)
              this.Aver4 = this.Totalpoint[3] / this.count4_total
              console.log(this.Aver4)
            }

          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[4] = this.Totalpoint[4] + point2
                console.log(this.Totalpoint[4])

                this.count5 = parseInt(x) + 1
                console.log(this.count5)
              }
              this.Request_CS = this.Request_CS + 1
              this.count5_total = this.count5_total + this.count5
              console.log(this.count5_total)
              this.Aver5 = this.Totalpoint[4] / this.count5_total
              console.log(this.Aver5)
            }

          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[5] = this.Totalpoint[5] + point2
                console.log(this.Totalpoint[5])

                this.count6 = parseInt(x) + 1
                console.log(this.count6)
              }
              this.Request_CS = this.Request_CS + 1
              this.count6_total = this.count6_total + this.count6
              console.log(this.count6_total)
              this.Aver6 = this.Totalpoint[5] / this.count6_total
              console.log(this.Aver6)
            }

          } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {

            if (this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null) {
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x: any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.CStotal = this.CStotal + point2
                this.Totalpoint[6] = this.Totalpoint[6] + point2
                console.log(this.Totalpoint[6])

                this.count7 = parseInt(x) + 1
                console.log(this.count7)
              }
              this.Request_CS = this.Request_CS + 1
              this.count7_total = this.count7_total + this.count7
              console.log(this.count7_total)
              this.Aver7 = this.Totalpoint[6] / this.count7_total
              console.log(this.Aver7)
            }
          }

          // Request by job catagorize and Analyzer each catagorize
          if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') {
            this.JobCa_complaint = this.JobCa_complaint + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_COm = this.Wanut_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_COm = this.Suti_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_COm = this.Para_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_COm = this.Thanya_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_COm = this.Supa_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_COm = this.Panud_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_COm = this.Gunya_COm + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_COm = this.Soon_COm + 1
            }

          } else if (this.DataKPI[i].ANA_TYPE == 'Defective') {
            this.JobCa_defect = this.JobCa_defect + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_defect = this.Wanut_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_defect = this.Suti_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_defect = this.Para_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_defect = this.Thanya_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_defect = this.Supa_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_defect = this.Panud_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_defect = this.Gunya_defect + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_defect = this.Soon_defect + 1
            }
          } else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') {
            this.JobCa_NC = this.JobCa_NC + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_NC = this.Wanut_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_NC = this.Suti_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_NC = this.Para_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_NC = this.Thanya_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_NC = this.Supa_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_NC = this.Panud_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_NC = this.Gunya_NC + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_NC = this.Soon_NC + 1
            }

          } else if (this.DataKPI[i].ANA_TYPE == 'RoHS') {
            this.JobCa_RoSH = this.JobCa_RoSH + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_RoSH = this.Wanut_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_RoSH = this.Suti_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_RoSH = this.Para_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_RoSH = this.Thanya_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_RoSH = this.Supa_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_RoSH = this.Panud_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_RoSH = this.Gunya_RoSH + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_RoSH = this.Soon_RoSH + 1
            }

          } else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') {
            this.JobCa_evaluate_Process = this.JobCa_evaluate_Process + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_Process_evaluate = this.Wanut_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_Process_evaluate = this.Suti_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_Process_evaluate = this.Para_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_Process_evaluate = this.Thanya_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_Process_evaluate = this.Supa_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_Process_evaluate = this.Panud_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_Process_evaluate = this.Gunya_Process_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_Process_evaluate = this.Soon_Process_evaluate + 1
            }
          } else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') {
            this.JobCa_evaluate_Mat = this.JobCa_evaluate_Mat + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_Mat_evaluate = this.Wanut_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_Mat_evaluate = this.Suti_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_Mat_evaluate = this.Para_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_Mat_evaluate = this.Thanya_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_Mat_evaluate = this.Supa_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_Mat_evaluate = this.Panud_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_Mat_evaluate = this.Gunya_Mat_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_Mat_evaluate = this.Soon_Mat_evaluate + 1
            }

          } else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') {
            this.JobCa_evaluate_Product = this.JobCa_evaluate_Product + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_Product_evaluate = this.Wanut_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_Product_evaluate = this.Suti_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_Product_evaluate = this.Para_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_Product_evaluate = this.Thanya_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_Product_evaluate = this.Supa_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_Product_evaluate = this.Panud_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_Product_evaluate = this.Gunya_Product_evaluate + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_Product_evaluate = this.Soon_Product_evaluate + 1
            }

          } else {
            this.JobCa_other = this.JobCa_other + 1

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut_other = this.Wanut_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti_other = this.Suti_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para_other = this.Para_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya_other = this.Thanya_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa_other = this.Supa_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud_other = this.Panud_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya_other = this.Gunya_other + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon_other = this.Soon_other + 1
            }
          }

          this.TotalJobCatagorize = this.TotalJobCatagorize + 1

          // Request each factory and Piolity and Analyzer each factory
          if (this.DataKPI[i].DEP_MENT == 'MT300') {
            this.Total_fac[0] = this.Total_fac[0] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[0] = this.ReEachFac_Com[0] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[0] = this.ReEachFac_defect[0] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[0] = this.ReEachFac_NC[0] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[0] = this.ReEachFac_Process_evaluate[0] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[0] = this.ReEachFac_Mat_evaluate[0] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[0] = this.ReEachFac_Product_evaluate[0] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[0] = this.ReEachFac_RoSH[0] + 1 }
            else { this.ReEachFac_other[0] = this.ReEachFac_other[0] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[0] = this.Normal[0] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[0] = this.Urgent[0] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[0] = this.Wanut[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[0] = this.Suti[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[0] = this.Para[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[0] = this.Thanya[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[0] = this.Supa[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[0] = this.Panud[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[0] = this.Gunya[0] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[0] = this.Soon[0] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT400') {
            this.Total_fac[1] = this.Total_fac[1] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[1] = this.ReEachFac_Com[1] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[1] = this.ReEachFac_defect[1] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[1] = this.ReEachFac_NC[1] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[1] = this.ReEachFac_Process_evaluate[1] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[1] = this.ReEachFac_Mat_evaluate[1] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[1] = this.ReEachFac_Product_evaluate[1] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[1] = this.ReEachFac_RoSH[1] + 1 }
            else { this.ReEachFac_other[1] = this.ReEachFac_other[1] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[1] = this.Normal[1] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[1] = this.Urgent[1] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[1] = this.Wanut[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[1] = this.Suti[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[1] = this.Para[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[1] = this.Thanya[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[1] = this.Supa[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[1] = this.Panud[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[1] = this.Gunya[1] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[1] = this.Soon[1] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT500') {
            this.Total_fac[2] = this.Total_fac[2] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[2] = this.ReEachFac_Com[2] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[2] = this.ReEachFac_defect[2] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[2] = this.ReEachFac_NC[2] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[2] = this.ReEachFac_Process_evaluate[2] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[2] = this.ReEachFac_Mat_evaluate[2] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[2] = this.ReEachFac_Product_evaluate[2] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[2] = this.ReEachFac_RoSH[2] + 1 }
            else { this.ReEachFac_other[2] = this.ReEachFac_other[2] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[2] = this.Normal[2] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[2] = this.Urgent[2] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[2] = this.Wanut[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[2] = this.Suti[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[2] = this.Para[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[2] = this.Thanya[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[2] = this.Supa[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[2] = this.Panud[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[2] = this.Gunya[2] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[2] = this.Soon[2] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT600') {
            this.Total_fac[3] = this.Total_fac[3] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[3] = this.ReEachFac_Com[3] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[3] = this.ReEachFac_defect[3] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[3] = this.ReEachFac_NC[3] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[3] = this.ReEachFac_Process_evaluate[3] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[3] = this.ReEachFac_Mat_evaluate[3] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[3] = this.ReEachFac_Product_evaluate[3] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[3] = this.ReEachFac_RoSH[3] + 1 }
            else { this.ReEachFac_other[3] = this.ReEachFac_other[3] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[3] = this.Normal[3] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[3] = this.Urgent[3] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[3] = this.Wanut[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[3] = this.Suti[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[3] = this.Para[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[3] = this.Thanya[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[3] = this.Supa[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[3] = this.Panud[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[3] = this.Gunya[3] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[3] = this.Soon[3] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT700') {
            this.Total_fac[4] = this.Total_fac[4] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[4] = this.ReEachFac_Com[4] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[4] = this.ReEachFac_defect[4] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[4] = this.ReEachFac_NC[4] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[4] = this.ReEachFac_Process_evaluate[4] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[4] = this.ReEachFac_Mat_evaluate[4] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[4] = this.ReEachFac_Product_evaluate[4] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[4] = this.ReEachFac_RoSH[4] + 1 }
            else { this.ReEachFac_other[4] = this.ReEachFac_other[4] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[4] = this.Normal[4] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[4] = this.Urgent[4] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[4] = this.Wanut[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[4] = this.Suti[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[4] = this.Para[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[4] = this.Thanya[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[4] = this.Supa[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[4] = this.Panud[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[4] = this.Gunya[4] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[4] = this.Soon[4] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT800') {
            this.Total_fac[5] = this.Total_fac[5] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[5] = this.ReEachFac_Com[5] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[5] = this.ReEachFac_defect[5] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[5] = this.ReEachFac_NC[5] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[5] = this.ReEachFac_Process_evaluate[5] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[5] = this.ReEachFac_Mat_evaluate[5] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[5] = this.ReEachFac_Product_evaluate[5] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[5] = this.ReEachFac_RoSH[5] + 1 }
            else { this.ReEachFac_other[5] = this.ReEachFac_other[5] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[5] = this.Normal[5] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[5] = this.Urgent[5] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[5] = this.Wanut[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[5] = this.Suti[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[5] = this.Para[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[5] = this.Thanya[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[5] = this.Supa[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[5] = this.Panud[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[5] = this.Gunya[5] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[5] = this.Soon[5] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT900') {
            this.Total_fac[6] = this.Total_fac[6] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[6] = this.ReEachFac_Com[6] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[6] = this.ReEachFac_defect[6] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[6] = this.ReEachFac_NC[6] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[6] = this.ReEachFac_Process_evaluate[6] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[6] = this.ReEachFac_Mat_evaluate[6] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[6] = this.ReEachFac_Product_evaluate[6] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[6] = this.ReEachFac_RoSH[6] + 1 }
            else { this.ReEachFac_other[6] = this.ReEachFac_other[6] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[6] = this.Normal[6] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[6] = this.Urgent[6] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[6] = this.Wanut[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[6] = this.Suti[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[6] = this.Para[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[6] = this.Thanya[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[6] = this.Supa[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[6] = this.Panud[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[6] = this.Gunya[6] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[6] = this.Soon[6] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT6A0') {
            this.Total_fac[7] = this.Total_fac[7] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[7] = this.ReEachFac_Com[7] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[7] = this.ReEachFac_defect[7] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[7] = this.ReEachFac_NC[7] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[7] = this.ReEachFac_Process_evaluate[7] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[7] = this.ReEachFac_Mat_evaluate[7] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[7] = this.ReEachFac_Product_evaluate[7] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[7] = this.ReEachFac_RoSH[7] + 1 }
            else { this.ReEachFac_other[7] = this.ReEachFac_other[7] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[7] = this.Normal[7] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[7] = this.Urgent[7] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[7] = this.Wanut[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[7] = this.Suti[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[7] = this.Para[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[7] = this.Thanya[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[7] = this.Supa[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[7] = this.Panud[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[7] = this.Gunya[7] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[7] = this.Soon[7] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT9A0') {
            this.Total_fac[8] = this.Total_fac[8] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[8] = this.ReEachFac_Com[8] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[8] = this.ReEachFac_defect[8] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[8] = this.ReEachFac_NC[8] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[8] = this.ReEachFac_Process_evaluate[8] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[8] = this.ReEachFac_Mat_evaluate[8] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[8] = this.ReEachFac_Product_evaluate[8] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[8] = this.ReEachFac_RoSH[8] + 1 }
            else { this.ReEachFac_other[8] = this.ReEachFac_other[8] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[8] = this.Normal[8] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[8] = this.Urgent[8] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[8] = this.Wanut[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[8] = this.Suti[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[8] = this.Para[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[8] = this.Thanya[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[8] = this.Supa[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[8] = this.Panud[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[8] = this.Gunya[8] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[8] = this.Soon[8] + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MTA00' || this.DataKPI[i].DEP_MENT == 'MTB00' || this.DataKPI[i].DEP_MENT == 'MTE00' || this.DataKPI[i].DEP_MENT == 'MTF00' || this.DataKPI[i].DEP_MENT == 'MTM00' || this.DataKPI[i].DEP_MENT == 'MTQ00') {
            this.Total_fac[9] = this.Total_fac[9] + 1

            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com[9] = this.ReEachFac_Com[9] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect[9] = this.ReEachFac_defect[9] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC[9] = this.ReEachFac_NC[9] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate[9] = this.ReEachFac_Process_evaluate[9] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate[9] = this.ReEachFac_Mat_evaluate[9] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate[9] = this.ReEachFac_Product_evaluate[9] + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH[9] = this.ReEachFac_RoSH[9] + 1 }
            else { this.ReEachFac_other[9] = this.ReEachFac_other[9] + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal[9] = this.Normal[9] + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent[9] = this.Urgent[9] + 1 }

            if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>') {
              this.Wanut[9] = this.Wanut[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>') {
              this.Suti[9] = this.Suti[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>') {
              this.Para[9] = this.Para[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>') {
              this.Thanya[9] = this.Thanya[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>') {
              this.Supa[9] = this.Supa[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>') {
              this.Panud[9] = this.Panud[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>') {
              this.Gunya[9] = this.Gunya[9] + 1
            } else if (this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>') {
              this.Soon[9] = this.Soon[9] + 1
            }
          }

          // const result = this.DataResbookingreq.filter((a: { REQ_NUM: string; }) => a.REQ_NUM === this.DataKPI[i].REQ_NUM);
          // console.log(result)

        }


        // Receive_job_per_day and Output_job_per_day
        console.log(this.Total_re)
        this.Re_per_day = this.Total_re / 22
        console.log(this.Re_per_day)

        console.log(this.Total_output_re);
        this.Out_per_day = this.Total_output_re / 22
        console.log(this.Out_per_day)

        var oneday = (this.period_type[0] / this.approve_report)*100
        console.log(oneday)
        var twoday = (this.period_type[1] / this.approve_report)*100
        console.log(twoday)
        var morethreeday = (this.period_type[2] / this.approve_report)*100
        console.log(morethreeday)

        // CS total cal
        console.log(this.CStotal)
        console.log(this.Request_CS)
        var Cs = this.CStotal / (this.Request_CS * 5)
        console.log(Cs)

        // PS ratio
       var PS_ratio = (this.Gooddue / this.Total_re)*100
       console.log(PS_ratio)

        this.jsonData = [
          {
            PS_ratio: PS_ratio.toFixed(0) + "%",
            CS_score: Cs,
            _1Day: oneday.toFixed(0) + "%",
            _2to3Days: twoday.toFixed(0) + "%",
            More_3Day: morethreeday.toFixed(0) + "%",
            Total_request: this.Total_re,
            Normal: this.Total_Normal,
            Urgent: this.Total_Urgent,
            Receive_job_per_day: this.Re_per_day.toFixed(0),
            Output_job_per_day: this.Out_per_day.toFixed(0),
            Customer_complaint: this.JobCa_complaint,
            NC: this.JobCa_NC,
            Defective: this.JobCa_defect,
            Material_eva: this.JobCa_evaluate_Mat,
            Process_eva: this.JobCa_evaluate_Process,
            Product_eva: this.JobCa_evaluate_Product,
            RoHS_Special: this.JobCa_RoSH,
            Other: this.JobCa_other,
            Total_300: this.Total_fac[0],
            Total_400: this.Total_fac[1],
            Total_500: this.Total_fac[2],
            Total_600: this.Total_fac[3],
            Total_700: this.Total_fac[4],
            Total_800: this.Total_fac[5],
            Total_900: this.Total_fac[6],
            Total_6A0: this.Total_fac[7],
            Total_9A0: this.Total_fac[8],
            Total_SGA: this.Total_fac[9],
            Normal_300: this.Normal[0],
            Normal_400: this.Normal[1],
            Normal_500: this.Normal[2],
            Normal_600: this.Normal[3],
            Normal_700: this.Normal[4],
            Normal_800: this.Normal[5],
            Normal_900: this.Normal[6],
            Normal_6A0: this.Normal[7],
            Normal_9A0: this.Normal[8],
            Normal_SGA: this.Normal[9],
            Urgent_300: this.Urgent[0],
            Urgent_400: this.Urgent[1],
            Urgent_500: this.Urgent[2],
            Urgent_600: this.Urgent[3],
            Urgent_700: this.Urgent[4],
            Urgent_800: this.Urgent[5],
            Urgent_900: this.Urgent[6],
            Urgent_6A0: this.Urgent[7],
            Urgent_9A0: this.Urgent[8],
            Urgent_SGA: this.Urgent[9],
          },

        ];
        this.JobCatagorize()
        this.RequestEachFactory()
        this.Piority()
        this.Analyzer_cata()
        this.Analyzer_fac()
        this.Cspoint()

      })

    })
  }

  msToTime(s: any) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }

  dateto24(time1: any) {
    var time2 = time1.split(":")
    var time3 = parseInt(time2[0]) + 12
    console.log(time3)
    return (time3 + ":" + time2[1] + ":" + time2[2])
  }

  getMonthFromString(Month: any) {

    var d = Date.parse(Month + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  }
  JobCatagorize() {

    this.chartOptions1 = {
      animationEnabled: true,
      theme: "light2",
      exportEnabled: true,
      title: {
        text: "Request by job catagorize"
      },
      // subtitles: [{
      // text: "Median hours/week"
      // }],
      data: [{
        type: "pie", //change type to column, line, area, doughnut, etc
        indexLabel: "{name}: {y} request",
        dataPoints: [
          { name: "Costomer complaint", y: this.JobCa_complaint },
          { name: "Defective", y: this.JobCa_defect },
          { name: "Material evaluate", y: this.JobCa_evaluate_Mat },
          { name: "Process evaluate", y: this.JobCa_evaluate_Process },
          { name: "Product evaluate", y: this.JobCa_evaluate_Product },
          { name: "NC/Reject", y: this.JobCa_NC },
          { name: "RoHS", y: this.JobCa_RoSH },
          { name: "Other", y: this.JobCa_other }
        ]
      }]
    }
  }
  RequestEachFactory() {
    this.chartOptions2 = {
      theme: "light2",
      title: {
        text: "Request of each factory"
      },
      animationEnabled: true,
      toolTip: {
        shared: true
      },
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
        reversed: true
      },
      axisY: {
        includeZero: true
      },
      data: [{
        type: "stackedColumn",
        name: "Complaint",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Com[0] },
          { label: "MT400", y: this.ReEachFac_Com[1] },
          { label: "MT500", y: this.ReEachFac_Com[2] },
          { label: "MT600", y: this.ReEachFac_Com[3] },
          { label: "MT700", y: this.ReEachFac_Com[4] },
          { label: "MT800", y: this.ReEachFac_Com[5] },
          { label: "MT900", y: this.ReEachFac_Com[6] },
          { label: "MT6A0", y: this.ReEachFac_Com[7] },
          { label: "MT9A0", y: this.ReEachFac_Com[8] },
          { label: "SGA", y: this.ReEachFac_Com[9] },
        ]
      }, {
        type: "stackedColumn",
        name: "Defective",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_defect[0] },
          { label: "MT400", y: this.ReEachFac_defect[1] },
          { label: "MT500", y: this.ReEachFac_defect[2] },
          { label: "MT600", y: this.ReEachFac_defect[3] },
          { label: "MT700", y: this.ReEachFac_defect[4] },
          { label: "MT800", y: this.ReEachFac_defect[5] },
          { label: "MT900", y: this.ReEachFac_defect[6] },
          { label: "MT6A0", y: this.ReEachFac_defect[7] },
          { label: "MT9A0", y: this.ReEachFac_defect[8] },
          { label: "SGA", y: this.ReEachFac_defect[9] },
        ]
      }, {
        type: "stackedColumn",
        name: "Material evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Mat_evaluate[0] },
          { label: "MT400", y: this.ReEachFac_Mat_evaluate[1] },
          { label: "MT500", y: this.ReEachFac_Mat_evaluate[2] },
          { label: "MT600", y: this.ReEachFac_Mat_evaluate[3] },
          { label: "MT700", y: this.ReEachFac_Mat_evaluate[4] },
          { label: "MT800", y: this.ReEachFac_Mat_evaluate[5] },
          { label: "MT900", y: this.ReEachFac_Mat_evaluate[6] },
          { label: "MT6A0", y: this.ReEachFac_Mat_evaluate[7] },
          { label: "MT9A0", y: this.ReEachFac_Mat_evaluate[8] },
          { label: "SGA", y: this.ReEachFac_Mat_evaluate[9] },
        ]
      }, {
        type: "stackedColumn",
        name: "Process evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Process_evaluate[0] },
          { label: "MT400", y: this.ReEachFac_Process_evaluate[1] },
          { label: "MT500", y: this.ReEachFac_Process_evaluate[2] },
          { label: "MT600", y: this.ReEachFac_Process_evaluate[3] },
          { label: "MT700", y: this.ReEachFac_Process_evaluate[4] },
          { label: "MT800", y: this.ReEachFac_Process_evaluate[5] },
          { label: "MT900", y: this.ReEachFac_Process_evaluate[6] },
          { label: "MT6A0", y: this.ReEachFac_Process_evaluate[7] },
          { label: "MT9A0", y: this.ReEachFac_Process_evaluate[8] },
          { label: "SGA", y: this.ReEachFac_Process_evaluate[9] },
        ]
      }, {
        type: "stackedColumn",
        name: "Product evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Product_evaluate[0] },
          { label: "MT400", y: this.ReEachFac_Product_evaluate[1] },
          { label: "MT500", y: this.ReEachFac_Product_evaluate[2] },
          { label: "MT600", y: this.ReEachFac_Product_evaluate[3] },
          { label: "MT700", y: this.ReEachFac_Product_evaluate[4] },
          { label: "MT800", y: this.ReEachFac_Product_evaluate[5] },
          { label: "MT900", y: this.ReEachFac_Product_evaluate[6] },
          { label: "MT6A0", y: this.ReEachFac_Product_evaluate[7] },
          { label: "MT9A0", y: this.ReEachFac_Product_evaluate[8] },
          { label: "SGA", y: this.ReEachFac_Product_evaluate[9] },
        ]
      },
      {
        type: "stackedColumn",
        name: "RoSH",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_RoSH[0] },
          { label: "MT400", y: this.ReEachFac_RoSH[1] },
          { label: "MT500", y: this.ReEachFac_RoSH[2] },
          { label: "MT600", y: this.ReEachFac_RoSH[3] },
          { label: "MT700", y: this.ReEachFac_RoSH[4] },
          { label: "MT800", y: this.ReEachFac_RoSH[5] },
          { label: "MT900", y: this.ReEachFac_RoSH[6] },
          { label: "MT6A0", y: this.ReEachFac_RoSH[7] },
          { label: "MT9A0", y: this.ReEachFac_RoSH[8] },
          { label: "SGA", y: this.ReEachFac_RoSH[9] },
        ]
      },
      {
        type: "stackedColumn",
        name: "NC/Reject",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_NC[0] },
          { label: "MT400", y: this.ReEachFac_NC[1] },
          { label: "MT500", y: this.ReEachFac_NC[2] },
          { label: "MT600", y: this.ReEachFac_NC[3] },
          { label: "MT700", y: this.ReEachFac_NC[4] },
          { label: "MT800", y: this.ReEachFac_NC[5] },
          { label: "MT900", y: this.ReEachFac_NC[6] },
          { label: "MT6A0", y: this.ReEachFac_NC[7] },
          { label: "MT9A0", y: this.ReEachFac_NC[8] },
          { label: "SGA", y: this.ReEachFac_NC[9] },
        ]
      },
      {
        type: "stackedColumn",
        name: "Other",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_other[0] },
          { label: "MT400", y: this.ReEachFac_other[1] },
          { label: "MT500", y: this.ReEachFac_other[2] },
          { label: "MT600", y: this.ReEachFac_other[3] },
          { label: "MT700", y: this.ReEachFac_other[4] },
          { label: "MT800", y: this.ReEachFac_other[5] },
          { label: "MT900", y: this.ReEachFac_other[6] },
          { label: "MT6A0", y: this.ReEachFac_other[7] },
          { label: "MT9A0", y: this.ReEachFac_other[8] },
          { label: "SGA", y: this.ReEachFac_other[9] },
        ]
      }]
    }
  }

  Piority() {
    this.chartOptions3 = {
      theme: "light2",
      title: {
        text: "Piority job of each factory"
      },
      animationEnabled: true,
      toolTip: {
        shared: true
      },
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
        reversed: true
      },
      axisY: {
        includeZero: true
      },
      data: [{
        type: "stackedColumn",
        name: "Normal",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.Normal[0] },
          { label: "MT400", y: this.Normal[1] },
          { label: "MT500", y: this.Normal[2] },
          { label: "MT600", y: this.Normal[3] },
          { label: "MT700", y: this.Normal[4] },
          { label: "MT800", y: this.Normal[5] },
          { label: "MT900", y: this.Normal[6] },
          { label: "MT6A0", y: this.Normal[7] },
          { label: "MT9A0", y: this.Normal[8] },
          { label: "SGA", y: this.Normal[9] },
        ]
      }, {
        type: "stackedColumn",
        name: "Urgent",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.Urgent[0] },
          { label: "MT400", y: this.Urgent[1] },
          { label: "MT500", y: this.Urgent[2] },
          { label: "MT600", y: this.Urgent[3] },
          { label: "MT700", y: this.Urgent[4] },
          { label: "MT800", y: this.Urgent[5] },
          { label: "MT900", y: this.Urgent[6] },
          { label: "MT6A0", y: this.Urgent[7] },
          { label: "MT9A0", y: this.Urgent[8] },
          { label: "SGA", y: this.Urgent[9] },
        ]
      }]
    }
  }

  Analyzer_cata() {
    this.chartOptions4 = {
      theme: "light2",
      title: {
        text: "Request in each job catagorize"
      },
      animationEnabled: true,
      toolTip: {
        shared: true
      },
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
        reversed: true
      },
      axisY: {
        includeZero: true
      },
      data: [{
        type: "stackedColumn",
        name: "Complaint",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_COm },
          { label: "Suticha", y: this.Suti_COm },
          { label: "Parawee", y: this.Para_COm },
          { label: "Thanyarat", y: this.Thanya_COm },
          { label: "Supakan", y: this.Supa_COm },
          { label: "Panudda", y: this.Panud_COm },
          { label: "Gunyarat", y: this.Gunya_COm },
          { label: "Soontree", y: this.Soon_COm },
        ]
      }, {
        type: "stackedColumn",
        name: "Defective",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_defect },
          { label: "Suticha", y: this.Suti_defect },
          { label: "Parawee", y: this.Para_defect },
          { label: "Thanyarat", y: this.Thanya_defect },
          { label: "Supakan", y: this.Supa_defect },
          { label: "Panudda", y: this.Panud_defect },
          { label: "Gunyarat", y: this.Gunya_defect },
          { label: "Soontree", y: this.Soon_defect },
        ]
      }, {
        type: "stackedColumn",
        name: "Material evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_Mat_evaluate },
          { label: "Suticha", y: this.Suti_Mat_evaluate },
          { label: "Parawee", y: this.Para_Mat_evaluate },
          { label: "Thanyarat", y: this.Thanya_Mat_evaluate },
          { label: "Supakan", y: this.Supa_Mat_evaluate },
          { label: "Panudda", y: this.Panud_Mat_evaluate },
          { label: "Gunyarat", y: this.Gunya_Mat_evaluate },
          { label: "Soontree", y: this.Soon_Mat_evaluate },
        ]
      }, {
        type: "stackedColumn",
        name: "Process evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_Process_evaluate },
          { label: "Suticha", y: this.Suti_Process_evaluate },
          { label: "Parawee", y: this.Para_Process_evaluate },
          { label: "Thanyarat", y: this.Thanya_Process_evaluate },
          { label: "Supakan", y: this.Supa_Process_evaluate },
          { label: "Panudda", y: this.Panud_Process_evaluate },
          { label: "Gunyarat", y: this.Gunya_Process_evaluate },
          { label: "Soontree", y: this.Soon_Process_evaluate },
        ]
      }, {
        type: "stackedColumn",
        name: "Product evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_Product_evaluate },
          { label: "Suticha", y: this.Suti_Product_evaluate },
          { label: "Parawee", y: this.Para_Product_evaluate },
          { label: "Thanyarat", y: this.Thanya_Product_evaluate },
          { label: "Supakan", y: this.Supa_Product_evaluate },
          { label: "Panudda", y: this.Panud_Product_evaluate },
          { label: "Gunyarat", y: this.Gunya_Product_evaluate },
          { label: "Soontree", y: this.Soon_Product_evaluate },
        ]
      }, {
        type: "stackedColumn",
        name: "RoSH",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_RoSH },
          { label: "Suticha", y: this.Suti_RoSH },
          { label: "Parawee", y: this.Para_RoSH },
          { label: "Thanyarat", y: this.Thanya_RoSH },
          { label: "Supakan", y: this.Supa_RoSH },
          { label: "Panudda", y: this.Panud_RoSH },
          { label: "Gunyarat", y: this.Gunya_RoSH },
          { label: "Soontree", y: this.Soon_RoSH },
        ]
      }, {
        type: "stackedColumn",
        name: "NC/Reject",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_NC },
          { label: "Suticha", y: this.Suti_NC },
          { label: "Parawee", y: this.Para_NC },
          { label: "Thanyarat", y: this.Thanya_NC },
          { label: "Supakan", y: this.Supa_NC },
          { label: "Panudda", y: this.Panud_NC },
          { label: "Gunyarat", y: this.Gunya_NC },
          { label: "Soontree", y: this.Soon_NC },
        ]
      }, {
        type: "stackedColumn",
        name: "Other",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_other },
          { label: "Suticha", y: this.Suti_other },
          { label: "Parawee", y: this.Para_other },
          { label: "Thanyarat", y: this.Thanya_other },
          { label: "Supakan", y: this.Supa_other },
          { label: "Panudda", y: this.Panud_other },
          { label: "Gunyarat", y: this.Gunya_other },
          { label: "Soontree", y: this.Soon_other },
        ]
      }]
    }
  }

  Analyzer_fac() {
    this.chartOptions5 = {
      theme: "light2",
      title: {
        text: "Request in each factory"
      },
      animationEnabled: true,
      toolTip: {
        shared: true
      },
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
        reversed: true
      },
      axisY: {
        includeZero: true
      },
      data: [{
        type: "stackedColumn",
        name: "MT300",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[0] },
          { label: "Suticha", y: this.Suti[0] },
          { label: "Parawee", y: this.Para[0] },
          { label: "Thanyarat", y: this.Thanya[0] },
          { label: "Supakan", y: this.Supa[0] },
          { label: "Panudda", y: this.Panud[0] },
          { label: "Gunyarat", y: this.Gunya[0] },
          { label: "Soontree", y: this.Soon[0] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT400",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[1] },
          { label: "Suticha", y: this.Suti[1] },
          { label: "Parawee", y: this.Para[1] },
          { label: "Thanyarat", y: this.Thanya[1] },
          { label: "Supakan", y: this.Supa[1] },
          { label: "Panudda", y: this.Panud[1] },
          { label: "Gunyarat", y: this.Gunya[1] },
          { label: "Soontree", y: this.Soon[1] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT500",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[2] },
          { label: "Suticha", y: this.Suti[2] },
          { label: "Parawee", y: this.Para[2] },
          { label: "Thanyarat", y: this.Thanya[2] },
          { label: "Supakan", y: this.Supa[2] },
          { label: "Panudda", y: this.Panud[2] },
          { label: "Gunyarat", y: this.Gunya[2] },
          { label: "Soontree", y: this.Soon[2] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT600",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[3] },
          { label: "Suticha", y: this.Suti[3] },
          { label: "Parawee", y: this.Para[3] },
          { label: "Thanyarat", y: this.Thanya[3] },
          { label: "Supakan", y: this.Supa[3] },
          { label: "Panudda", y: this.Panud[3] },
          { label: "Gunyarat", y: this.Gunya[3] },
          { label: "Soontree", y: this.Soon[3] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT700",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[4] },
          { label: "Suticha", y: this.Suti[4] },
          { label: "Parawee", y: this.Para[4] },
          { label: "Thanyarat", y: this.Thanya[4] },
          { label: "Supakan", y: this.Supa[4] },
          { label: "Panudda", y: this.Panud[4] },
          { label: "Gunyarat", y: this.Gunya[4] },
          { label: "Soontree", y: this.Soon[4] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT800",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[5] },
          { label: "Suticha", y: this.Suti[5] },
          { label: "Parawee", y: this.Para[5] },
          { label: "Thanyarat", y: this.Thanya[5] },
          { label: "Supakan", y: this.Supa[5] },
          { label: "Panudda", y: this.Panud[5] },
          { label: "Gunyarat", y: this.Gunya[5] },
          { label: "Soontree", y: this.Soon[5] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT900",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[6] },
          { label: "Suticha", y: this.Suti[6] },
          { label: "Parawee", y: this.Para[6] },
          { label: "Thanyarat", y: this.Thanya[6] },
          { label: "Supakan", y: this.Supa[6] },
          { label: "Panudda", y: this.Panud[6] },
          { label: "Gunyarat", y: this.Gunya[6] },
          { label: "Soontree", y: this.Soon[6] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT6A0",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[7] },
          { label: "Suticha", y: this.Suti[7] },
          { label: "Parawee", y: this.Para[7] },
          { label: "Thanyarat", y: this.Thanya[7] },
          { label: "Supakan", y: this.Supa[7] },
          { label: "Panudda", y: this.Panud[7] },
          { label: "Gunyarat", y: this.Gunya[7] },
          { label: "Soontree", y: this.Soon[7] },
        ]
      }, {
        type: "stackedColumn",
        name: "MT9A0",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[8] },
          { label: "Suticha", y: this.Suti[8] },
          { label: "Parawee", y: this.Para[8] },
          { label: "Thanyarat", y: this.Thanya[8] },
          { label: "Supakan", y: this.Supa[8] },
          { label: "Panudda", y: this.Panud[8] },
          { label: "Gunyarat", y: this.Gunya[8] },
          { label: "Soontree", y: this.Soon[8] },
        ]
      }, {
        type: "stackedColumn",
        name: "SGA",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut[9] },
          { label: "Suticha", y: this.Suti[9] },
          { label: "Parawee", y: this.Para[9] },
          { label: "Thanyarat", y: this.Thanya[9] },
          { label: "Supakan", y: this.Supa[9] },
          { label: "Panudda", y: this.Panud[9] },
          { label: "Gunyarat", y: this.Gunya[9] },
          { label: "Soontree", y: this.Soon[9] },
        ]
      }]
    }
  }

  Cspoint() {
    this.chartOptions6 = {
      theme: "light2",
      title: {
        text: "CS in each analyzer"
      },
      animationEnabled: true,
      data: [{
        type: "column",
        dataPoints: [
          { label: "Wanutsanun", y: this.Aver8 },
          { label: "Suticha", y: this.Aver1 },
          { label: "Parawee", y: this.Aver2 },
          { label: "Thanyarat", y: this.Aver3 },
          { label: "Supakan", y: this.Aver4 },
          { label: "Panudda", y: this.Aver5 },
          { label: "Gunyarat", y: this.Aver6 },
          { label: "Soontree", y: this.Aver7 },
        ]
      }]
    }
  }

  Machine_ser() {
    this.chartOptions7 = {
      theme: "light2",
      title: {
        text: "Machine operation time (unit hrs)"
      },
      animationEnabled: true,
      axisY: {
        maximum: 120
      },
      data: [{
        type: "column",
        dataPoints: [
          { label: "X-ray", y: this.oper_time[21] },
          { label: "SEM", y: this.oper_time[0] },
          { label: "Cutting", y: this.oper_time[1] },
          { label: "Polishing", y: this.oper_time[2] },
          { label: "RESIN_MOLDING", y: this.oper_time[3] },
          { label: "Ion-milling", y: this.oper_time[4] },
          { label: "VHX", y: this.oper_time[5] },
          { label: "Metallurgical", y: this.oper_time[6] },
          { label: "EDXRF", y: this.oper_time[7] },
          { label: "ICP", y: this.oper_time[8] },
          { label: "C_SAM", y: this.oper_time[9] },
          { label: "CS", y: this.oper_time[10] },
          { label: "FTIR", y: this.oper_time[11] },
          { label: "GCMS", y: this.oper_time[12] },
          { label: "DSC", y: this.oper_time[13] },
          { label: "TG-DTA", y: this.oper_time[14] },
          { label: "Solderwet", y: this.oper_time[15] },
          { label: "Micro-probe", y: this.oper_time[16] },
          { label: "FE-SEM", y: this.oper_time[17] },
          { label: "HPLC", y: this.oper_time[18] },
          // { label: "CE", y: this.oper_time[19] },
          { label: "Other", y: this.oper_time[20] },
        ]
      }]
    }
  }


  download() {
    this.productService.downloadFile(this.jsonData, 'jsontocsv');
  }


}
