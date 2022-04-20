import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestformfill',
  templateUrl: './requestformfill.component.html',
  styleUrls: ['./requestformfill.component.scss']
})
export class RequestformfillComponent implements OnInit {

  Title = ""
  Background = ""
  Purpose =""
  Hypothesis=""
  Analysistype = ""
  IssueDate=""
  Requester=""
  Phone=""
  Department=""
  Product="" 
  RequestTech=""
  Numsample=0
  Sendsampledate=""
  EepectedDate =""
  Piority=""
  Reason="" 
  Lotno=""
  Samplename=""
  Remarks=""
  AnaComment=""
  Dangerous=""
  SamAftertest=""
  Relatedmatters=""
  KeywordCharact=""
  KeywordState=""
  KeywordPheno=""
  NameIssuer=""
  ComIssuer=""
  ccIssuer=""
  NameConfirm=""
 

  activate : boolean = false

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

  other: any // check box other

  comment = "" // ช่อง input other

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  display(){
    this.RequestTech = this.RequestTech + this.other
    console.log(this.Title);
    console.log(this.Background);
    console.log(this.Purpose);
    console.log(this.Hypothesis);
    console.log(this.Analysistype);
    console.log(this.Phone);
    console.log(this.Department);
    console.log(this.Product);
    console.log(this.RequestTech);
    console.log(this.Numsample);
    console.log(this.Sendsampledate);
    console.log(this.EepectedDate);
    console.log(this.Piority);
    console.log(this.Reason);
    console.log(this.Lotno);
    console.log(this.Samplename);
    console.log(this.Remarks);
    console.log(this.AnaComment);
    console.log(this.Dangerous);
    console.log(this.SamAftertest);
    console.log(this.KeywordCharact);
    console.log(this.KeywordState);
    console.log(this.KeywordPheno);
    console.log(this.NameIssuer);
    console.log(this.ComIssuer);
    console.log(this.ccIssuer);
    console.log(this.NameConfirm);
  }

  NavQuestion(){
    this.router.navigate(['/Question'])
   }
  getdata(value: any){
    this.Analysistype = value
    
  }
  getdatadan(value: any){
    this.Dangerous = value
    
  }
  getdataSamAf(value: any){
    this.SamAftertest = value
    
  }

  AnsMany() {
    this.RequestTech = ""

    // console.log(this.other, this.comment)

    var i
    var count = 0
    
    for (i in this.Tech) {
      count = count + 1
      if (this.Tech[i].check == true) {
        this.RequestTech = this.RequestTech + this.Tech[i].data + ","
      }
    }
  }
  AnsOther() {
    this.RequestTech = this.RequestTech + this.other
  }
}
