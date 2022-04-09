import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyrequehomeComponent } from './analyrequehome/analyrequehome.component';
import { PaddingrequeComponent } from './paddingreque/paddingreque.component';
import { RequestformfillComponent } from './requestformfill/requestformfill.component';

const routes: Routes = [{ path: 'Requestformfill', component: RequestformfillComponent },{ path: 'Analyrequehome', component: AnalyrequehomeComponent }, { path: 'Paddingreque', component: PaddingrequeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
