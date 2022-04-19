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

  constructor(public router: Router) { }

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
    console.log(this.Numsample);
    console.log(this.Reason);
    console.log(this.Lotno);
    console.log(this.Samplename);
    console.log(this.Remarks);
    console.log(this.AnaComment);
    console.log(this.NameIssuer);
    console.log(this.ComIssuer);
    console.log(this.ccIssuer);
    console.log(this.NameConfirm);
    console.log(this.Analysistype);
    console.log(this.Department);
    
  }

  NavQuestion(){
    this.router.navigate(['/Question'])
   }
  getdata(value: any){
    
    this.Analysistype = value
    console.log(this.Analysistype);
  }
}
