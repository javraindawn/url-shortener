import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';
import { FormsComponent } from './forms/forms.component';


@NgModule({
  declarations: [FormsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MainRoutingModule
  ]
})
export class MainModule { }
