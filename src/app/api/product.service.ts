import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private messageSource = new BehaviorSubject('messagenull');

  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient){}
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }
  changeMessage(message: string) {

    this.messageSource.next(message)

  }
  TRACKING_ANALYSIS_QUERY_DATA(product: any) {

    return this.http.post('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/01_TRACKING_ANALYSIS_INSERT_DATA.php', product, {

      headers: { 'content-type': 'application/x-www-form-urlencoded' }

    })

  }

  TRACKING_ANALYSIS_SELECT_DATA() {

    return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/02_TRACKING_ANALYSIS_SELECT_DATA.php')
  }
    Message(message: string) {

    this.messageSource.next(message)

  }
  TRACKING_ANALYSIS_SELECT_ALL() {

    return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/05_TRACKING_ANALYSIS_SELECT_ALL.php')
  }

    //Test TRACKING_ANALYSIS_SELECT_GET_LAST_MONTH

    TRACKING_ANALYSIS_SELECT_GET_LAST_MONTH() {

      console.log("TRACKING_ANALYSIS_SELECT_GET_LAST_MONTH Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/03_TRACKING_ANALYSIS_SELECT_GET_LAST_MONTH.php')
  
    }
  
    TRACKING_ANALYSIS_SELECT_SUBSTRING_REQ_NUM() {
  
      console.log("TRACKING_ANALYSIS_SELECT_SUBSTRING_REQ_NUM Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/04_TRACKING_ANALYSIS_SELECT_SUBSTRING_REQ_NUM.php')
  
    }
    TRACKING_ANALYSIS_SELECT_ALL_ORDER() {
  
      console.log("TRACKING_ANALYSIS_SELECT_ALL_ORDER Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/06_TRACKING_ANALYSIS_SELECT_ALL_ORDER.php')
  
    }
    TRACKING_ANALYSIS_SELECT_DATA_BY_ID(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_DATA_BY_ID Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/07_TRACKING_ANALYSIS_SELECT_DATA_BY_ID.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_READ_EXCEL() {
  
      console.log("TRACKING_ANALYSIS_READ_EXCEL Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/08_TRACKING_ANALYSIS_READ_EXCEL.php')
  
    }
    TRACKING_ANALYSIS_CHKPASS_LOGIN(data1:any,data2:any) {
  
      console.log("TRACKING_ANALYSIS_CHKPASS_LOGIN Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/09_TRACKING_ANALYSIS_CHKPASS_LOGIN.php?data1='+data1+'&data2='+data2)
  
    }    
    TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/10_TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON.php?data1='+data1)
    }
    TRACKING_ANALYSIS_SELECT_QUESTION_BY_ID(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_QUESTION_BY_ID Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/11_TRACKING_ANALYSIS_SELECT_QUESTION_BY_ID.php?data1='+data1)
    }
    TRACKING_ANALYSIS_SELECT_BOOKING() {
  
      console.log("TRACKING_ANALYSIS_SELECT_BOOKING Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/12_TRACKING_ANALYSIS_SELECT_BOOKING.php')
    }
    TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/13_TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ.php?data1='+data1)
    }
    TRACKING_ANALYSIS_SELECT_BOOKING_ID(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_BOOKING_ID Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/14_TRACKING_ANALYSIS_SELECT_BOOKING_ID.php?data1='+data1)
    }

    TRACKING_ANALYSIS_SELECT_BOOKING_STEP(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_BOOKING_STEP Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/16_TRACKING_ANALYSIS_SELECT_BOOKING_STEP.php?data1='+data1)
    }
    TRACKING_ANALYSIS_SELECT_ALLOCATION_ALL() {
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/17_TRACKING_ANALYSIS_SELECT_ALLOCATION_ALL.php')
    }
    TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/19_TRACKING_ANALYSIS_SELECT_ADDFILE_BY_REQ.php?data1='+data1)
    }
    TRACKING_ANALYSIS_SELECT_TIMEISSUE_REPORT_BYREQ(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_TIMEISSUE_REPORT_BYREQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/20_TRACKING_ANALYSIS_SELECT_TIMEISSUE_REPORT_BYREQ.php?data1='+data1)
    }
    TRACKING_ANALYSIS_SELECT_UPLOAD_LIST_BY_REQ(data1: any) {

      console.log("TRACKING_ANALYSIS_SELECT_UPLOAD_LIST_BY_REQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/21_TRACKING_ANALYSIS_SELECT_UPLOAD_LIST_BY_REQ.php?data1=' + data1)
  
    }
  
    TRACKING_ANALYSIS_SEND_MAIL(product: any) {
  
      console.log("TRACKING_ANALYSIS_SEND_MAIL Loop ")
  
      return this.http.post('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/22_TRACKING_ANALYSIS_SEND_MAIL.php', product, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    }

    TRACKING_ANALYSIS_SELECT_DATA_BY_REQ(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_DATA_BY_REQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/23_TRACKING_ANALYSIS_SELECT_DATA_BY_REQ.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_SELECT_EQUIP_JOBDUTY(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_EQUIP_JOBDUTY Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/24_TRACKING_ANALYSIS_SELECT_EQUIP_JOBDUTY.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_SELECT_JOB_JOBDUTY(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_JOB_JOBDUTY Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/25_TRACKING_ANALYSIS_SELECT_JOB_JOBDUTY.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON_NEW(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON_NEW Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/27_TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON_NEW.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_DELETE_FILE(data1:any) {
  
      console.log("TRACKING_ANALYSIS_DELETE_FILE Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/26_TRACKING_ANALYSIS_DELETE_FILE.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_SELECT_BOOKING_STEP_REQ(data1:any,data2:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_BOOKING_STEP_REQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/28_TRACKING_ANALYSIS_SELECT_BOOKING_STEP_REQ.php?data1='+data1+'&data2='+data2)
  
    }  
    TRACKING_ANALYSIS_SELECT_ALL_ORDER_2() {
  
      console.log("TRACKING_ANALYSIS_SELECT_ALL_ORDER_2 Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/29_TRACKING_ANALYSIS_SELECT_ALL_ORDER_2.php')
  
    } 
    TRACKING_ANALYSIS_SELECT_ALL_ORDER_1() {
  
      console.log("TRACKING_ANALYSIS_SELECT_ALL_ORDER_1 Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/30_TRACKING_ANALYSIS_SELECT_ALL_ORDER_1.php')
  
    }
    TRACKING_ANALYSIS_SELECT_ALL_ORDER_3() {
  
      console.log("TRACKING_ANALYSIS_SELECT_ALL_ORDER_3 Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/31_TRACKING_ANALYSIS_SELECT_ALL_ORDER_3.php')
  
    }
    TRACKING_ANALYSIS_SELECT_SEARCH_BY_REQ(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_SEARCH_BY_REQ Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/32_TRACKING_ANALYSIS_SELECT_SEARCH_BY_REQ.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_SELECT_ALL_MYJOB(data1:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_ALL_MYJOB Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/33_TRACKING_ANALYSIS_SELECT_ALL_MYJOB.php?data1='+data1)
  
    }
    TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR(data1:any,data2:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/35_TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR.php?data1='+data1+'&data2='+data2)
  
    }
    TRACKING_ANALYSIS_SELECT_URGENT_BOOK() {
  
      console.log("TRACKING_ANALYSIS_SELECT_URGENT_BOOK Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/34_TRACKING_ANALYSIS_SELECT_URGENT_BOOK.php')
  
    }   
    TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR_BOOKING(data1:any,data2:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR_BOOKING Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/36_TRACKING_ANALYSIS_SELECT_KPI_MONTH_YEAR_BOOKING.php?data1='+data1+'&data2='+data2)
  
    } 
    TRACKING_ANALYSIS_SELECT_KPI_OUTPUT_JOB(data1:any,data2:any) {
  
      console.log("TRACKING_ANALYSIS_SELECT_KPI_OUTPUT_JOB Loop ")
  
      return this.http.get('http://163.50.57.95/php_app/Q10_API/Tracking_Analysis/38_TRACKING_ANALYSIS_SELECT_KPI_OUTPUT_JOB.php?data1='+data1+'&data2='+data2)
  
    } 

    //----------------------------------------------------------------------------------
    downloadFile(data : any, filename='data') {
      let csvData = this.ConvertToCSV(data, ['PS_ratio','CS_score', '_1Day', '_2to3Days', 'More_3Day','Total_request', 'Normal', 'Urgent', 'Receive_job_per_day','Output_job_per_day', 'Customer_complaint', 'NC', 'Defective','Material_eva', 'Process_eva', 'Product_eva', 'RoHS_Special','Other', 'Total_300', 'Total_400', 'Total_500','Total_600', 'Total_700', 'Total_800', 'Total_900','Total_6A0', 'Total_9A0', 'Total_SGA', 'Normal_300','Normal_400', 'Normal_500', 'Normal_600', 'Normal_700','Normal_800', 'Normal_900', 'Normal_6A0', 'Normal_9A0','Normal_SGA', 'Urgent_300', 'Urgent_400', 'Urgent_500','Urgent_600', 'Urgent_700', 'Urgent_800', 'Urgent_900', 'Urgent_6A0', 'Urgent_9A0', 'Urgent_SGA']);
      console.log(csvData)
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
  }
ConvertToCSV(objArray: any, headerList: any) {
       let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
       let str = '';
       let row = 'S.No,';
for (let index in headerList) {
           row += headerList[index] + ',';
       }
       row = row.slice(0, -1);
       str += row + '\r\n';
       for (let i = 0; i < array.length; i++) {
           let line = (i+1)+'';
           for (let index in headerList) {
              let head = headerList[index];
line += ',' + array[i][head];
           }
           str += line + '\r\n';
       }
       return str;
   }
      //----------------------------------------------------------------------------------
}
