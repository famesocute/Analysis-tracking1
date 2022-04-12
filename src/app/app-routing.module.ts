import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyrequehomeComponent } from './analyrequehome/analyrequehome.component';
import { PaddingrequeComponent } from './paddingreque/paddingreque.component';
import { RequestformfillComponent } from './requestformfill/requestformfill.component';
import { QuestionComponent } from './question/question.component';
import { SummaryresultComponent } from './summaryresult/summaryresult.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { BooingEquipComponent } from './booing-equip/booing-equip.component';

const routes: Routes = [{ path: 'Requestformfill', component: RequestformfillComponent },
{ path: 'Analyrequehome', component: AnalyrequehomeComponent }, 
{ path: 'Paddingreque', component: PaddingrequeComponent },
{ path: 'Question', component: QuestionComponent },
{ path: 'Summaryresult', component: SummaryresultComponent },
{ path: 'AnswerPage', component: AnswerPageComponent },
{ path: 'BooingEquip', component: BooingEquipComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
