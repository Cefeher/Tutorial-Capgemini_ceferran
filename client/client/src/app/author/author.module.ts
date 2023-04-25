import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorRoutingModule } from './author-routing.module';




@NgModule({
declarations: [
    AuthorListComponent,
    AuthorEditComponent
],
imports: [
    CommonModule,
    MaterialModule,
    AuthorRoutingModule
],
providers: [
    {
        provide: MAT_DIALOG_DATA,
        useValue: {},
    },
]
})
export class AuthorModule { }
