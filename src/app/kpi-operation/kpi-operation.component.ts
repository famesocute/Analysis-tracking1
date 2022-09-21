import { Component, OnInit } from '@angular/core';
import { auto } from '@popperjs/core';
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-kpi-operation',
  templateUrl: './kpi-operation.component.html',
  styleUrls: ['./kpi-operation.component.scss']
})
export class KPIOperationComponent implements OnInit {
  loading = true

  cs_point : any
  point : any
  Totalpoint1 = 0
  Totalpoint2 = 0
  Totalpoint3 = 0
  Totalpoint4 = 0
  Totalpoint5 = 0
  Totalpoint6 = 0
  Totalpoint7 = 0
  Totalpoint8 = 0

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

  ReEachFac_Com_300 = 0
  ReEachFac_defect_300 = 0
  ReEachFac_Mat_evaluate_300 = 0
  ReEachFac_Product_evaluate_300 = 0
  ReEachFac_Process_evaluate_300 = 0
  ReEachFac_RoSH_300 = 0
  ReEachFac_NC_300 = 0
  ReEachFac_other_300 = 0
  ReEachFac_Com_400 = 0
  ReEachFac_defect_400 = 0
  ReEachFac_Mat_evaluate_400 = 0
  ReEachFac_Product_evaluate_400 = 0
  ReEachFac_Process_evaluate_400 = 0
  ReEachFac_RoSH_400 = 0
  ReEachFac_NC_400 = 0
  ReEachFac_other_400 = 0
  ReEachFac_Com_500 = 0
  ReEachFac_defect_500 = 0
  ReEachFac_Mat_evaluate_500 = 0
  ReEachFac_Product_evaluate_500 = 0
  ReEachFac_Process_evaluate_500 = 0
  ReEachFac_RoSH_500 = 0
  ReEachFac_NC_500 = 0
  ReEachFac_other_500 = 0
  ReEachFac_Com_600 = 0
  ReEachFac_defect_600 = 0
  ReEachFac_Mat_evaluate_600 = 0
  ReEachFac_Product_evaluate_600 = 0
  ReEachFac_Process_evaluate_600 = 0
  ReEachFac_RoSH_600 = 0
  ReEachFac_NC_600 = 0
  ReEachFac_other_600 = 0
  ReEachFac_Com_700 = 0
  ReEachFac_defect_700 = 0
  ReEachFac_Mat_evaluate_700 = 0
  ReEachFac_Product_evaluate_700 = 0
  ReEachFac_Process_evaluate_700 = 0
  ReEachFac_RoSH_700 = 0
  ReEachFac_NC_700 = 0
  ReEachFac_other_700 = 0
  ReEachFac_Com_800 = 0
  ReEachFac_defect_800 = 0
  ReEachFac_Mat_evaluate_800 = 0
  ReEachFac_Product_evaluate_800 = 0
  ReEachFac_Process_evaluate_800 = 0
  ReEachFac_RoSH_800 = 0
  ReEachFac_NC_800 = 0
  ReEachFac_other_800 = 0
  ReEachFac_Com_900 = 0
  ReEachFac_defect_900 = 0
  ReEachFac_Mat_evaluate_900 = 0
  ReEachFac_Product_evaluate_900 = 0
  ReEachFac_Process_evaluate_900 = 0
  ReEachFac_RoSH_900 = 0
  ReEachFac_NC_900 = 0
  ReEachFac_other_900 = 0
  ReEachFac_Com_6A0 = 0
  ReEachFac_defect_6A0 = 0
  ReEachFac_Mat_evaluate_6A0 = 0
  ReEachFac_Product_evaluate_6A0 = 0
  ReEachFac_Process_evaluate_6A0 = 0
  ReEachFac_RoSH_6A0 = 0
  ReEachFac_NC_6A0 = 0
  ReEachFac_other_6A0 = 0
  ReEachFac_Com_9A0 = 0
  ReEachFac_defect_9A0 = 0
  ReEachFac_Mat_evaluate_9A0 = 0
  ReEachFac_Product_evaluate_9A0 = 0
  ReEachFac_Process_evaluate_9A0 = 0
  ReEachFac_RoSH_9A0 = 0
  ReEachFac_NC_9A0 = 0
  ReEachFac_other_9A0 = 0
  ReEachFac_Com_SGA = 0
  ReEachFac_defect_SGA = 0
  ReEachFac_Mat_evaluate_SGA = 0
  ReEachFac_Product_evaluate_SGA = 0
  ReEachFac_Process_evaluate_SGA = 0
  ReEachFac_RoSH_SGA = 0
  ReEachFac_NC_SGA = 0
  ReEachFac_other_SGA = 0

  Normal_300 = 0
  Normal_400 = 0
  Normal_500 = 0
  Normal_600 = 0
  Normal_700 = 0
  Normal_800 = 0
  Normal_900 = 0
  Normal_6A0 = 0
  Normal_9A0 = 0
  Normal_SGA = 0
  Urgent_300 = 0
  Urgent_400 = 0
  Urgent_500 = 0
  Urgent_600 = 0
  Urgent_700 = 0
  Urgent_800 = 0
  Urgent_900 = 0
  Urgent_6A0 = 0
  Urgent_9A0 = 0
  Urgent_SGA = 0

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

