import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-list/game-item/game-item.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { MaterialModule } from '../material/material.module';
import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    GameEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GameRoutingModule
  ]
})
export class GameModule { }
