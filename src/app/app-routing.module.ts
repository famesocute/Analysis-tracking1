import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestformfillComponent } from './requestformfill/requestformfill.component';

const routes: Routes = [{ path: 'Requestformfill', component: RequestformfillComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