  Wanut_300 = 0
  Wanut_400 = 0
  Wanut_500 = 0
  Wanut_600 = 0
  Wanut_700 = 0
  Wanut_800 = 0
  Wanut_900 = 0
  Wanut_6A0 = 0
  Wanut_9A0 = 0
  Wanut_SGA = 0
  Suti_300 = 0
  Suti_400 = 0
  Suti_500 = 0
  Suti_600 = 0
  Suti_700 = 0
  Suti_800 = 0
  Suti_900 = 0
  Suti_6A0 = 0
  Suti_9A0 = 0
  Suti_SGA = 0
  Para_300 = 0
  Para_400 = 0
  Para_500 = 0
  Para_600 = 0
  Para_700 = 0
  Para_800 = 0
  Para_900 = 0
  Para_6A0 = 0
  Para_9A0 = 0
  Para_SGA = 0
  Thanya_300 = 0
  Thanya_400 = 0
  Thanya_500 = 0
  Thanya_600 = 0
  Thanya_700 = 0
  Thanya_800 = 0
  Thanya_900 = 0
  Thanya_6A0 = 0
  Thanya_9A0 = 0
  Thanya_SGA = 0
  Supa_300 = 0
  Supa_400 = 0
  Supa_500 = 0
  Supa_600 = 0
  Supa_700 = 0
  Supa_800 = 0
  Supa_900 = 0
  Supa_6A0 = 0
  Supa_9A0 = 0
  Supa_SGA = 0
  Panud_300 = 0
  Panud_400 = 0
  Panud_500 = 0
  Panud_600 = 0
  Panud_700 = 0
  Panud_800 = 0
  Panud_900 = 0
  Panud_6A0 = 0
  Panud_9A0 = 0
  Panud_SGA = 0
  Gunya_300 = 0
  Gunya_400 = 0
  Gunya_500 = 0
  Gunya_600 = 0
  Gunya_700 = 0
  Gunya_800 = 0
  Gunya_900 = 0
  Gunya_6A0 = 0
  Gunya_9A0 = 0
  Gunya_SGA = 0
  Soon_300 = 0
  Soon_400 = 0
  Soon_500 = 0
  Soon_600 = 0
  Soon_700 = 0
  Soon_800 = 0
  Soon_900 = 0
  Soon_6A0 = 0
  Soon_9A0 = 0
  Soon_SGA = 0


  chartOptions1: any
  chartOptions2: any
  chartOptions3: any
  chartOptions4: any
  chartOptions5:any
  chartOptions6:any
  chartOptions7:any
  chartOptions8:any

  Month2 = "7"
  Year2 = "2022"
  DataKPI_EQUIP : any

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

  Reset(){
    location.reload();
  }
  sumtime(timelast : any,time1 : any,time2 : any,time3 : any){

    time1 = time1 * 3600
    time2 = time2 * 60
    timelast = parseInt(timelast) + parseInt(time1) + parseInt(time2) + parseInt(time3)

    return(timelast)
  }

  oper_time:any = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  Search() {
    console.log();
    this.productService.TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR_BOOKING(this.Year, this.getMonthFromString(this.Month)).subscribe((data: {}) => {
      this.DataKPI_EQUIP = data
      console.log(this.DataKPI_EQUIP);
      var a
      var lasttime = 0
      var lasttime2 = 0
      for(a in this.DataKPI_EQUIP){
        console.log(this.DataKPI_EQUIP[a].EQUIPMENT)
        if (this.DataKPI_EQUIP[a].EQUIPMENT == "SEM"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[0] =this.oper_time[0]+ lasttime
            
            
          }
          lasttime = 0
          
        }
        else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Cutting"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[1] =this.oper_time[1]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Polishing"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[2] =this.oper_time[2]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "RESIN_MOLDING"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[3] =this.oper_time[3]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Ion-milling" || this.DataKPI_EQUIP[a].EQUIPMENT == "Cross-milling"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[4] =this.oper_time[4]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "VHX"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[5] =this.oper_time[5]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Metallurgical"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[6] =this.oper_time[6]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "EDXRF_RoHS" || this.DataKPI_EQUIP[a].EQUIPMENT == "EDXRF"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[7] =this.oper_time[7]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "ICP"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[8] =this.oper_time[8]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "C_SAM"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[9] =this.oper_time[9]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "CS Analyzer"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[10] =this.oper_time[10]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "FTIR"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[11] =this.oper_time[11]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "GCMS"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[12] =this.oper_time[12]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "DSC"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[13] =this.oper_time[13]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "TG-DTA"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[14] =this.oper_time[14]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Solderwet"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[15] =this.oper_time[15]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "Micro-probe"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[16] =this.oper_time[16]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "FE-SEM"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[17] =this.oper_time[17]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "HPLC"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[18] =this.oper_time[18]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "CE"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[19] =this.oper_time[19]+ lasttime
          }
          lasttime = 0
          
        }else if (this.DataKPI_EQUIP[a].EQUIPMENT == "X-ray2D" || this.DataKPI_EQUIP[a].EQUIPMENT == "X-ray3D" || this.DataKPI_EQUIP[a].EQUIPMENT == "X-ray reflow"){

          var timez = this.DataKPI_EQUIP[a].OPERATION_TIME.split(":")
          console.log(timez)
          if (timez != 0) {
            console.log(this.sumtime(lasttime,timez[0],timez[1],timez[2]))
            lasttime = this.sumtime(lasttime,timez[0],timez[1],timez[2])
            lasttime = lasttime/3600
            console.log(lasttime)
            this.oper_time[21] =this.oper_time[21]+ lasttime
          }
          lasttime = 0
          
        }
        
      }

