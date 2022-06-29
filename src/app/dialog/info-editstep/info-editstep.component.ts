import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  

@Component({
  selector: 'app-info-editstep',
  templateUrl: './info-editstep.component.html',
  styleUrls: ['./info-editstep.component.scss']
})
export class InfoEditstepComponent implements OnInit {
  DataRes : any
  userType : any
  message =""

  status_step = ""

  sample1 : any
  sample2 : any

  ID : any
  isvalideditstep : any

  productForm: FormGroup;

  constructor(public productService: ProductService,private route: ActivatedRoute,private fb: FormBuilder) { 
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
    console.log(this.DataRes[0].ESTI_TECHNIQUE)

    this.sample1 = this.DataRes[0].ESTI_TECHNIQUE.split("[]")
    console.log(this.sample1)

    var x
    var a
    this.sample2 = "["

    for(x in this.sample1)
    {
      a = this.sample1[x].split("||")
      this.sample2 = this.sample2 + '{"equip":"' + a[0] + '",'
      this.sample2 = this.sample2 + '"Sample_no":"' + a[1] + '",'
      this.sample2 = this.sample2 + '"status_step":"' + a[2] + '"},'

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
      this.sample2 = this.sample2 + '"Sample_no":"' + this.sample1[x].Sample_no + '",'
      this.sample2 = this.sample2 + '"status_step":"' + this.sample1[x].status_step + '"},'
    }
    this.sample2 = this.sample2 + '{"equip":"",'
    this.sample2 = this.sample2 + '"Sample_no":"",'
    this.sample2 = this.sample2 + '"status_step":""},'
  
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
        this.sample2 = this.sample2 + '"Sample_no":"' + this.sample1[x].Sample_no + '",'
        this.sample2 = this.sample2 + '"status_step":"' + this.sample1[x].status_step + '"},'
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
        val2 = val2 + this.sample1[val].equip + "||" + this.sample1[val].Sample_no + "||" + this.sample1[val].status_step +"[]"
      }
      val2 = val2.substring(0, val2.length - 2);
      console.log(val2)
  
      var qtest = ""
      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET  `STATUS_JOB` = '4', `ESTI_TECHNIQUE` = '"+ val2 +"' " +
        " WHERE (`ID` = '"+this.DataRes[0].ID+"')  ; " 
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
    })
    }
}
