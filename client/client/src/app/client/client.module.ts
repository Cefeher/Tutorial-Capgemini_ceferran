import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientRoutingModule } from './client-routing.module';



@NgModule({
  declarations: [
    ClientEditComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ClientRoutingModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class ClientModule { }
