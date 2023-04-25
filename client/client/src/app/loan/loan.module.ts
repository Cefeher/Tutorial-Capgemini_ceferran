import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanSaveComponent } from './loan-save/loan-save.component';
import { LoanRoutingModule } from './loan-routing.module';




@NgModule({
  declarations: [
    LoanListComponent,
    LoanSaveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
