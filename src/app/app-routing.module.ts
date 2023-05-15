import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }