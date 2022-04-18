import { Component, OnInit } from '@angular/core';

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
  Analysistype=""
  AnalysistypeOther=""
  IssueDate=""
  Requester=""
  Phone=""
  Department=""
  Product="" 
  RequestTechniques=""
  RequestTechniquesOther=""
  Numsample=0
  Sendsampledate=""
  EepectedDate=""
  Piority=""
  Reason="" 
  Lotno=""
  Samplename=""
  Remarks=""
  AnaComment=""
  Dangerous=""
  SampleAftertested=""
  Relatedmatters=""
  KeywordCharact=""
  KeywordState=""
  KeywordPheno=""
  NameIssuer=""
  ComIssuer=""
  ccIssuer=""
  NameConfirm=""

  constructor() { }

  ngOnInit(): void {
  }

  display(){
    console.log(this.Title);
    console.log(this.Background);
    console.log(this.Purpose);
    console.log(this.Hypothesis);
    console.log(this.Phone);
    console.log(this.AnalysistypeOther);
    console.log(this.RequestTechniquesOther);
  }
}
