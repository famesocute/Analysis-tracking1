import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";
import { ProductService } from '../api/product.service';

@Injectable()
export class DataService2 {
  
  events: any[] = [
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






















    
  ];

  constructor(private http : HttpClient,public productService: ProductService){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {



    console.log(this.events)


    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

}
