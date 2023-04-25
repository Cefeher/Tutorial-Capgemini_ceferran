import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';





@NgModule({
  declarations: [
    HeaderComponent,
    DialogConfirmationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class CoreModule { }
