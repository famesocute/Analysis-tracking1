import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  

@Component({
  selector: 'app-estistep-edit',
  templateUrl: './estistep-edit.component.html',
  styleUrls: ['./estistep-edit.component.scss']
})
export class EstistepEditComponent implements OnInit {
  DataRes : any
  userType : any
  message =""

  sample1 : any
  sample2 : any

  ID : any
  isvalideditstep : any

  productForm: FormGroup;

  constructor(public productService: ProductService,private route: ActivatedRoute,private fb: FormBuilder ) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
   }

  ngOnInit(): void { 
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.message).subscribe((data: {}) => {
    console.log(data);
    this.DataRes = data

    this.sample1 = this.DataRes[0].PRE_ESTI_TECHNIQUE.split("[]")
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
      this.sample1 = obj
      console.log( this.sample1)
  })
  }
Add(){
  var x
  var a
  this.sample2 = "["

  for(x in this.sample1)
  {
    this.sample2 = this.sample2 + '{"equip":"' + this.sample1[x].equip + '",'
    this.sample2 = this.sample2 + '"Sample_no":"' + this.sample1[x].Sample_no + '"},'
  }
  this.sample2 = this.sample2 + '{"equip":"",'
  this.sample2 = this.sample2 + '"Sample_no":""},'

  this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
  this.sample2 =  this.sample2 + "]";
  console.log( this.sample2)
  var obj = JSON.parse( this.sample2);
    this.sample1 = obj
    console.log( this.sample2)
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
      this.sample2 = this.sample2 + '{"equip":"' + this.sample1[x].equip + '",'
      this.sample2 = this.sample2 + '"Sample_no":"' + this.sample1[x].Sample_no + '"},'
    }
   
  }
  this.sample2 =  this.sample2.substring(0,  this.sample2.length - 1);
  this.sample2 =  this.sample2 + "]";
  console.log( this.sample2)
  var obj = JSON.parse( this.sample2);
    this.sample1 = obj
    console.log( this.sample2)
}
  edit(){
    var val2 = ""
    for (var val in this.sample1) {
      console.log(val); // prints values: 10, 20, 30, 40
      val2 = val2 + this.sample1[val].equip + "||" + this.sample1[val].Sample_no + "||" + "initial" +"[]"
    }
    val2 = val2.substring(0, val2.length - 2);
    console.log(val2)

    var qtest = ""
    qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
      " SET  `STATUS_JOB` = '4', `PRE_ESTI_TECHNIQUE` = '"+ val2 +"', `STETUS_PERSON` = '"+ this.DataRes[0].REVI_PAND_CONFIRM +"' " +
      " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
  })

  var qtest2 = " "+this.DataRes[0].REVI_PAND_CONFIRM+";||||Q-Analysis Request ->(Estimate Cost Status)Request NO."+this.DataRes[0].REQ_NUM+":"+this.DataRes[0].TITLE+"||The step edited already.Click the attached link to view contents http://163.50.57.95:82/Tracking_Analysis/Esticost?id="+this.DataRes[0].ID+" "
    console.log(qtest2);
    this.productService.TRACKING_ANALYSIS_SEND_MAIL(qtest2).subscribe((data: {}) => {
      console.log(data); 
    })
  }

}
