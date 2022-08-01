import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.component.html',
  styleUrls: ['./editinfo.component.scss']
})
export class EditinfoComponent implements OnInit {
  Title = ""
  Background = ""
  Purpose = ""
  Hypothesis = ""
  Analysistype = ""
  Analysistype2 = ""
  IssueDate = ""
  Requester = ""
  Phone = ""
  Department = ""
  Product = ""
  RequestTech = ""
  RequestTech2 = ""
  Numsample = 0
  Sendsampledate = ""
  EepectedDate = ""
  Piority = ""
  Reason = ""
  Lotno = ""
  Samplename = ""
  Remarks = ""
  AnaComment = ""
  Dangerous = ""
  SamAftertest = ""
  Relatedmatters = ""
  KeywordCharact = ""
  KeywordState = ""
  KeywordPheno = ""
  holiday = ""

  DataRes : any
  message = ""

  sample1 : any
  sample2 : any

  loading = true
  checklotno = true

  activate: boolean = false

  Tech =

  [{ data: 'X-ray 2D', check: false },
  { data: 'X-ray 3D', check: false },
  { data: 'SEM-Microscope', check: false },
  { data: 'Cross section', check: false },
  { data: 'Ion-milling', check: false },
  { data: 'VHX', check: false },
  { data: 'Metallurgical Microscope', check: false },
  { data: 'SEM-EDX', check: false },
  { data: 'SEM-Mapping', check: false },
  { data: 'EDXRF', check: false },
  { data: 'CS Analyzer', check: false },
  { data: 'ICP', check: false },
  { data: 'FTIR', check: false },
  { data: 'GCMS', check: false },
  { data: 'DSC', check: false },
  { data: 'TG-DTA', check: false },
  { data: 'Solder wettability', check: false },
  { data: 'Micro-probe', check: false },
  { data: 'Dust monitering', check: false },
  ];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      if(this.DataRes[0].TITLE != null){
        this.Title = this.DataRes[0].TITLE
      }
      if(this.DataRes[0].BACKGRUD != null){
        this.Background = this.DataRes[0].BACKGRUD
      }
      if(this.DataRes[0].PURPOSE != null){
        this.Purpose = this.DataRes[0].PURPOSE
      }
      if(this.DataRes[0].HYPO != null){
        this.Hypothesis = this.DataRes[0].HYPO
      }
      if(this.DataRes[0].PHONE != null){
        this.Phone = this.DataRes[0].PHONE
      }
      if(this.DataRes[0].PRODUCT != null){
        this.Product = this.DataRes[0].PRODUCT
      }
      if(this.DataRes[0].NUM_SAMPLE != null){
        this.Numsample = this.DataRes[0].NUM_SAMPLE
      }
      if(this.DataRes[0].SEND_SAM_DATE != null){
        this.Sendsampledate = this.DataRes[0].SEND_SAM_DATE
      }
      if(this.DataRes[0].FINISH_DATE != null){
        this.EepectedDate = this.DataRes[0].FINISH_DATE
      }
      if(this.DataRes[0].PIORITY != null){
        this.Piority = this.DataRes[0].PIORITY
      }
      if(this.DataRes[0].REASON != null){
        this.Reason = this.DataRes[0].REASON
      }
      if(this.DataRes[0].COMM_SAM_INFOR != null){
        this.AnaComment = this.DataRes[0].COMM_SAM_INFOR
      }
      if(this.DataRes[0].KEY_CHARA != null){
        this.KeywordCharact = this.DataRes[0].KEY_CHARA
      }
      if(this.DataRes[0].KEY_STATE != null){
        this.KeywordState = this.DataRes[0].KEY_STATE
      }
      if(this.DataRes[0].KEY_PHENO != null){
        this.KeywordPheno = this.DataRes[0].KEY_PHENO
      }
      if(this.DataRes[0].ANA_TYPE != null){
        this.Analysistype = this.DataRes[0].ANA_TYPE
      }
      if(this.DataRes[0].DANGER != null){
        this.Dangerous = this.DataRes[0].DANGER
      }
      if(this.DataRes[0].REQ_ANA_TECHNI != null){
        this.RequestTech = this.DataRes[0].REQ_ANA_TECHNI
      }
      if(this.DataRes[0].DANGER != null){
        this.Dangerous = this.DataRes[0].DANGER
      }
      if(this.DataRes[0].SAM_AF_TEST != null){
        this.SamAftertest = this.DataRes[0].SAM_AF_TEST
      }
      if(this.DataRes[0].HOLIDAY != null){
        this.holiday = this.DataRes[0].HOLIDAY
      }
     
      
      this.sample1 = this.DataRes[0].SAM_NAME.split("[]")
    console.log(this.sample1)

    var x
    var a
    this.sample2 = "["

    for(x in this.sample1)
    {
      a = this.sample1[x].split("||")
      this.sample2 = this.sample2 + '{"lotno":"' + a[0] + '",'
      this.sample2 = this.sample2 + '"name":"' + a[1] + '",'
      this.sample2 = this.sample2 + '"remake":"' + a[2] + '"},'

    }
    this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
    this.sample2 =  this.sample2 + "]";
    console.log( this.sample2)
    var obj = JSON.parse( this.sample2);
      this.sample1 = obj
      console.log( this.sample1)
      
