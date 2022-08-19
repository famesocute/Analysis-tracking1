import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule} from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestformfillComponent } from './requestformfill/requestformfill.component';
import { AnalyrequehomeComponent } from './analyrequehome/analyrequehome.component';
import { PaddingrequeComponent } from './paddingreque/paddingreque.component';
import { QuestionComponent } from './question/question.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { BooingEquipComponent } from './booing-equip/booing-equip.component';
import { CSresultComponent } from './csresult/csresult.component';
import { SteppaddingComponent } from './steppadding/steppadding.component';
import { EstiStepComponent } from './esti-step/esti-step.component';
import { EstiCostComponent } from './esti-cost/esti-cost.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AnalyrequehomeListComponent } from './dialog/analyrequehome-list/analyrequehome-list.component';
import { RequestinfoComponent } from './requestinfo/requestinfo.component';
import { AnswerEditComponent } from './answer-edit/answer-edit.component';
import { ApproverStepComponent } from './dialog/approver-step/approver-step.component';
import { MyjobComponent } from './myjob/myjob.component';
import { EstistepEditComponent } from './dialog/estistep-edit/estistep-edit.component';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {DataService} from "./booing-equip/data.service";
import {DataService2} from "./equipment/data.service";
import { TrackingstatusComponent } from './trackingstatus/trackingstatus.component';
import { EditBookingComponent } from './dialog/edit-booking/edit-booking.component';
import { FactoryApproveComponent } from './dialog/factory-approve/factory-approve.component';
import { EditOperationtimeComponent } from './dialog/edit-operationtime/edit-operationtime.component';
import { AnahomeNotcomComponent } from './anahome-notcom/anahome-notcom.component';
import { AnahomeCompleteComponent } from './anahome-complete/anahome-complete.component';
import { AddfileComponent } from './dialog/addfile/addfile.component';
import { InfoEditstepComponent } from './dialog/info-editstep/info-editstep.component';
import { DailyjobComponent } from './dailyjob/dailyjob.component';
import { EditinfoComponent } from './dialog/editinfo/editinfo.component';
import { PenddingComponent } from './dialog/edit_reviewer/pendding/pendding.component';
import { ReEstiStepComponent } from './dialog/edit_reviewer/re-esti-step/re-esti-step.component';
import { Re2EstiStepComponent } from './dialog/edit_reviewer/re2-esti-step/re2-esti-step.component';
import { InfoComponent } from './dialog/edit_reviewer/info/info.component';
import {NgxPrintModule} from 'ngx-print';
import { PrintComponent } from './dialog/print/print.component';
import { SendmailQuestionComponent } from './dialog/sendmail-question/sendmail-question.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AddOperationtimeComponent } from './dialog/add-operationtime/add-operationtime.component';
import { AddReporttimeComponent } from './dialog/add-reporttime/add-reporttime.component';

@NgModule({
  declarations: [
    AppComponent, 
    RequestformfillComponent,
    AnalyrequehomeComponent,
    PaddingrequeComponent,
    QuestionComponent,
    AnswerPageComponent,
    BooingEquipComponent,
    CSresultComponent,
    SteppaddingComponent,
    EstiStepComponent,
    EstiCostComponent,
    SignupComponent,
    LoginComponent,
    AnalyrequehomeListComponent,
    RequestinfoComponent,
    AnswerEditComponent,
    ApproverStepComponent,
    MyjobComponent,
    EstistepEditComponent,
    TrackingstatusComponent,
    EditBookingComponent,
    FactoryApproveComponent,
    EditOperationtimeComponent,
    AnahomeNotcomComponent,
    AnahomeCompleteComponent,
    AddfileComponent,
    InfoEditstepComponent,
    DailyjobComponent,
    EditinfoComponent,
    PenddingComponent,
    ReEstiStepComponent,
    Re2EstiStepComponent,
    InfoComponent,
    PrintComponent,
    SendmailQuestionComponent,
    EquipmentComponent,
    AddOperationtimeComponent,
    AddReporttimeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatStepperModule,
    HttpClientModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    DayPilotModule,
    NgxPrintModule
  ],
  providers: [DataService,DataService2],
  bootstrap: [AppComponent]
})
export class AppModule { }