      console.log(this.oper_time[0])
      console.log(this.oper_time)
      
    })

    this.productService.TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR(this.Year, this.Month).subscribe((data: {}) => {
      this.DataKPI = data
      console.log(this.DataKPI);

      this.productService.TRACKING_ANALYSIS_SELECT_BOOKING().subscribe((data: {}) => {
        this.DataResbookingreq = data
        console.log(this.DataResbookingreq);

        var i: any
        var x : any
        for (i in this.DataKPI) {
          // console.log(this.DataKPI[i].REQ_NUM)

          // Cs point
          if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
            
            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)
              
              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint8 = this.Totalpoint8 + point2
                console.log(this.Totalpoint8)

              this.count8 = parseInt(x) + 1 
              console.log(this.count8)
              }
              this.count8_total = this.count8_total + this.count8
              console.log(this.count8_total)
              this.Aver8 = this.Totalpoint8 / this.count8_total
              console.log(this.Aver8)
              }

          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
            console.log(this.DataKPI[i].CS_SCORE)

            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint1 = this.Totalpoint1 + point2
                console.log(this.Totalpoint1)

              this.count1 = parseInt(x) + 1 
              console.log(this.count1)
              }
              this.count1_total = this.count1_total + this.count1
              console.log(this.count1_total)
              this.Aver1 = this.Totalpoint1 / this.count1_total
              console.log(this.Aver1)
              }

          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
            
            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint2 = this.Totalpoint2 + point2
                console.log(this.Totalpoint2)

              this.count2 = parseInt(x) + 1 
              console.log(this.count2)
              }
              this.count2_total = this.count2_total + this.count2
              console.log(this.count2_total)
              this.Aver2 = this.Totalpoint2 / this.count2_total
              console.log(this.Aver2)
              }

        
          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
           
            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint3 = this.Totalpoint3 + point2
                console.log(this.Totalpoint3)

              this.count3 = parseInt(x) + 1 
              console.log(this.count3)
              }
              this.count3_total = this.count3_total + this.count3
              console.log(this.count3_total)
              this.Aver3 = this.Totalpoint3 / this.count3_total
              console.log(this.Aver3)
              }

          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
            
            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint4 = this.Totalpoint4 + point2
                console.log(this.Totalpoint4)

              this.count4 = parseInt(x) + 1 
              console.log(this.count4)
              // this.count4_total = this.count4_total + count4
              // console.log(this.count4_total)
              }
              this.count4_total = this.count4_total + this.count4
              console.log(this.count4_total)
              this.Aver4 = this.Totalpoint4 / this.count4_total
              console.log(this.Aver4)
              }

          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
            
            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint5 = this.Totalpoint5 + point2
                console.log(this.Totalpoint5)

              this.count5 = parseInt(x) + 1 
              console.log(this.count5)
              }
              this.count5_total = this.count5_total + this.count5
              console.log(this.count5_total)
              this.Aver5 = this.Totalpoint5 / this.count5_total
              console.log(this.Aver5)
              }

          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
           
           if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint6 = this.Totalpoint6 + point2
                console.log(this.Totalpoint6)

              this.count6 = parseInt(x) + 1 
              console.log(this.count6)
              }
              this.count6_total = this.count6_total + this.count6
              console.log(this.count6_total)
              this.Aver6 = this.Totalpoint6 / this.count6_total
              console.log(this.Aver6)
              }

          }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
            
            if(this.DataKPI[i].CS_SCORE != "" && this.DataKPI[i].CS_SCORE != null){
              this.cs_point = this.DataKPI[i].CS_SCORE.split("[]")
              console.log(this.cs_point)

              var x : any
              for (x in this.cs_point) {
                this.point = this.cs_point[x].split("|")
                console.log(this.point[0])

                var point2 = parseInt(this.point[0])

                this.Totalpoint7 = this.Totalpoint7 + point2
                console.log(this.Totalpoint7)

              this.count7 = parseInt(x) + 1 
              console.log(this.count7)
              }
              this.count7_total = this.count7_total + this.count7
              console.log(this.count7_total)
              this.Aver7 = this.Totalpoint7 / this.count7_total
              console.log(this.Aver7)
              }
          }

          // Request by job catagorize and Analyzer each catagorize
          if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') {
            this.JobCa_complaint = this.JobCa_complaint + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_COm = this.Wanut_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_COm = this.Suti_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_COm = this.Para_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_COm = this.Thanya_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_COm = this.Supa_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_COm = this.Panud_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_COm = this.Gunya_COm + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_COm = this.Soon_COm + 1
            }

          } else if (this.DataKPI[i].ANA_TYPE == 'Defective') {
            this.JobCa_defect = this.JobCa_defect + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_defect = this.Wanut_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_defect = this.Suti_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_defect = this.Para_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_defect = this.Thanya_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_defect = this.Supa_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_defect = this.Panud_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_defect = this.Gunya_defect + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_defect = this.Soon_defect + 1
            }
          } else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') {
            this.JobCa_NC = this.JobCa_NC + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_NC = this.Wanut_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_NC = this.Suti_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_NC = this.Para_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_NC = this.Thanya_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_NC = this.Supa_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_NC = this.Panud_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_NC = this.Gunya_NC + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_NC = this.Soon_NC + 1
            }

          }else if (this.DataKPI[i].ANA_TYPE == 'RoHS') {
            this.JobCa_RoSH = this.JobCa_RoSH + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_RoSH = this.Wanut_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_RoSH = this.Suti_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_RoSH = this.Para_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_RoSH = this.Thanya_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_RoSH = this.Supa_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_RoSH = this.Panud_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_RoSH = this.Gunya_RoSH + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_RoSH = this.Soon_RoSH + 1
            }

          } else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') {
            this.JobCa_evaluate_Process = this.JobCa_evaluate_Process + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_Process_evaluate = this.Wanut_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_Process_evaluate = this.Suti_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_Process_evaluate = this.Para_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_Process_evaluate = this.Thanya_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_Process_evaluate = this.Supa_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_Process_evaluate = this.Panud_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_Process_evaluate = this.Gunya_Process_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_Process_evaluate = this.Soon_Process_evaluate + 1
            }
          }else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') {
            this.JobCa_evaluate_Mat = this.JobCa_evaluate_Mat + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_Mat_evaluate = this.Wanut_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_Mat_evaluate = this.Suti_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_Mat_evaluate = this.Para_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_Mat_evaluate = this.Thanya_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_Mat_evaluate = this.Supa_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_Mat_evaluate = this.Panud_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_Mat_evaluate = this.Gunya_Mat_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_Mat_evaluate = this.Soon_Mat_evaluate + 1
            }

          }else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') {
            this.JobCa_evaluate_Product = this.JobCa_evaluate_Product + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_Product_evaluate = this.Wanut_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_Product_evaluate = this.Suti_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_Product_evaluate = this.Para_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_Product_evaluate = this.Thanya_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_Product_evaluate = this.Supa_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_Product_evaluate = this.Panud_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_Product_evaluate = this.Gunya_Product_evaluate + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_Product_evaluate = this.Soon_Product_evaluate + 1
            }

          } else {
            this.JobCa_other = this.JobCa_other + 1

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_other = this.Wanut_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_other = this.Suti_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_other = this.Para_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_other = this.Thanya_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_other = this.Supa_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_other = this.Panud_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_other = this.Gunya_other + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_other = this.Soon_other + 1
            }
          }

          this.TotalJobCatagorize = this.TotalJobCatagorize + 1

          // Request each factory and Piolity and Analyzer each factory
          if (this.DataKPI[i].DEP_MENT == 'MT300') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_300 = this.ReEachFac_Com_300 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_300 = this.ReEachFac_defect_300 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_300 = this.ReEachFac_NC_300 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_300 = this.ReEachFac_Process_evaluate_300 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_300 = this.ReEachFac_Mat_evaluate_300 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_300 = this.ReEachFac_Product_evaluate_300 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_300 = this.ReEachFac_RoSH_300 + 1 }
            else { this.ReEachFac_other_300 = this.ReEachFac_other_300 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_300 = this.Normal_300 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_300 = this.Urgent_300 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_300 = this.Wanut_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_300 = this.Suti_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_300 = this.Para_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_300 = this.Thanya_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_300 = this.Supa_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_300 = this.Panud_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_300 = this.Gunya_300 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_300 = this.Soon_300 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT400') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_400 = this.ReEachFac_Com_400 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_400 = this.ReEachFac_defect_400 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_400 = this.ReEachFac_NC_400 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_400 = this.ReEachFac_Process_evaluate_400 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_400 = this.ReEachFac_Mat_evaluate_400 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_400 = this.ReEachFac_Product_evaluate_400 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_400 = this.ReEachFac_RoSH_400 + 1 } 
            else { this.ReEachFac_other_400 = this.ReEachFac_other_400 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_400 = this.Normal_400 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_400 = this.Urgent_400 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_400 = this.Wanut_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_400 = this.Suti_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_400 = this.Para_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_400 = this.Thanya_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_400 = this.Supa_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_400 = this.Panud_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_400 = this.Gunya_400 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_400 = this.Soon_400 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT500') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_500 = this.ReEachFac_Com_500 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_500 = this.ReEachFac_defect_500 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_500 = this.ReEachFac_NC_500 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_500 = this.ReEachFac_Process_evaluate_500 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_500 = this.ReEachFac_Mat_evaluate_500 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_500 = this.ReEachFac_Product_evaluate_500 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_500 = this.ReEachFac_RoSH_500 + 1 }
            else { this.ReEachFac_other_500 = this.ReEachFac_other_500 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_500 = this.Normal_500 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_500 = this.Urgent_500 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_500 = this.Wanut_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_500 = this.Suti_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_500 = this.Para_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_500 = this.Thanya_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_500 = this.Supa_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_500 = this.Panud_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_500 = this.Gunya_500 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_500 = this.Soon_500 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT600') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_600 = this.ReEachFac_Com_600 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_600 = this.ReEachFac_defect_600 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_600 = this.ReEachFac_NC_600 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_600 = this.ReEachFac_Process_evaluate_600 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_600 = this.ReEachFac_Mat_evaluate_600 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_600 = this.ReEachFac_Product_evaluate_600 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_600 = this.ReEachFac_RoSH_600 + 1 }
            else { this.ReEachFac_other_600 = this.ReEachFac_other_600 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_600 = this.Normal_600 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_600 = this.Urgent_600 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_600 = this.Wanut_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_600 = this.Suti_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_600 = this.Para_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_600 = this.Thanya_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_600 = this.Supa_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_600 = this.Panud_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_600 = this.Gunya_600 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_600 = this.Soon_600 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT700') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_700 = this.ReEachFac_Com_700 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_700 = this.ReEachFac_defect_700 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_700 = this.ReEachFac_NC_700 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_700 = this.ReEachFac_Process_evaluate_700 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_700 = this.ReEachFac_Mat_evaluate_700 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_700 = this.ReEachFac_Product_evaluate_700 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_700 = this.ReEachFac_RoSH_700 + 1 }
            else { this.ReEachFac_other_700 = this.ReEachFac_other_700 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_700 = this.Normal_700 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_700 = this.Urgent_700 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_700 = this.Wanut_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_700 = this.Suti_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_700 = this.Para_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_700 = this.Thanya_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_700 = this.Supa_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_700 = this.Panud_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_700 = this.Gunya_700 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_700 = this.Soon_700 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT800') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_800 = this.ReEachFac_Com_800 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_800 = this.ReEachFac_defect_800 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_800 = this.ReEachFac_NC_800 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_800 = this.ReEachFac_Process_evaluate_800 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_800 = this.ReEachFac_Mat_evaluate_800 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_800 = this.ReEachFac_Product_evaluate_800 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_800 = this.ReEachFac_RoSH_800 + 1 }
            else { this.ReEachFac_other_800 = this.ReEachFac_other_800 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_800 = this.Normal_800 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_800 = this.Urgent_800 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_800 = this.Wanut_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_800 = this.Suti_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_800 = this.Para_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_800 = this.Thanya_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_800 = this.Supa_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_800 = this.Panud_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_800 = this.Gunya_800 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_800 = this.Soon_800 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT900') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_900 = this.ReEachFac_Com_900 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_900 = this.ReEachFac_defect_900 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_900 = this.ReEachFac_NC_900 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_900 = this.ReEachFac_Process_evaluate_900 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_900 = this.ReEachFac_Mat_evaluate_900 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_900 = this.ReEachFac_Product_evaluate_900 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_900 = this.ReEachFac_RoSH_900 + 1 }
            else { this.ReEachFac_other_900 = this.ReEachFac_other_900 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_900 = this.Normal_900 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_900 = this.Urgent_900 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_900 = this.Wanut_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_900 = this.Suti_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_900 = this.Para_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_900 = this.Thanya_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_900 = this.Supa_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_900 = this.Panud_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_900 = this.Gunya_900 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_900 = this.Soon_900 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT6A0') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_6A0 = this.ReEachFac_Com_6A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_6A0 = this.ReEachFac_defect_6A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_6A0 = this.ReEachFac_NC_6A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_6A0 = this.ReEachFac_Process_evaluate_6A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_6A0 = this.ReEachFac_Mat_evaluate_6A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_6A0 = this.ReEachFac_Product_evaluate_6A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_6A0 = this.ReEachFac_RoSH_6A0 + 1 }
            else { this.ReEachFac_other_6A0 = this.ReEachFac_other_6A0 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_6A0 = this.Normal_6A0 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_6A0 = this.Urgent_6A0 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_6A0 = this.Wanut_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_6A0 = this.Suti_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_6A0 = this.Para_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_6A0 = this.Thanya_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_6A0 = this.Supa_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_6A0 = this.Panud_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_6A0 = this.Gunya_6A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_6A0 = this.Soon_6A0 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MT9A0') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_9A0 = this.ReEachFac_Com_9A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_9A0 = this.ReEachFac_defect_9A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_9A0 = this.ReEachFac_NC_9A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_9A0 = this.ReEachFac_Process_evaluate_9A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_9A0 = this.ReEachFac_Mat_evaluate_9A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_9A0 = this.ReEachFac_Product_evaluate_9A0 + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_9A0 = this.ReEachFac_RoSH_9A0 + 1 }
            else { this.ReEachFac_other_9A0 = this.ReEachFac_other_9A0 + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_9A0 = this.Normal_9A0 + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_9A0 = this.Urgent_9A0 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_9A0 = this.Wanut_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_9A0 = this.Suti_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_9A0 = this.Para_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_9A0 = this.Thanya_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_9A0 = this.Supa_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_9A0 = this.Panud_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_9A0 = this.Gunya_9A0 + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_9A0 = this.Soon_9A0 + 1
            }

          } else if (this.DataKPI[i].DEP_MENT == 'MTA00' || this.DataKPI[i].DEP_MENT == 'MTB00' || this.DataKPI[i].DEP_MENT == 'MTE00' || this.DataKPI[i].DEP_MENT == 'MTF00' || this.DataKPI[i].DEP_MENT == 'MTM00' || this.DataKPI[i].DEP_MENT == 'MTQ00') {
            if (this.DataKPI[i].ANA_TYPE == 'Customer complaint') { this.ReEachFac_Com_SGA = this.ReEachFac_Com_SGA + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Defective') { this.ReEachFac_defect_SGA = this.ReEachFac_defect_SGA + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'NC/Reject') { this.ReEachFac_NC_SGA = this.ReEachFac_NC_SGA + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Process evaluation') { this.ReEachFac_Process_evaluate_SGA = this.ReEachFac_Process_evaluate_SGA + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Material evaluation') { this.ReEachFac_Mat_evaluate_SGA = this.ReEachFac_Mat_evaluate_SGA + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'Product evaluation') { this.ReEachFac_Product_evaluate_SGA = this.ReEachFac_Product_evaluate_SGA + 1 }
            else if (this.DataKPI[i].ANA_TYPE == 'RoHS') { this.ReEachFac_RoSH_SGA = this.ReEachFac_RoSH_SGA + 1 }
            else { this.ReEachFac_other_SGA = this.ReEachFac_other_SGA + 1 }

            if (this.DataKPI[i].PIORITY == 'Normal') { this.Normal_SGA = this.Normal_SGA + 1 }
            else if (this.DataKPI[i].PIORITY == 'Urgent') { this.Urgent_SGA = this.Urgent_300 + 1 }

            if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Wanutsanun Hintuang <wanutsanun.hin@murata.com>'){
              this.Wanut_SGA = this.Wanut_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Suticha Pringthai <suticha.pri@murata.com>'){
              this.Suti_SGA = this.Suti_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Parawee Tassaneekati <parawee.tas@murata.com>'){
              this.Para_SGA = this.Para_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Thanyarat Sukkay <thanyarat.suk@murata.com>'){
              this.Thanya_SGA = this.Thanya_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Supakan Sriwichai <supakan.sriwi@murata.com>'){
              this.Supa_SGA = this.Supa_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Panudda Majan <panudda.maj@murata.com>'){
              this.Panud_SGA = this.Panud_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Gunyarat Prabhong <gunyarat.pra@murata.com>'){
              this.Gunya_SGA = this.Gunya_SGA + 1
            }else if(this.DataKPI[i].REVI_ANASEC_ANAL == 'Soontree Chaiwut <soontree.cha@murata.com>'){
              this.Soon_SGA = this.Soon_SGA + 1
            }
          }

          // const result = this.DataResbookingreq.filter((a: { REQ_NUM: string; }) => a.REQ_NUM === this.DataKPI[i].REQ_NUM);
          // console.log(result)

        }
        this.JobCatagorize()
        this.RequestEachFactory()
        this.Piority()
        this.Analyzer_cata()
        this.Analyzer_fac()
        this.Cspoint()
        this.Machine_ser()
      })

    })
  }

 getMonthFromString(Month:any){

    var d = Date.parse(Month + "1, 2012");
    if(!isNaN(d)){
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
          { label: "MT300", y: this.ReEachFac_Com_300 },
          { label: "MT400", y: this.ReEachFac_Com_400 },
          { label: "MT500", y: this.ReEachFac_Com_500 },
          { label: "MT600", y: this.ReEachFac_Com_600 },
          { label: "MT700", y: this.ReEachFac_Com_700 },
          { label: "MT800", y: this.ReEachFac_Com_800 },
          { label: "MT900", y: this.ReEachFac_Com_900 },
          { label: "MT6A0", y: this.ReEachFac_Com_6A0 },
          { label: "MT9A0", y: this.ReEachFac_Com_9A0 },
          { label: "SGA", y: this.ReEachFac_Com_SGA },
        ]
      }, {
        type: "stackedColumn",
        name: "Defective",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_defect_300 },
          { label: "MT400", y: this.ReEachFac_defect_400 },
          { label: "MT500", y: this.ReEachFac_defect_500 },
          { label: "MT600", y: this.ReEachFac_defect_600 },
          { label: "MT700", y: this.ReEachFac_defect_700 },
          { label: "MT800", y: this.ReEachFac_defect_800 },
          { label: "MT900", y: this.ReEachFac_defect_900 },
          { label: "MT6A0", y: this.ReEachFac_defect_6A0 },
          { label: "MT9A0", y: this.ReEachFac_defect_9A0 },
          { label: "SGA", y: this.ReEachFac_defect_SGA },
        ]
      }, {
        type: "stackedColumn",
        name: "Material evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Mat_evaluate_300 },
          { label: "MT400", y: this.ReEachFac_Mat_evaluate_400 },
          { label: "MT500", y: this.ReEachFac_Mat_evaluate_500 },
          { label: "MT600", y: this.ReEachFac_Mat_evaluate_600 },
          { label: "MT700", y: this.ReEachFac_Mat_evaluate_700 },
          { label: "MT800", y: this.ReEachFac_Mat_evaluate_800 },
          { label: "MT900", y: this.ReEachFac_Mat_evaluate_900 },
          { label: "MT6A0", y: this.ReEachFac_Mat_evaluate_6A0 },
          { label: "MT9A0", y: this.ReEachFac_Mat_evaluate_9A0 },
          { label: "SGA", y: this.ReEachFac_Mat_evaluate_SGA },
        ]
      }, {
        type: "stackedColumn",
        name: "Process evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Process_evaluate_300 },
          { label: "MT400", y: this.ReEachFac_Process_evaluate_400 },
          { label: "MT500", y: this.ReEachFac_Process_evaluate_500 },
          { label: "MT600", y: this.ReEachFac_Process_evaluate_600 },
          { label: "MT700", y: this.ReEachFac_Process_evaluate_700 },
          { label: "MT800", y: this.ReEachFac_Process_evaluate_800 },
          { label: "MT900", y: this.ReEachFac_Process_evaluate_900 },
          { label: "MT6A0", y: this.ReEachFac_Process_evaluate_6A0 },
          { label: "MT9A0", y: this.ReEachFac_Process_evaluate_9A0 },
          { label: "SGA", y: this.ReEachFac_Process_evaluate_SGA },
        ]
      }, {
        type: "stackedColumn",
        name: "Product evaluate",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_Product_evaluate_300 },
          { label: "MT400", y: this.ReEachFac_Product_evaluate_400 },
          { label: "MT500", y: this.ReEachFac_Product_evaluate_500 },
          { label: "MT600", y: this.ReEachFac_Product_evaluate_600 },
          { label: "MT700", y: this.ReEachFac_Product_evaluate_700 },
          { label: "MT800", y: this.ReEachFac_Product_evaluate_800 },
          { label: "MT900", y: this.ReEachFac_Product_evaluate_900 },
          { label: "MT6A0", y: this.ReEachFac_Product_evaluate_6A0 },
          { label: "MT9A0", y: this.ReEachFac_Product_evaluate_9A0 },
          { label: "SGA", y: this.ReEachFac_Product_evaluate_SGA },
        ]
      },
      {
        type: "stackedColumn",
        name: "RoSH",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_RoSH_300 },
          { label: "MT400", y: this.ReEachFac_RoSH_400 },
          { label: "MT500", y: this.ReEachFac_RoSH_500 },
          { label: "MT600", y: this.ReEachFac_RoSH_600 },
          { label: "MT700", y: this.ReEachFac_RoSH_700 },
          { label: "MT800", y: this.ReEachFac_RoSH_800 },
          { label: "MT900", y: this.ReEachFac_RoSH_900 },
          { label: "MT6A0", y: this.ReEachFac_RoSH_6A0 },
          { label: "MT9A0", y: this.ReEachFac_RoSH_9A0 },
          { label: "SGA", y: this.ReEachFac_RoSH_SGA },
        ]
      },
      {
        type: "stackedColumn",
        name: "NC/Reject",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_NC_300 },
          { label: "MT400", y: this.ReEachFac_NC_400 },
          { label: "MT500", y: this.ReEachFac_NC_500 },
          { label: "MT600", y: this.ReEachFac_NC_600 },
          { label: "MT700", y: this.ReEachFac_NC_700 },
          { label: "MT800", y: this.ReEachFac_NC_800 },
          { label: "MT900", y: this.ReEachFac_NC_900 },
          { label: "MT6A0", y: this.ReEachFac_NC_6A0 },
          { label: "MT9A0", y: this.ReEachFac_NC_9A0 },
          { label: "SGA", y: this.ReEachFac_NC_SGA },
        ]
      },
      {
        type: "stackedColumn",
        name: "Other",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.ReEachFac_other_300 },
          { label: "MT400", y: this.ReEachFac_other_400 },
          { label: "MT500", y: this.ReEachFac_other_500 },
          { label: "MT600", y: this.ReEachFac_other_600 },
          { label: "MT700", y: this.ReEachFac_other_700 },
          { label: "MT800", y: this.ReEachFac_other_800 },
          { label: "MT900", y: this.ReEachFac_other_900 },
          { label: "MT6A0", y: this.ReEachFac_other_6A0 },
          { label: "MT9A0", y: this.ReEachFac_other_9A0 },
          { label: "SGA", y: this.ReEachFac_other_SGA },
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
          { label: "MT300", y: this.Normal_300 },
          { label: "MT400", y: this.Normal_400 },
          { label: "MT500", y: this.Normal_500 },
          { label: "MT600", y: this.Normal_600 },
          { label: "MT700", y: this.Normal_700 },
          { label: "MT800", y: this.Normal_800 },
          { label: "MT900", y: this.Normal_900 },
          { label: "MT6A0", y: this.Normal_6A0 },
          { label: "MT9A0", y: this.Normal_9A0 },
          { label: "SGA", y: this.Normal_SGA },
        ]
      }, {
        type: "stackedColumn",
        name: "Urgent",
        showInLegend: true,
        dataPoints: [
          { label: "MT300", y: this.Urgent_300 },
          { label: "MT400", y: this.Urgent_400 },
          { label: "MT500", y: this.Urgent_500 },
          { label: "MT600", y: this.Urgent_600 },
          { label: "MT700", y: this.Urgent_700 },
          { label: "MT800", y: this.Urgent_800 },
          { label: "MT900", y: this.Urgent_900 },
          { label: "MT6A0", y: this.Urgent_6A0 },
          { label: "MT9A0", y: this.Urgent_9A0 },
          { label: "SGA", y: this.Urgent_SGA },
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

  Analyzer_fac(){
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
          { label: "Wanutsanun", y: this.Wanut_300 },
          { label: "Suticha", y: this.Suti_300 },
          { label: "Parawee", y: this.Para_300 },
          { label: "Thanyarat", y: this.Thanya_300 },
          { label: "Supakan", y: this.Supa_300 },
          { label: "Panudda", y: this.Panud_300 },
          { label: "Gunyarat", y: this.Gunya_300 },
          { label: "Soontree", y: this.Soon_300 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT400",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_400 },
          { label: "Suticha", y: this.Suti_400 },
          { label: "Parawee", y: this.Para_400 },
          { label: "Thanyarat", y: this.Thanya_400 },
          { label: "Supakan", y: this.Supa_400 },
          { label: "Panudda", y: this.Panud_400 },
          { label: "Gunyarat", y: this.Gunya_400 },
          { label: "Soontree", y: this.Soon_400 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT500",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_500 },
          { label: "Suticha", y: this.Suti_500 },
          { label: "Parawee", y: this.Para_500 },
          { label: "Thanyarat", y: this.Thanya_500 },
          { label: "Supakan", y: this.Supa_500 },
          { label: "Panudda", y: this.Panud_500 },
          { label: "Gunyarat", y: this.Gunya_500 },
          { label: "Soontree", y: this.Soon_500 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT600",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_600 },
          { label: "Suticha", y: this.Suti_600 },
          { label: "Parawee", y: this.Para_600 },
          { label: "Thanyarat", y: this.Thanya_600 },
          { label: "Supakan", y: this.Supa_600 },
          { label: "Panudda", y: this.Panud_600 },
          { label: "Gunyarat", y: this.Gunya_600 },
          { label: "Soontree", y: this.Soon_600 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT700",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_700 },
          { label: "Suticha", y: this.Suti_700 },
          { label: "Parawee", y: this.Para_700 },
          { label: "Thanyarat", y: this.Thanya_700 },
          { label: "Supakan", y: this.Supa_700 },
          { label: "Panudda", y: this.Panud_700 },
          { label: "Gunyarat", y: this.Gunya_700 },
          { label: "Soontree", y: this.Soon_700 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT800",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_800 },
          { label: "Suticha", y: this.Suti_800 },
          { label: "Parawee", y: this.Para_800 },
          { label: "Thanyarat", y: this.Thanya_800 },
          { label: "Supakan", y: this.Supa_800 },
          { label: "Panudda", y: this.Panud_800 },
          { label: "Gunyarat", y: this.Gunya_800 },
          { label: "Soontree", y: this.Soon_800 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT900",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_900 },
          { label: "Suticha", y: this.Suti_900 },
          { label: "Parawee", y: this.Para_900 },
          { label: "Thanyarat", y: this.Thanya_900 },
          { label: "Supakan", y: this.Supa_900 },
          { label: "Panudda", y: this.Panud_900 },
          { label: "Gunyarat", y: this.Gunya_900 },
          { label: "Soontree", y: this.Soon_900 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT6A0",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_6A0 },
          { label: "Suticha", y: this.Suti_6A0 },
          { label: "Parawee", y: this.Para_6A0 },
          { label: "Thanyarat", y: this.Thanya_6A0 },
          { label: "Supakan", y: this.Supa_6A0 },
          { label: "Panudda", y: this.Panud_6A0 },
          { label: "Gunyarat", y: this.Gunya_6A0 },
          { label: "Soontree", y: this.Soon_6A0 },
        ]
      }, {
        type: "stackedColumn",
        name: "MT9A0",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_9A0 },
          { label: "Suticha", y: this.Suti_9A0 },
          { label: "Parawee", y: this.Para_9A0 },
          { label: "Thanyarat", y: this.Thanya_9A0 },
          { label: "Supakan", y: this.Supa_9A0 },
          { label: "Panudda", y: this.Panud_9A0 },
          { label: "Gunyarat", y: this.Gunya_9A0 },
          { label: "Soontree", y: this.Soon_9A0 },
        ]
      }, {
        type: "stackedColumn",
        name: "SGA",
        showInLegend: true,
        dataPoints: [
          { label: "Wanutsanun", y: this.Wanut_SGA },
          { label: "Suticha", y: this.Suti_SGA },
          { label: "Parawee", y: this.Para_SGA },
          { label: "Thanyarat", y: this.Thanya_SGA },
          { label: "Supakan", y: this.Supa_SGA },
          { label: "Panudda", y: this.Panud_SGA },
          { label: "Gunyarat", y: this.Gunya_SGA },
          { label: "Soontree", y: this.Soon_SGA },
        ]
      }]
    }
  }

  Cspoint(){
    this.chartOptions6 = {
      theme: "light2",
      title:{
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

  Machine_ser(){
    this.chartOptions7 = {
      theme: "light2",
      title:{
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

}
