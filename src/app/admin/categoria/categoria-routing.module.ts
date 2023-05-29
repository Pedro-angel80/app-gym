import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { UpdateCategoryComponent } from './categoria/update-category/update-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriaComponent
  },
  {
    path: 'crear',
    component: UpdateCategoryComponent
  },
  {
      path: 'update/:categoryId',
      component: UpdateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
