import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'authors',
    loadChildren: () => import('./author/author.module').then(m => m.AuthorModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'loan',
    loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
