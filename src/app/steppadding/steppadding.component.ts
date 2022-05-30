import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../api/product.service';


@Component({
  selector: 'app-steppadding',
  templateUrl: './steppadding.component.html',
  styleUrls: ['./steppadding.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class SteppaddingComponent implements OnInit {
  requester = ""

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup! : FormGroup;

  isValidPic1 = true
  isValidPic2 = true
  isValidPic3 = true
  isValidPic4 = true
  isValidPic5 = true

  TITLE = ""
  REVI_PAND_ISSUER = ""
  userType : any

  DataRes : any

  constructor(private _formBuilder: FormBuilder,private route: ActivatedRoute,public productService: ProductService) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.queryParamMap.get("id");

    console.log(this.userType)
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.productService.TRACKING_ANALYSIS_SELECT_DATA_BY_ID(this.userType).subscribe((data: {}) => {
      console.log(data);
      this.DataRes = data

      this.requester = this.DataRes[0].REVI_PAND_ISSUER.substring("<");
      var x
      for (x in this.DataRes) {
        this.requester = this.DataRes[x].REVI_PAND_ISSUER.split("<");
        this.DataRes[x].REVI_PAND_ISSUER = this.requester[0]
      }

      if (this.DataRes[0].STATUS_JOB == 1){
        this.isValidPic1 = false
        this.isValidPic2 = true
        this.isValidPic3 = true
        this.isValidPic4 = true
        this.isValidPic5 = true
      }
      else if (this.DataRes[0].STATUS_JOB == 2){
        this.isValidPic1 = false
        this.isValidPic2 = false
        this.isValidPic3 = true
        this.isValidPic4 = true
        this.isValidPic5 = true
      }
      else if (this.DataRes[0].STATUS_JOB == 3){
        this.isValidPic1 = false
        this.isValidPic2 = false
        this.isValidPic3 = false
        this.isValidPic4 = true
        this.isValidPic5 = true
      }
      else if (this.DataRes[0].STATUS_JOB == 4){
        this.isValidPic1 = false
        this.isValidPic2 = false
        this.isValidPic3 = false
        this.isValidPic4 = false
        this.isValidPic5 = false
      }
    })
     
      
  }


}
