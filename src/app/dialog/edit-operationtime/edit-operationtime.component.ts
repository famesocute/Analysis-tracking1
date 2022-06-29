import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-edit-operationtime',
  templateUrl: './edit-operationtime.component.html',
  styleUrls: ['./edit-operationtime.component.scss']
})
export class EditOperationtimeComponent implements OnInit {
  DataResreq : any
  
  message =""
  time = ""

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataResreq = data

      this.time = this.DataResreq[0].OPERATION_TIME
    })
  }
  Edittime(){
    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`booking_equipment` " +
      " SET  `OPERATION_TIME` = '"+ this.time +"' " +
      " WHERE (`ID_BOOKING` = '"+this.message+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload()
    })
  }
}
