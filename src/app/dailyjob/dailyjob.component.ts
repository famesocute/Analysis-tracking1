import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dailyjob',
  templateUrl: './dailyjob.component.html',
  styleUrls: ['./dailyjob.component.scss']
})
export class DailyjobComponent implements OnInit {
  Datechoose = ""

  constructor() { }

  ngOnInit(): void {
  }
  onChangedate(){
    this.Datechoose = this.Datechoose.toLocaleString()
    console.log(this.Datechoose)

    var Datechoose2 = this.Datechoose.split(",")
    var Datechoose3 = Datechoose2[0].split("/")
    console.log(Datechoose3)
    var sumDatechoose
    if (Datechoose3[0].length <= 1) {
      sumDatechoose = Datechoose3[2] + "-0" + Datechoose3[0]
    }
    else {
      sumDatechoose = Datechoose3[2] + "-" + Datechoose3[0]
    }
    if (Datechoose3[1].length <= 1) {
      sumDatechoose = sumDatechoose + "-0" + Datechoose3[1]
    }
    else {
      sumDatechoose = sumDatechoose + "-" + Datechoose3[1]
    }
    console.log(sumDatechoose)
  }

}
