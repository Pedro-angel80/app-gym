import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'create',
    component: CreateComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
