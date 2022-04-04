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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormfieldComponent } from './formfield/formfield.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestformComponent } from './requestform/requestform.component';
import { InfoandTachniComponent } from './requestform/infoand-tachni/infoand-tachni.component';
import { DangertoCCComponent } from './requestform/dangerto-cc/dangerto-cc.component';
import { RequestHomeComponent } from './request-home/request-home.component';

@NgModule({
  declarations: [
    AppComponent,
    FormfieldComponent,
    RequestformComponent,
    InfoandTachniComponent,
    DangertoCCComponent,
    RequestHomeComponent
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
