import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-info-editstep',
  templateUrl: './info-editstep.component.html',
  styleUrls: ['./info-editstep.component.scss']
})
export class InfoEditstepComponent implements OnInit {
  DataRes: any
  userType: any
  message = ""

  status_step = ""

  sample1: any
  sample2: any

  ID: any
  isvalideditstep: any

  productForm: FormGroup;
  BOOKINGDB: any
  BOOKINGDBNEW: any
  constructor(public productService: ProductService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.productService.currentMessage.subscribe(message => this.message = message)
    console.log(this.message)
    var sp = this.message.split("||")

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(sp[0]).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data
      console.log(this.DataRes[0].ESTI_TECHNIQUE)

      this.sample1 = this.DataRes[0].ESTI_TECHNIQUE.split("[]")
      console.log(this.sample1)

      var x
      var a
      this.sample2 = "["

      for (x in this.sample1) {
        a = this.sample1[x].split("||")
        this.sample2 = this.sample2 + '{"equip":"' + a[0] + '",'
        this.sample2 = this.sample2 + '"Sample_no":"' + a[1] + '",'
        this.sample2 = this.sample2 + '"step":"Step' + (parseInt(x) + 1) + '",'
        this.sample2 = this.sample2 + '"add":"0",'
        this.sample2 = this.sample2 + '"status_step":"' + a[2] + '"},'

      }
      this.sample2 = this.sample2.substring(0, this.sample2.length - 1);
      this.sample2 = this.sample2 + "]";
      console.log(this.sample2)
      var obj = JSON.parse(this.sample2);
      this.sample1 = obj
      console.log(this.sample1)
      this.productService.TRACKING_ANALYSIS_SELECT_BOOKING_BYREQ(sp[1]).subscribe((data: {}) => {
        console.log(data)
        this.BOOKINGDB = data
        var x
        var a
        this.BOOKINGDBNEW = "["
        for (a in this.sample1) {
          for (x in this.BOOKINGDB) {
            if (this.BOOKINGDB[x].STEP_BOOKING == this.sample1[a].step) {
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '{"EQUIPMENT":"' + this.sample1[a].equip + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"STEP_BOOKING":"' + this.sample1[a].step + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"BREAK_TIME":"' + this.BOOKINGDB[x].BREAK_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"DATE_BOOKING_END":"' + this.BOOKINGDB[x].DATE_BOOKING_END + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"DATE_BOOKING_START":"' + this.BOOKINGDB[x].DATE_BOOKING_START + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"EDITER":"' + this.BOOKINGDB[x].EDITER + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"END_TIME":"' + this.BOOKINGDB[x].END_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"ID_BOOKING":"' + this.BOOKINGDB[x].ID_BOOKING + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"OPERATER":"' + this.BOOKINGDB[x].OPERATER + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"OPERATION_TIME":"' + this.BOOKINGDB[x].OPERATION_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"PIC":"' + this.BOOKINGDB[x].PIC + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"REQ_NUM":"' + this.BOOKINGDB[x].REQ_NUM + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"SAMPLE_NUM":"' + this.BOOKINGDB[x].SAMPLE_NUM + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"START_TIME":"' + this.BOOKINGDB[x].START_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"TIME_BOOKING_END":"' + this.BOOKINGDB[x].TIME_BOOKING_END + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"TIME_BOOKING_START":"' + this.BOOKINGDB[x].TIME_BOOKING_START + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"TITLE":"' + this.BOOKINGDB[x].TITLE + '"},'
            }
          }
        }
        console.log(this.BOOKINGDBNEW)
        this.BOOKINGDBNEW = this.BOOKINGDBNEW.substring(0, this.BOOKINGDBNEW.length - 1);
        this.BOOKINGDBNEW = this.BOOKINGDBNEW + "]";
        console.log(this.BOOKINGDBNEW)
        var obj = JSON.parse(this.BOOKINGDBNEW);
        this.BOOKINGDBNEW = obj
        console.log(this.BOOKINGDBNEW)
      })

    })
  }
  Add() {
    var x
    var a
    this.sample2 = "["
    var count = 0
    for (x in this.sample1) {
      count = count + 1
      this.sample2 = this.sample2 + '{"equip":"' + this.sample1[x].equip + '",'
      this.sample2 = this.sample2 + '"step":"Step' + (parseInt(x) + 1) + '",'
      this.sample2 = this.sample2 + '"add":"' + this.sample1[x].add + '",'
      this.sample2 = this.sample2 + '"Sample_no":"' + this.sample1[x].Sample_no + '",'
      this.sample2 = this.sample2 + '"status_step":"' + this.sample1[x].status_step + '"},'
    }
    this.sample2 = this.sample2 + '{"equip":"",'
    this.sample2 = this.sample2 + '"add":"1",'
    this.sample2 = this.sample2 + '"step":"Step' + ((count) + 1) + '",'
    this.sample2 = this.sample2 + '"Sample_no":"",'
    this.sample2 = this.sample2 + '"status_step":""},'

    this.sample2 = this.sample2.substring(0, this.sample2.length - 1);
    this.sample2 = this.sample2 + "]";
    console.log(this.sample2)
    var obj = JSON.parse(this.sample2);
    this.sample1 = obj
    console.log(this.sample2)
  }
  Remove(id: any) {
    var x
    var a
    this.sample2 = "["
    var count = 0
    for (x in this.sample1) {
      if (id == x) {

      }
      else {
        count = count + 1
        this.sample2 = this.sample2 + '{"equip":"' + this.sample1[x].equip + '",'
        this.sample2 = this.sample2 + '"step":"Step' + (count) + '",'
        this.sample2 = this.sample2 + '"Sample_no":"' + this.sample1[x].Sample_no + '",'
        this.sample2 = this.sample2 + '"add":"' + this.sample1[x].add + '",'
        this.sample2 = this.sample2 + '"status_step":"' + this.sample1[x].status_step + '"},'
      }

    }
    this.sample2 = this.sample2.substring(0, this.sample2.length - 1);
    this.sample2 = this.sample2 + "]";
    console.log(this.sample2)
    var obj = JSON.parse(this.sample2);
    this.sample1 = obj
    console.log(this.sample2)
  }
  edit() {
    var del = "DELETE FROM `mtq10_project_tracking_analysis`.`booking_equipment` WHERE (`REQ_NUM` = '" + this.BOOKINGDB[0].REQ_NUM + "');"
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(del).subscribe((data: {}) => {
      console.log(data);

      var val2 = ""
      this.BOOKINGDBNEW = ""
      for (var val in this.sample1) {
        console.log(val);
        val2 = val2 + this.sample1[val].equip + "||" + this.sample1[val].Sample_no + "||" + this.sample1[val].status_step + "[]"

        console.log(this.sample1[val].step)
        for (var x in this.BOOKINGDB) {
          console.log(val);
          if (this.BOOKINGDB[x].STEP_BOOKING == this.sample1[val].step) {
            if (this.sample1[val].add == "1") {
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '(`'+this.sample1[val].equip +'`,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '`' + this.sample1[val].step + '`,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW +'``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW +'``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW +'``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW+ '`' + this.BOOKINGDB[x].REQ_NUM + '`,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW + '``,'
              // this.BOOKINGDBNEW = this.BOOKINGDBNEW +'``)'
            }
            else {
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '("' + this.sample1[val].equip + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.sample1[val].step + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].BREAK_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].DATE_BOOKING_END + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].DATE_BOOKING_START + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].EDITER + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].END_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].OPERATER + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].OPERATION_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].PIC + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].REQ_NUM + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.sample1[val].Sample_no + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].START_TIME + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].TIME_BOOKING_END + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].TIME_BOOKING_START + '",'
              this.BOOKINGDBNEW = this.BOOKINGDBNEW + '"' + this.BOOKINGDB[x].TITLE + '"),'
            }
          }
        }
      }
      this.BOOKINGDBNEW = this.BOOKINGDBNEW.substring(0, this.BOOKINGDBNEW.length - 1);
      val2 = val2.substring(0, val2.length - 2);
      console.log(val2)
      console.log(this.BOOKINGDBNEW)

      var send = ""

      var send = send + "INSERT INTO `mtq10_project_tracking_analysis`.`booking_equipment` (`EQUIPMENT`," +
        "`STEP_BOOKING`,`BREAK_TIME`,`DATE_BOOKING_END`,`DATE_BOOKING_START`,`EDITER`,`END_TIME`, " +
        "`OPERATER`,`OPERATION_TIME`,`PIC`,`REQ_NUM`,`SAMPLE_NUM`,`START_TIME`,`TIME_BOOKING_END`,`TIME_BOOKING_START`,`TITLE`) " +
        "VALUES " + this.BOOKINGDBNEW + ";"
      console.log(send);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(send).subscribe((data: {}) => {
        console.log(data);
      })

      var qtest = ""

      qtest = qtest + "UPDATE `mtq10_project_tracking_analysis`.`data_all` " +
        " SET  `ESTI_TECHNIQUE` = '" + val2 + "' " +
        " WHERE (`ID` = '" + this.DataRes[0].ID + "')  ; "
      console.log(qtest);
      this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
        console.log(data);
      })
      
      location.reload()
    })
  }
}
