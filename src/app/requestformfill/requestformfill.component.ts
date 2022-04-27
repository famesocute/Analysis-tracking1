import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { ProductService } from '../api/product.service';

@Component({
  selector: 'app-requestformfill',
  templateUrl: './requestformfill.component.html',
  styleUrls: ['./requestformfill.component.scss']
})
export class RequestformfillComponent implements OnInit {


  myControl = new FormControl();
  options: string[] = [
    'Wanutsanun Hintuang <wanutsanun.hin@murata.com>', 'Suticha Pringthai <suticha.pri@murata.com>',
    'Thanyarat Sukkay <thanyarat.suk@murata.com>', 'Pichayapak Nantasai <pichayapak.nan@murata.com>'];
  filteredOptions!: Observable<string[]>;

  RequestNo = ""
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
  NameIssuer = ""
  ComIssuer = ""
  ccIssuer = ""
  NameConfirm = ""
  NameControl = ""

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

  productForm: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, public productService: ProductService) {
    this.productForm = this.fb.group({

      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

  }

  // Add input
  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      Lotno: '',
      Samplename: '',
      Remarks: '',
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  // seach box
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // Navi to Question
  NavQuestion() {
    this.router.navigate(['/Question'])
  }
  //  Retio tool
  getdata(value: any) {
    this.Analysistype = value
  }
  getdatadan(value: any) {
    this.Dangerous = value
  }
  getdataSamAf(value: any) {
    this.SamAftertest = value
  }

  // check box

  other: any // check box other
  comment = "" // ช่อง input other
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


  display() {


    // console.log(this.Title);
    // console.log(this.Background);
    // console.log(this.Purpose);
    // console.log(this.Hypothesis);
    // console.log(this.Analysistype);
    // console.log(this.Analysistype2);
    // console.log(this.Phone);
    // console.log(this.Requester);
    // console.log(this.Department);
    // console.log(this.Product);
    // console.log(this.RequestTech);
    // console.log(this.RequestTech2);
    // console.log(this.Numsample);
    // console.log(this.Sendsampledate);
    // console.log(this.EepectedDate);
    // console.log(this.Piority);
    // console.log(this.Reason);
    console.log(this.productForm.value);
    console.log(this.productForm.value.quantities);

    var val2 = ""

    for (var val in this.productForm.value.quantities) {
      console.log(val); // prints values: 10, 20, 30, 40
      val2 = val2 + this.productForm.value.quantities[val].Lotno + "," + this.productForm.value.quantities[val].Samplename + "," + this.productForm.value.quantities[val].Remarks + "|"
    }
    val2 = val2.substring(0, val2.length - 1);
    console.log(val2)
    // console.log(this.AnaComment);
    // console.log(this.Dangerous);
    // console.log(this.SamAftertest);
    // console.log(this.KeywordCharact);
    // console.log(this.KeywordState);
    // console.log(this.KeywordPheno);
    // console.log(this.NameIssuer);
    console.log(this.ComIssuer);
    // console.log(this.ccIssuer);
    // console.log(this.NameConfirm);
    // console.log(this.NameControl);
    var qtest = ""
    qtest = qtest + "INSERT INTO `mtq10_project_tracking_analysis`.`data_all` " +
      "(`REQ_NUM`, `TITLE`, `BACKGRUD`, `PURPOSE`, `HYPO`, `ANA_TYPE`,`ANA_TYPE2`, `ISSUE_DATE`, " +
      "`REQ_TER`, `PHONE`, `DEP_MENT`, `PRODUCT`, `ATTACH_FILE`, `REQ_ANA_TECHNI`,`REQ_ANA_TECHNI2`, `NUM_SAMPLE`" +
      ", `SEND_SAM_DATE`, `FINISH_DATE`, `PIORITY`, `REASON`,  `SAM_NAME`, " +
      "`COMM_SAM_INFOR`, `DANGER`, `SAM_AF_TEST`, `RELATE_MAT`, `KEY_CHARA`, `KEY_STATE`, " +
      "`KEY_PHENO`, `QUESTION`, `REVI_PAND_ISSUER`, `REVI_PAND_CONFIRM`, `REVI_ANASEC_CONTROL`, " +
      "`REVI_ANASEC_ANAL`, `REVI_REAPPROV_CHECK`, `REVI_REAPPROV_CONFIRM`, `REVI_REAPPROV_APPROV`," +
      "`REVI_CS_ISSUE`, `REVI_COMPLET_CLOSE`,`REVI_PAND_ISSUE_COM`,`REVI_PAND_ISSUE_CC`) " +
      " VALUES ('" + this.RequestNo + "', '" + this.Title + "', '" + this.Background + "', '" + this.Purpose + "', '" + this.Hypothesis + "', '" + this.Analysistype + "'," +
      " '" + this.Analysistype2 + "', '" + this.IssueDate + "', '" + this.Requester + "', '" + this.Phone + "', '" + this.Department + "', '" + this.Product + "','1', '" + this.RequestTech + "', '" + this.RequestTech2 + "'," +
      " '" + this.Numsample + "', '" + this.Sendsampledate + "', '" + this.EepectedDate + "', '" + this.Piority + "', '" + this.Reason + "', '" + val2 + "'," +
      " '" + this.AnaComment + "', '" + this.Dangerous + "', '" + this.SamAftertest + "', '" + this.Relatedmatters + "', '" + this.KeywordCharact + "', '" + this.KeywordState + "', '" + this.KeywordPheno + "', " +
      " '', '" + this.NameIssuer + "', '" + this.NameConfirm + "','" + this.NameControl + "','','','','','','','" + this.ComIssuer + "','" + this.ccIssuer + "'  );"
    console.log(qtest);
    this.productService.TRACKING_ANALYSIS_QUERY_DATA(qtest).subscribe((data: {}) => {
      console.log(data);
    })
  }


}