      this.loading = false
    })
  }
  getdata(value: any) {
    this.Analysistype = value
  }
  AnsMany() {
    this.RequestTech = ""
    var i
    var count = 0

    for (i in this.Tech) {
      count = count + 1
      if (this.Tech[i].check == true) {
        this.RequestTech = this.RequestTech + this.Tech[i].data + ","
      }
    }
  }
  getdatadan(value: any) {
    this.Dangerous = value
  }
  getdataSamAf(value: any) {
    this.SamAftertest = value
  }

  Remove(id:any){
    var x
    var a
    this.sample2 = "["
  
    for(x in this.sample1)
    {
      if(id == x){
  
      }
      else{
        this.sample2 = this.sample2 + '{"lotno":"' + this.sample1[x].lotno + '",'
        this.sample2 = this.sample2 + '"name":"' + this.sample1[x].name + '",'
        this.sample2 = this.sample2 + '"remake":"' + this.sample1[x].remake + '"},'
      }
     
    }
    this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
    this.sample2 =  this.sample2 + "]";
    console.log( this.sample2)
    var obj = JSON.parse( this.sample2);
      this.sample1 = obj
      console.log( this.sample2)
  }

  Add(){
    var x
    var a
    this.sample2 = "["
  
    for(x in this.sample1)
    {
      this.sample2 = this.sample2 + '{"lotno":"' + this.sample1[x].lotno + '",'
      this.sample2 = this.sample2 + '"name":"' + this.sample1[x].name + '",'
      this.sample2 = this.sample2 + '"remake":"' + this.sample1[x].remake + '"},'
    }
    this.sample2 = this.sample2 + '{"lotno":"",'
    this.sample2 = this.sample2 + '"name":"",'
    this.sample2 = this.sample2 + '"remake":""},'
  
    this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
    this.sample2 =  this.sample2 + "]";
    console.log( this.sample2)
    var obj = JSON.parse( this.sample2);
      this.sample1 = obj
      console.log( this.sample2)
  }

  Approve(){

    this.Sendsampledate = this.Sendsampledate.toLocaleString()
    console.log(this.Sendsampledate.length)
    this.EepectedDate = this.EepectedDate.toLocaleString()
    console.log(this.EepectedDate.length)

   if(this.Sendsampledate.length > 11){
    var Sendsampledate3 = this.Sendsampledate.split(",")
    this.Sendsampledate = Sendsampledate3[0]
  
    if(this.EepectedDate.length > 11){
      var EepectedDate3 = this.EepectedDate.split(",")
      this.EepectedDate = EepectedDate3[0]

      this.sendapprove()
     }else{
      this.sendapprove()
     }
   }else if(this.EepectedDate.length > 11){
    var EepectedDate3 = this.EepectedDate.split(",")
    this.EepectedDate = EepectedDate3[0]

    this.sendapprove()
   }else{
    this.sendapprove()
   }
   
  }
  sendapprove(){
    if(this.Piority == 'Urgent' && this.Reason == '' ){
      window.alert("Please fill reason of urgent piority")
  
        console.log('1')
 
    }else if(this.Piority == 'Normal'){
      this.sentinfo()
      console.log('2')
    }else{
      this.sentinfo()
    }
  }

  sentinfo(){
    var val2 = ""
    for (var val in this.sample1) {

      if(this.sample1[val].lotno == ''){
        window.alert("Please fill lot number every sample")
        this.checklotno = false
        break;
      }else{
        this.checklotno = true
      }

      console.log(val); // prints values: 10, 20, 30, 40
      val2 = val2 + this.sample1[val].lotno + "||" + this.sample1[val].name + "||" + this.sample1[val].remake +"[]"
    }
    val2 = val2.substring(0, val2.length - 2);
    console.log(val2)

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET `TITLE` = '" + this.Title + "', `BACKGRUD` = '" + this.Background + "', " +
      " `PURPOSE` = '" + this.Purpose + "', `HYPO` = '" + this.Hypothesis + "',"+
      " `ANA_TYPE` = '" + this.Analysistype + "', `PHONE` = '" + this.Phone + "',"+
      " `PRODUCT` = '" + this.Product + "', `REQ_ANA_TECHNI` = '" + this.RequestTech + "', " +
      " `NUM_SAMPLE` = '" + this.Numsample + "', `SEND_SAM_DATE` = '" + this.Sendsampledate + "',"+
      " `FINISH_DATE` = '" + this.EepectedDate + "', `HOLIDAY` = '" + this.holiday + "',"+
      " `PIORITY` = '" + this.Piority + "', `REASON` = '" + this.Reason + "',"+
      " `SAM_NAME` = '" + val2 + "', `COMM_SAM_INFOR` = '" + this.AnaComment + "',"+
      " `DANGER` = '" + this.Dangerous + "', `SAM_AF_TEST` = '" + this.SamAftertest + "', `KEY_CHARA` = '" + this.KeywordCharact + "', " +
      " `KEY_STATE` = '" + this.KeywordState + "', `KEY_PHENO` = '" + this.KeywordPheno + "' " +
      " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
    console.log(qtest);
    if(this.checklotno == true){
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
      location.reload();
    })
  }
  }
}
