import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateCategoryComponent } from './categoria/update-category/update-category.component';


@NgModule({
  declarations: [CategoriaComponent, UpdateCategoryComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CategoriaModule { }
