import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-sendmail-question',
  templateUrl: './sendmail-question.component.html',
  styleUrls: ['./sendmail-question.component.scss']
})
export class SendmailQuestionComponent implements OnInit {
  message : any
  Questiondata : any
  DataRes : any

  sendto = ""
  CC = ""
  title = ""
  ID =""

  loading = true

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)
    this.loading = false

    var a
    a= this.message.split("||")
    this.sendto = a[0]
    this.CC = a[1]
    this.title = a[2]
    this.ID = a[3]
    

    // this.geterQution+'||'+this.EMAIL_CC+'||'+this.DataRes[0].TITLE+'||'+this.DataRes[0].ID
    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.ID).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      this.productService.TRACKING_ANALYSIS_SELECT_QUESTION_BY_DOCON_NEW( this.DataRes[0].REQ_NUM).subscribe((data: {}) => {
        console.log(data);
        this.Questiondata = data
      
      })
    })
  }

  sendmail(){
    var qtest2 = " "+this.sendto+";||"+this.CC+"||Q-Analysis Request ->(Question Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||Please answer the question.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/AnswerEdit?id="+this.Questiondata[0].ID+"&usertype="+this.ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })

  }
}
