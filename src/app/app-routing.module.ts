import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyrequehomeComponent } from './analyrequehome/analyrequehome.component';
import { PaddingrequeComponent } from './paddingreque/paddingreque.component';
import { RequestformfillComponent } from './requestformfill/requestformfill.component';
import { QuestionComponent } from './question/question.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { BooingEquipComponent } from './booing-equip/booing-equip.component';
import { CSresultComponent } from './csresult/csresult.component';
import { SteppaddingComponent } from './steppadding/steppadding.component';
import { EstiStepComponent } from './esti-step/esti-step.component';
import { EstiCostComponent } from './esti-cost/esti-cost.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RequestinfoComponent } from './requestinfo/requestinfo.component';
import { AnswerEditComponent } from './answer-edit/answer-edit.component';
import { ApproverStepComponent } from './dialog/approver-step/approver-step.component';
import { MyjobComponent } from './myjob/myjob.component';
import { EstistepEditComponent } from './dialog/estistep-edit/estistep-edit.component';
import { EditBookingComponent } from './dialog/edit-booking/edit-booking.component';
import { TrackingstatusComponent } from './trackingstatus/trackingstatus.component';
import { FactoryApproveComponent } from './dialog/factory-approve/factory-approve.component';
import { EditOperationtimeComponent } from './dialog/edit-operationtime/edit-operationtime.component';
import { AnahomeNotcomComponent } from './anahome-notcom/anahome-notcom.component';
import { AnahomeCompleteComponent } from './anahome-complete/anahome-complete.component';
import { AddfileComponent } from './dialog/addfile/addfile.component';
import { InfoEditstepComponent } from './dialog/info-editstep/info-editstep.component';
import { DailyjobComponent } from './dailyjob/dailyjob.component';


const routes: Routes = [{ path: 'Requestformfill', component: RequestformfillComponent },
{ path: 'Analyrequehome', component: AnalyrequehomeComponent }, 
{ path: 'Paddingreque', component: PaddingrequeComponent },
{ path: 'Question', component: QuestionComponent },
{ path: 'AnswerPage', component: AnswerPageComponent },
{ path: 'BooingEquip', component: BooingEquipComponent },
{ path: 'CSresult', component: CSresultComponent },
{ path: 'Steppadding', component: SteppaddingComponent },
{ path: 'Estistep', component: EstiStepComponent },
{ path: 'Esticost', component: EstiCostComponent },
{ path: 'Signup', component: SignupComponent },
{ path: 'Login', component: LoginComponent },
{ path: 'Requestinfo', component: RequestinfoComponent },
{ path: 'AnswerEdit', component: AnswerEditComponent },
{ path: 'ApproverStep', component: ApproverStepComponent },
{ path: 'Myjob', component: MyjobComponent },
{ path: 'EstistepEdit', component: EstistepEditComponent },
{ path: 'EditBooking', component: EditBookingComponent },
{ path: 'Trackingstatus', component: TrackingstatusComponent },
{ path: 'FactoryApprove', component: FactoryApproveComponent },
{ path: 'EditOperationtime', component: EditOperationtimeComponent },
{ path: 'AnahomeNotcom', component: AnahomeNotcomComponent },
{ path: 'AnahomeComplete', component: AnahomeCompleteComponent },
{ path: 'Addfile', component: AddfileComponent },
{ path: 'InfoEditstep', component: InfoEditstepComponent },
{ path: 'Dailyjob', component: DailyjobComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
