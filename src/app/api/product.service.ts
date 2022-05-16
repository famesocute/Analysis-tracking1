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
}
