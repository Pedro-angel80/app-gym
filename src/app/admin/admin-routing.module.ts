import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
      },
      {
        path: "product",
        loadChildren: () => import("./product/product.module").then(m => m.ProductModule),
      },
      {
        path: "user",
        loadChildren: () => import("./user/user.module").then(m => m.UserModule),
      },
      {
        path: "category",
        loadChildren: () => import("./categoria/categoria.module").then(m => m.CategoriaModule),
      },
    ]
  }, 
  {
    path: "**",
    redirectTo: "",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
