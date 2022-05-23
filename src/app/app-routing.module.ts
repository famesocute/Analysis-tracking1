import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyrequehomeComponent } from './analyrequehome/analyrequehome.component';
import { PaddingrequeComponent } from './paddingreque/paddingreque.component';
import { RequestformfillComponent } from './requestformfill/requestformfill.component';
import { QuestionComponent } from './question/question.component';
import { SummaryresultComponent } from './summaryresult/summaryresult.component';
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


const routes: Routes = [{ path: 'Requestformfill', component: RequestformfillComponent },
{ path: 'Analyrequehome', component: AnalyrequehomeComponent }, 
{ path: 'Paddingreque', component: PaddingrequeComponent },
{ path: 'Question', component: QuestionComponent },
{ path: 'Summaryresult', component: SummaryresultComponent },
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
{ path: 'ApproverStep', component: ApproverStepComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
