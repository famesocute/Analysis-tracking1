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
}
