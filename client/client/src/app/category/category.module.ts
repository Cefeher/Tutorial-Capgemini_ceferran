import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryRoutingModule } from './category-routing.module';

import { MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CategoryRoutingModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class CategoryModule { }
