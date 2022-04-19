import { Component, OnInit } from '@angular/core';
  

@Component({
  selector: 'app-csresult',
  templateUrl: './csresult.component.html',
  styleUrls: ['./csresult.component.scss']
})
export class CSresultComponent implements OnInit {

  Q_10 =

    [{ data: 'อบรม QCC story', check: false },

    { data: 'อบรม QC 7 tools', check: false },

    { data: 'อบรมความหมายของ QCC zoning และวิธีการปรับปรุงในแต่ละโซน', check: false },

    { data: 'วิธีการทำไฟล์พรีเซ็นท์', check: false },

    { data: 'ข่าวสารเกี่ยวกับกิจกรรม QCC', check: false }

    ];
   QA10 = ""
   other: any // check box other

   comment = "" // ช่อง input other
  constructor() { 
    
  }

  ngOnInit(): void {
  }
  AnsMany() {

    this.QA10 = ""

    console.log(this.Q_10[0].check, ",", this.Q_10[1].check, ",", this.Q_10[2].check, ",", this.Q_10[3].check, ",", this.Q_10[4].check)

    console.log(this.other, this.comment)

    var i

    var count = 0



    for (i in this.Q_10) {

      count = count + 1

      if (this.Q_10[i].check == true) {

        this.QA10 = this.QA10 + count + ","

      }

    }

    console.log(this.QA10.slice(0, -1)) //*slice: ลบเครื่องหมาย , ตัวสุดท้ายออก

  }
}
